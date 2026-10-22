import { createHash, timingSafeEqual } from 'node:crypto';

// Upstash Redis (added from Vercel's Storage tab) exposes a REST URL and token.
// The variable names depend on the prefix chosen when connecting it, so look for any pair.
function findRedisEnv() {
  const env = process.env;
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL ||
    Object.entries(env).find(([k]) => k.endsWith('_REST_API_URL') || k.endsWith('_REDIS_REST_URL'))?.[1];
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN ||
    Object.entries(env).find(([k]) => (k.endsWith('_REST_API_TOKEN') || k.endsWith('_REDIS_REST_TOKEN')) && !k.includes('READ_ONLY'))?.[1];
  return { url, token };
}

export function storeReady() {
  const { url, token } = findRedisEnv();
  return Boolean(url && token);
}

export async function redis(...command) {
  const { url, token } = findRedisEnv();
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || `Storage error ${r.status}`);
  return j.result;
}

export async function pipeline(commands) {
  const { url, token } = findRedisEnv();
  const r = await fetch(url.replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands)
  });
  const j = await r.json().catch(() => null);
  if (!r.ok || !Array.isArray(j)) throw new Error(`Storage error ${r.status}`);
  return j.map(x => {
    if (x.error) throw new Error(x.error);
    return x.result;
  });
}

const digest = s => createHash('sha256').update(String(s)).digest();

export function passcodeSet() {
  return Boolean(process.env.EDIT_PASSCODE);
}

// The class passcode travels in the x-passcode header. Compare hashes so timing doesn't leak it.
export function passcodeOk(req) {
  const want = process.env.EDIT_PASSCODE;
  if (!want) return false;
  const got = req.headers['x-passcode'];
  if (typeof got !== 'string' || !got) return false;
  return timingSafeEqual(digest(got), digest(want));
}

export function noStore(res) {
  res.setHeader('Cache-Control', 'no-store');
}
