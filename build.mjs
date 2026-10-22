// Turns src/app.html (the same page that runs as a claude.ai artifact) into a full
// web page at public/index.html for Vercel. Run with: node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync(new URL('./src/app.html', import.meta.url), 'utf8');

// Lift the <title>, <meta> and <link> tags that sit before the first <style> into <head>.
const styleAt = src.indexOf('<style>');
const top = src.slice(0, styleAt);
const rest = src.slice(styleAt);
const headTags = (top.match(/<title>[\s\S]*?<\/title>|<meta [^>]*>|<link [^>]*>/g) || [])
  .filter(t => !t.includes('claude:viewport-fit-sides'));
const leftover = top.replace(/<title>[\s\S]*?<\/title>|<meta [^>]*>|<link [^>]*>/g, '').trim();

const favicon = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M14 40c-6-3-7-12-1-17 2-9 12-14 20-12 6-4 16-2 20 4 7 2 9 10 7 15 2 6-2 12-8 12-1 4-6 6-10 5-2 3-6 4-9 2l-1 9h-6l1-11c-6 1-11-2-13-7z" fill="#FFB4A8" stroke="#161A2E" stroke-width="3"/></svg>'
);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Guest speaker research, questions, notes and teacher feedback.">
<link rel="icon" href="${favicon}">
${headTags.join('\n')}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
${leftover}
${rest}
</body>
</html>
`;

mkdirSync(new URL('./public/', import.meta.url), { recursive: true });
writeFileSync(new URL('./public/index.html', import.meta.url), html);
console.log('Built public/index.html');
