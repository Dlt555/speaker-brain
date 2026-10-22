import { storeReady, redis, pipeline, passcodeOk, passcodeSet, noStore } from './_lib.js';

const COLLECTIONS = ['speakers', 'feedback'];
const ID = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_DOC_BYTES = 200 * 1024;
const VERSION_KEY = 'sb:version';
const key = col => `sb:${col}`;

function parseHash(flat) {
  const out = [];
  for (let i = 0; i < (flat || []).length; i += 2) {
    try { out.push({ id: flat[i], ...JSON.parse(flat[i + 1]) }); } catch { /* skip a damaged row */ }
  }
  return out;
}

export default async function handler(req, res) {
  noStore(res);
  if (!storeReady()) {
    return res.status(503).json({ error: 'Storage is not connected yet. In Vercel, open the project, go to Storage, add Upstash for Redis, connect it to this project and redeploy.' });
  }

  try {
    if (req.method === 'GET') {
      const version = String((await redis('GET', VERSION_KEY)) ?? '0');
      if (req.query.since !== undefined && String(req.query.since) === version) {
        return res.status(200).json({ version, unchanged: true });
      }
      const [speakers, feedback] = await pipeline([['HGETALL', key('speakers')], ['HGETALL', key('feedback')]]);
      return res.status(200).json({
        version,
        speakers: parseHash(speakers),
        feedback: parseHash(feedback),
        ai: Boolean(process.env.ANTHROPIC_API_KEY),
        passcodeSet: passcodeSet()
      });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ error: 'Use GET or POST.' });
    }

    if (!passcodeOk(req)) return res.status(401).json({ error: 'Wrong or missing class passcode.' });

    const { op, col, id, data } = req.body || {};
    if (op === 'check') return res.status(200).json({ ok: true });

    if (!COLLECTIONS.includes(col)) return res.status(400).json({ error: 'Unknown collection.' });
    if (typeof id !== 'string' || !ID.test(id)) return res.status(400).json({ error: 'Bad id.' });

    if (op === 'remove') {
      await redis('HDEL', key(col), id);
    } else if (op === 'set' || op === 'update') {
      if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'Missing data.' });
      let doc = { ...data };
      delete doc.id;
      if (op === 'update') {
        const existing = await redis('HGET', key(col), id);
        if (!existing) return res.status(404).json({ error: 'That item no longer exists. Reload the page.' });
        doc = { ...JSON.parse(existing), ...doc };
      }
      const json = JSON.stringify(doc);
      if (Buffer.byteLength(json) > MAX_DOC_BYTES) return res.status(413).json({ error: 'This speaker has too much text to save. Trim some notes.' });
      await redis('HSET', key(col), id, json);
    } else {
      return res.status(400).json({ error: 'Unknown operation.' });
    }

    const version = String(await redis('INCR', VERSION_KEY));
    return res.status(200).json({ ok: true, version });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: 'The storage service had a problem. Try again in a moment.' });
  }
}
