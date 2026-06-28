# thunderbayai.com — Long-term plan + autonomous improvement roadmap

The site is run on autopilot (see `CONTENT-ENGINE.md` for content). This file is the **standing
plan**: where the site is going, and the prioritized backlog the monthly site-improvement agent
works through. The strategic thesis lives in the Denisbot repo
(`projects/thunderbay-ai/resources/STRATEGY.md`); this is the execution roadmap.

## The mission (don't drift from this)
Become the **AI-citable authority for "AI + funding + tech in Northwestern Ontario."** Three
compounding layers: a **cited asset** (GEO moat) → a **lead engine** → **revenue via grant-funded
builds**. Every change should make the site more trustworthy, more complete on the NWO-AI entity,
and more likely to be the answer an AI engine returns for a regional query. Regional specificity
and proof-integrity are the moat — protect both above all.

## Benefit Frayze, NEVER compete (the rule that governs everything)
This hub is **operated by Frayze** (a Northwestern Ontario AI agency), but it is a different LAYER,
not a second agency. It is the **neutral authority/media layer**; Frayze is the **services layer**.
- **NEVER make the hub sell AI services under its own brand.** No "hire us to build your AI." That
  would make it compete with Frayze and destroy the neutrality that is its entire value. The hub
  informs and bridges; Frayze delivers.
- **Neutrality is the asset.** Content (news, programs, radar) stays genuinely neutral and useful.
  The only commercial element is a light, **disclosed** bridge ("need it built? get connected" →
  Frayze) plus an honest "operated by Frayze" disclosure. The moment the hub reads as a Frayze ad,
  it loses the authority that makes it worth anything.
- The test for any change: *does this make the hub more trusted (good) or more like an ad (kills it)?*
  Full rationale in the Denisbot STRATEGY doc ("Benefit Frayze, never compete").

## Phases
- **Phase 1 — Foundation (DONE):** prerendered SPA, per-route SEO (title/desc/canonical), sitemap +
  robots, 17 verified funding programs, BBAA featured, the autonomous content engine, the domain live.
- **Phase 2 — Authority depth (NOW):** grow verified content across all six beats; structured data
  (schema.org) so machines parse the entity cleanly; internal linking; broaden + maintain the funding
  radar; a real weekly news cadence. Goal: become genuinely the most complete structured source.
- **Phase 3 — Distribution + capture:** email capture working end-to-end (weekly brief), Search Console
  + analytics feedback loops, outreach to the aligned institutions (CEDC/NOIC/FedNor) for links/
  partnership, syndication of the Signal.
- **Phase 4 — Scale:** template the whole thing to a second underserved region; pursue institutional
  sponsorship; expand the grant-funded-build funnel.

## Prioritized improvement backlog (the monthly agent pulls from the TOP)
Work top-down; when an item ships, check it off (and note the commit) and add new ones you discover.

1. **Schema.org structured data** — add JSON-LD: `Organization`/`WebSite` site-wide, `Article` +
   `BreadcrumbList` on each Journal post, and `ItemList`/`GovernmentService`-style markup for the
   funding programs. This is high-leverage for GEO/AI-citation. (Per-route, injected like the meta.)
2. **Internal linking** — link Journal posts to each other and to the relevant funding-radar programs;
   add "related programs" on posts and "related reading" on the radar. Crawl depth + topical authority.
3. **Open Graph / share images** — per-page OG image so shares/AI previews look credible.
4. **A real `/funding` (or `/programs`) index page** — a dedicated, crawlable, filterable page listing
   all programs with their own URLs (each program a citable page), not just the on-home radar widget.
   Big GEO win: one canonical URL per program.
5. **Performance** — keep the bundle lean as content grows; lazy-load the heavy radar; check Lighthouse.
6. **Accessibility pass** — contrast, focus states, semantic headings, reduced-motion (the cursor/parallax).
7. **Content depth** — ensure all six beats have several strong posts; fill gaps the content engine misses.
8. **Email capture** — wire the weekly-brief form to a real list (GHL or similar) end-to-end, CASL-compliant.
9. **About / "operated by Frayze" page** — honest disclosure that the hub is operated by Frayze (a NWO
   AI agency) + how the autonomous agent works and verifies. This is the transparency that makes the
   commercial bridge legitimate (Competition Bureau / trust), and it is itself citable. Keep it factual,
   not salesy.
11. **The Frayze bridge (light + disclosed)** — a single, honest "need this built? get connected" path
    (the radar lead form already does this) routing commercial intent to Frayze, clearly disclosed. Do
    NOT turn the hub into a Frayze sales site — one quiet bridge, not banners. Wire the lead capture to a
    real list/CRM (pairs with item 8). This is the monetization layer; keep it subordinate to the content.
10. **Analytics + Search Console loop** — once data exists, prune/improve low-performers, double down on
    what ranks; surface striking-distance queries.

## Autonomous improvement protocol (the monthly agent MUST follow)
1. Read this ROADMAP, the STRATEGY thesis, and the current site. Pick the **single highest-value
   item from the top of the backlog** that is shippable this run (or a clear sub-step of it).
2. Implement it well, matching the existing code style (inline-styled React, the dark aesthetic,
   the `useDocumentMeta` pattern for head injection, `lib/` helpers). No emojis. Proof-integrity on
   any claim/number.
3. **Verify before shipping (non-negotiable):** `npm run lint` clean, **`npm run build` MUST succeed**
   (it runs the prerender — a broken build = a broken deploy). If the build fails, do NOT push — revert
   your changes and email Denis what blocked you.
4. **Git discipline:** `git pull --rebase origin main` BEFORE committing (other agents/the operator
   push too, so your checkout may be behind). Commit atomically (`autopilot: <change>`), push to `main`;
   if push is rejected, `git pull --rebase` and retry (never force-push). Netlify deploys.
5. Update this ROADMAP: check off what shipped (with the commit), add follow-ups you found.
6. Email denis@frayze.ca: what changed, why, the live URL, the commit SHA. Always leave him a trail.
7. If nothing is confidently shippable, ship nothing and email why. Never push a change you cannot
   verify builds and is on-strategy.

## Guardrails (apply to every autonomous change)
- The build must pass and the site must stay up — verification is mandatory, not optional.
- Proof-integrity and no-emojis are absolute (same as content).
- Don't redesign on a whim — enhance toward the mission. Big visual/IA changes get noted here first
  and kept reversible.
- One change per commit so anything can be reverted with `git revert <sha> && git push`.
