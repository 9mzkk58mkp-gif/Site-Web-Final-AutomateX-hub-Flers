import { getStore, type Store } from "@netlify/blobs";

/**
 * Magasin clé/valeur partagé entre les instances serverless.
 *
 * Les compteurs de rate limiting vivaient auparavant dans des Map en mémoire de
 * process : sur Netlify, chaque instance de fonction a sa propre mémoire et
 * repart de zéro à chaque démarrage à froid, donc les limites n'étaient pas
 * réellement appliquées. Netlify Blobs est partagé entre toutes les instances.
 *
 * Hors Netlify (dev local, `next start`, tests), getStore() échoue : on
 * retombe sur une Map en mémoire, avec le même comportement qu'avant. C'est
 * suffisant pour du développement, où il n'y a qu'une seule instance.
 *
 * Limite connue : la lecture puis l'écriture ne sont pas atomiques. Deux
 * requêtes simultanées peuvent lire le même compteur et n'en incrémenter qu'un.
 * Au volume visé (quelques dizaines de messages par jour), l'écart est
 * négligeable devant le fait de n'avoir aucune limite effective.
 *
 * Server-only : ne jamais importer depuis un composant client.
 */

const STORE_NAME = "automatex-rate-limit";

const memoryFallback = new Map<string, unknown>();
let store: Store | null | undefined;

/** Résout le store Netlify une seule fois ; null si indisponible (hors Netlify). */
function resolveStore(): Store | null {
  if (store !== undefined) return store;
  try {
    store = getStore({ name: STORE_NAME, consistency: "strong" });
  } catch {
    console.warn("[shared-store] Netlify Blobs indisponible — repli en mémoire (dev local).");
    store = null;
  }
  return store;
}

export async function readJson<T>(key: string): Promise<T | null> {
  const netlifyStore = resolveStore();
  if (!netlifyStore) return (memoryFallback.get(key) as T | undefined) ?? null;

  try {
    return (await netlifyStore.get(key, { type: "json" })) as T | null;
  } catch {
    // Une panne du store ne doit jamais faire tomber une requête utilisateur.
    return null;
  }
}

export async function writeJson<T>(key: string, value: T): Promise<void> {
  const netlifyStore = resolveStore();
  if (!netlifyStore) {
    memoryFallback.set(key, value);
    return;
  }

  try {
    await netlifyStore.setJSON(key, value);
  } catch {
    // Idem : on préfère perdre un incrément que renvoyer une erreur au visiteur.
  }
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

interface DailyCounter {
  count: number;
  day: string;
}

/** Lit un compteur journalier ; renvoie 0 si absent ou périmé. */
export async function readDailyCount(key: string): Promise<number> {
  const entry = await readJson<DailyCounter>(key);
  if (!entry || entry.day !== todayKey()) return 0;
  return entry.count;
}

/** Incrémente un compteur journalier et renvoie sa nouvelle valeur. */
export async function incrementDailyCount(key: string): Promise<number> {
  const today = todayKey();
  const entry = await readJson<DailyCounter>(key);
  const count = entry && entry.day === today ? entry.count + 1 : 1;
  await writeJson<DailyCounter>(key, { count, day: today });
  return count;
}
