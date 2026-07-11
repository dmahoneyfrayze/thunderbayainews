#!/usr/bin/env node
// linkcheck-sources.mjs — the deterministic half of the monthly funding re-verification sweep.
// Curls every GRANTS_DATA sourceUrl and reports status / redirects / failures. The two dead
// CEDC links found 2026-07-10 were exactly this failure class (a site restructure moved paths).
// The judgment half (re-checking amounts/deadlines/eligibility against page content, stamping
// lastVerified) stays with the monthly routine/session — this script only proves the links live.
// Run: node scripts/linkcheck-sources.mjs   (exit 1 if any source is dead or redirected)

import { GRANTS_DATA } from "../src/data.js";

const UA = "Mozilla/5.0 (compatible; ThunderBayAI-linkcheck/1.0; +https://thunderbayai.com)";
let failures = 0;

async function probe(url) {
  try {
    const r = await fetch(url, { method: "GET", redirect: "manual", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
    return { status: r.status, location: r.headers.get("location") };
  } catch (e) {
    return { status: 0, error: e.message };
  }
}

for (const g of GRANTS_DATA) {
  const r = await probe(g.sourceUrl);
  let verdict = "OK";
  if (r.status === 0 || r.status >= 400) { verdict = "DEAD"; failures++; }
  else if (r.status >= 300) { verdict = "REDIRECT"; failures++; }
  const extra = r.location ? ` -> ${r.location}` : r.error ? ` (${r.error})` : "";
  console.log(`  ${verdict.padEnd(9)} ${String(r.status).padEnd(4)} ${g.id.padEnd(32)} ${g.sourceUrl}${extra}  lastVerified=${g.lastVerified ?? "MISSING"}`);
}

console.log(failures ? `\n${failures} source(s) need attention — fix the URL or re-verify the program, then update lastVerified.` : "\nall sources live");
process.exit(failures ? 1 : 0);
