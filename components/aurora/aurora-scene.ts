/**
 * Couche 3D de la composition Aurora — WebGL brut, sans framework.
 *
 * Suit le « Pattern 1 : Layered Separation » du skill web3d-integration-patterns
 * (couche 3D impérative / couche animation / couche UI React), avec une
 * substitution assumée : la couche 3D est écrite en WebGL brut plutôt qu'avec
 * Three.js. Le rendu visé est un champ de lumière plein écran piloté par un
 * fragment shader — il n'y a ni géométrie, ni caméra, ni matériaux à gérer, et
 * Three.js coûterait ~170 kB gzip sur un site dont l'atout principal est un
 * rendu serveur rapide pour des artisans en 4G rurale. Le module ci-dessous
 * fait ~4 kB. Les patterns du skill qui portent le fond du sujet sont eux
 * respectés à la lettre : boucle de rendu unique, DPR plafonné, rendu suspendu
 * hors écran, et libération complète des ressources GPU au démontage
 * (« Pitfall 3 : Memory Leaks from Abandoned Animations »).
 */

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/**
 * Champ d'aurore : deux nappes de bruit fractal étirées horizontalement,
 * décalées l'une par rapport à l'autre, colorées dans la palette validée
 * (émeraude #1fd9a0, halo #4ade9a, indigo #171f3a).
 */
const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2  uResolution;
uniform float uTime;
uniform float uScroll;   // 0 en haut de page, 1 en bas
uniform vec2  uPointer;  // -1..1, amorti côté JS
uniform float uIntensity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    total += noise(p) * amplitude;
    p *= 2.02;
    amplitude *= 0.5;
  }
  return total;
}

// Nappe lumineuse centrée sur center, ondulée par le bruit.
// smoothstep n'est jamais appelé avec edge0 > edge1 : la spec GLSL ES 1.0
// déclare ce cas « undefined », et le rendu diffère alors selon le pilote.
float sheet(vec2 uv, float center, float thickness, float speed, float seed) {
  float wave = fbm(vec2(uv.x * 1.6 + seed, uTime * speed + seed)) - 0.5;
  float d = abs(uv.y - center - wave * 0.42);
  return pow(1.0 - smoothstep(0.0, thickness, d), 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  // Parallaxe : le champ glisse lentement avec le scroll et, très légèrement,
  // avec le pointeur. Amplitudes volontairement basses — le mouvement doit se
  // remarquer en comparant deux instants, jamais se suivre du regard.
  p.y += uScroll * 0.28;
  p += uPointer * 0.02;

  // Nappes placées haut et bas : le tiers vertical central reste sombre,
  // c'est là que vivent le H1 et le paragraphe-réponse de chaque page.
  float a = sheet(p, 0.30, 0.20, 0.035, 0.0);
  float b = sheet(p, -0.34, 0.18, 0.028, 4.7);
  float c = sheet(p, 0.22, 0.38, 0.019, 11.3);

  vec3 emerald = vec3(0.122, 0.851, 0.627);
  vec3 glow    = vec3(0.290, 0.871, 0.604);
  vec3 indigo  = vec3(0.243, 0.271, 0.510);

  vec3 color = emerald * a * 0.62 + glow * b * 0.44 + indigo * c * 0.40;

  // Couloir de lecture : atténuation supplémentaire au centre vertical, pour
  // que la lumière ne passe jamais derrière un bloc de texte long.
  color *= 1.0 - 0.55 * (1.0 - smoothstep(0.0, 0.30, abs(p.y + 0.02)));

  // Atténuation vers les bords : la lumière reste au centre du champ, les
  // angles gardent le noir profond du dégradé validé client.
  float vignette = 1.0 - smoothstep(0.20, 1.45, length(p * vec2(0.72, 1.05)));
  color *= vignette * uIntensity;

  // Prémultiplié : le canvas est composé au-dessus du dégradé CSS du body,
  // qui doit rester visible partout où l'aurore est absente.
  // Plafond d'alpha calibré au contraste : au-delà, le ton de texte le plus
  // faible du design system passe sous 4.5:1 (WCAG AA, texte normal).
  float alpha = clamp((color.r + color.g + color.b) * 0.9, 0.0, 0.50);
  gl_FragColor = vec4(color, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export type AuroraScene = { dispose: () => void };

export type AuroraOptions = {
  /** true : une seule image fixe, aucune boucle (prefers-reduced-motion). */
  still: boolean;
};

/**
 * Monte la scène sur un canvas et renvoie son `dispose`.
 * Renvoie `null` si WebGL est indisponible — l'appelant laisse alors le halo
 * CSS de secours en place.
 */
export function createAuroraScene(
  canvas: HTMLCanvasElement,
  options: AuroraOptions,
): AuroraScene | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    premultipliedAlpha: false,
  });
  if (!gl) return null;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // Un simple quad plein écran : toute l'image est produite par le fragment shader.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uScroll = gl.getUniformLocation(program, "uScroll");
  const uPointer = gl.getUniformLocation(program, "uPointer");
  const uIntensity = gl.getUniformLocation(program, "uIntensity");

  // DPR plafonné à 1.5 : au-delà, le coût de remplissage double sans gain
  // visible sur un dégradé, et pénalise l'INP sur les téléphones d'entrée de gamme.
  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);

  let width = 0;
  let height = 0;

  function resize() {
    const ratio = dpr();
    const w = Math.floor(window.innerWidth * ratio);
    const h = Math.floor(window.innerHeight * ratio);
    if (w === width && h === height) return;
    width = w;
    height = h;
    canvas.width = w;
    canvas.height = h;
    gl!.viewport(0, 0, w, h);
    gl!.uniform2f(uResolution, w, h);
  }

  let scroll = 0;
  let pointerX = 0;
  let pointerY = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;

  function readScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scroll = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  }

  function onPointerMove(event: PointerEvent) {
    targetPointerX = (event.clientX / window.innerWidth) * 2 - 1;
    targetPointerY = (event.clientY / window.innerHeight) * 2 - 1;
  }

  resize();
  readScroll();
  gl.uniform1f(uIntensity, 1);

  function draw(time: number) {
    gl!.uniform1f(uTime, time);
    gl!.uniform1f(uScroll, scroll);
    gl!.uniform2f(uPointer, pointerX, pointerY);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  // --- Image fixe : aucun listener, aucune boucle. -------------------------
  if (options.still) {
    draw(0);
    const disposeStill = () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    return { dispose: disposeStill };
  }

  // --- Boucle animée -------------------------------------------------------
  // Une seule boucle rAF pilote toute la scène (skill : « Render Loop
  // Optimization »). Bridée à ~30 im/s : le mouvement est lent, 60 im/s
  // doublerait le coût GPU sans différence perceptible.
  const FRAME_MS = 1000 / 30;
  let raf = 0;
  let last = 0;
  let paused = false;

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (paused || now - last < FRAME_MS) return;
    last = now;

    // Amortissement du pointeur : évite qu'un mouvement de souris brusque ne
    // se traduise par un saut de la lumière.
    pointerX += (targetPointerX - pointerX) * 0.04;
    pointerY += (targetPointerY - pointerY) * 0.04;

    draw(now * 0.001);
  }

  const onScroll = () => readScroll();
  const onResize = () => {
    resize();
    readScroll();
  };
  const onVisibility = () => {
    paused = document.hidden;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  raf = requestAnimationFrame(frame);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
