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

### DONE 2026-06-28 (night-1 growth pass, deploys `8aff11c` + `1b9e776`)
Closed from the list below: ~~#2 internal linking~~ (per-post "Related" + category-aware "Keep reading"),
~~#3 Open Graph~~ (default share card `og.png` + Twitter cards site-wide; per-post custom cards still open),
~~#4 `/funding` index page~~ (CollectionPage + ItemList schema), ~~#8 email capture~~ (Netlify Forms, real),
~~#9 About page~~ (`/about`), ~~#10 analytics~~ (GA4 `G-26RYXCP42D` installed). Also: FAQPage + direct-answer
blocks on BBAA/RAII/MFIPPA posts, news-sitemap.xml, share buttons, Frayze footer credit.

### P0 GROWTH BACKLOG — MASSIVE VIEWS (Denis directive 2026-06-28; from the 3-agent review)
Top priority. The first cluster is fast-ranking CONTENT the content engine should write next (proof-integrity:
funding facts stay "confirm with the program," sourced):
1. ~~**"RAII vs BBAA: which grant is right for your NWO business"**~~ — DONE 2026-06-28
   (`/blog/raii-vs-bbaa-which-grant-northwestern-ontario`, answer box + side-by-side + FAQPage + cross-links).
2. ~~**"AI for Thunder Bay businesses — what's actually worth doing in 2026"**~~ — DONE 2026-06-28
   (`/blog/ai-for-thunder-bay-businesses-2026`, missed-call-first, funding bridge, FAQPage).
3. ~~**Per-program pages**~~ — DONE 2026-07-02 (commit `9efbe71`). `/funding/<id>` for all 17 programs,
   each with GovernmentService + FAQPage JSON-LD, direct-answer box, eligibility table, related programs,
   and email CTA. Funding index ItemList now points to canonical thunderbayai.com URLs. Prerender updated.
4. **Situational adoption posts** (low competition, strong local angle): AI for a NWO restaurant / construction co /
   municipality; "missed-call AI for a local business"; **"ChatGPT vs Claude for a Canadian small business"** (data-
   residency + the Fable 5 Canada block as the concrete hook).
5. **Localization + infra posts**: Ring of Fire supply-chain + where AI fits; Ignace DGR tech/trades jobs; a standing
   "Canadian AI access tracker" (Fable/Mythos). Every major national AI story gets a "what it means for NWO" version.
6. **GEO citability polish**: lead every funding post with a 2-sentence direct answer (pattern shipped on BBAA/RAII —
   extend to the rest); add HowTo schema to BBAA "how to be ready"; DefinedTerm for MFIPPA/RAII/BBAA; Dataset schema
   on `/funding`; add **author byline / E-E-A-T** attribution (helps Google News).
7. **Trust/UX**: surface "nothing publishes unread" near the hero; visible contact email; RSS feed; check the
   FundingRadar modal body-scroll-lock on mobile; per-post custom OG cards (the og-image pattern).

### DENIS-ONLY (off-site, can't be automated — distribution is the real fast-views lever for a new domain)
Submit sitemap + news-sitemap to GSC + Request Indexing; route Netlify subscribers -> GHL (CASL double-opt-in);
email NetNewsLedger (newsroom@netnewsledger.com) + NOIC (hussain@nwoinnovation.ca) the BBAA explainer; start a
LinkedIn newsletter from Denis's profile (link in first comment per the no-url-in-body rule); Beehiiv recommendation
swaps; apply to Google News + the Perplexity Publisher Program. NEVER auto-post to strangers' threads / Reddit promo
(ban risk), never CASL cold-blast, never bought traffic — those torch the authority that IS the product.

### SOCIAL ENGINE — improvement experiments (review the monitor brief, then iterate)
The IG engine is live (`scripts/social/` — carousel + reel + story, auto-scheduled to @thunderbayai; monitor brief
Thu+Sun). Goal: viral + followers, which COMPOUNDS over weeks — so improve a little every cycle, guided by what the
monitor says is working. Standing rules: scroll-stopping cover + follow/comment/save CTA; NEVER buy engagement; posts
stay scheduled (review buffer). Backlog (work a couple per cycle; let engagement data pick winners):
1. **Read `scripts/social/brief.txt` first.** Whatever format/topic/hook leads, bias the next `spec.json` toward it.
   Note the experiment + result in `stats-history.jsonl` so the trend is legible over time.
2. **Hook A/B** — vary the cover style between cycles (number-led vs word-led vs question-led) and compare engagement.
3. **Image-gen backdrops** — try an Imagen/AI-Studio hero backdrop on the cover/CTA slide (USE SPARINGLY — prefunded
   spend, per the model-economy rule). Compare against the coded-only cover. Keep type coded (never baked into AI gen).
4. **Off-day lanes (still manual) → automate**: Tue story-poll, Thu "explainer" carousel from the 17-article library,
   Fri "grant of the week" from the funding radar, weekend "save this" tip. Add these as scheduled lanes in run.sh.
5. **Story auto-scheduling** — IG stories via the GHL API were left manual; test the story `type` and wire it.
6. **Facebook cross-post** — once a TBAI FB page is connected, add it to the target accounts (free reach).
7. **Reel polish** — the reel is a frame-flip; test smoother motion / a hooky first 1s; measure watch-through if GHL exposes it.
8. **Richer insights** — GHL gives like/share/comment; reach/saves/follows need the Meta API. Evaluate connecting it.

### Original backlog (still valid; the night pass closed several — see DONE above)

1. ~~**Schema.org structured data**~~ — DONE (commit `01064f2`): `Organization`/`WebSite` site-wide
   (publisher: Frayze) + `Article` + `BreadcrumbList` per Journal post via `lib/useJsonLd.js`, captured
   by the prerender. FOLLOW-UP: add `ItemList`/`GovernmentService`-style markup for the funding programs
   once they have their own pages (backlog item 4).
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
