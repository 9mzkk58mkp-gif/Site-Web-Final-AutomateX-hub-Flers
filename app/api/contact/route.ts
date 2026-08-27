import { NextResponse, type NextRequest } from "next/server";
import { sendContactToN8n } from "@/lib/chatbot/n8n-webhook";
import { isValidFrenchPhone } from "@/lib/chatbot/validation";
import { MAX_CONTACT_MESSAGE_LENGTH } from "@/lib/chatbot/config";
import { incrementDailyCount, readDailyCount } from "@/lib/shared-store";

/**
 * Réception du formulaire de contact, côté serveur.
 *
 * Le formulaire postait auparavant directement sur le webhook N8N depuis le
 * navigateur, via une variable NEXT_PUBLIC_ : l'URL était donc lisible dans le
 * bundle et exploitable sans aucune limite. Tout passe désormais par ici, où
 * l'on peut valider, limiter le débit et piéger les robots avant de relayer.
 */

const IP_PREFIX = "contact-ip:";
const MAX_SUBMISSIONS_PER_IP_PER_DAY = 5;

const GENERIC_ERROR = "L'envoi a échoué. Appelez-moi directement ou réessayez dans un instant.";
const RATE_LIMIT_ERROR =
  "Trop de demandes envoyées depuis cette connexion aujourd'hui. Appelez-moi directement.";

interface ContactBody {
  nom?: unknown;
  telephone?: unknown;
  metier?: unknown;
  message?: unknown;
  /** Champ piège : invisible pour un humain, souvent rempli par les robots. */
  societe?: unknown;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function asTrimmedString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  // Champ piège rempli → robot. On répond 200 pour ne rien lui apprendre,
  // mais rien n'est transmis.
  if (asTrimmedString(body.societe, 100).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const nom = asTrimmedString(body.nom, 100);
  const telephone = asTrimmedString(body.telephone, 30);
  const metier = asTrimmedString(body.metier, 60);
  const message = asTrimmedString(body.message, MAX_CONTACT_MESSAGE_LENGTH);

  if (!nom) {
    return NextResponse.json({ error: "Merci d'indiquer votre nom." }, { status: 400 });
  }
  if (!isValidFrenchPhone(telephone)) {
    return NextResponse.json(
      { error: "Le numéro de téléphone ne semble pas valide. Format attendu : 06 12 34 56 78." },
      { status: 400 },
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "Merci de décrire votre projet en quelques mots." },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  if ((await readDailyCount(IP_PREFIX + ip)) >= MAX_SUBMISSIONS_PER_IP_PER_DAY) {
    return NextResponse.json({ error: RATE_LIMIT_ERROR }, { status: 429 });
  }
  await incrementDailyCount(IP_PREFIX + ip);

  const sent = await sendContactToN8n(
    { nom, telephone, metier, besoin_exprime: message },
    "contact",
  );

  if (!sent) {
    console.error("[contact] Relais vers N8N en échec.");
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
