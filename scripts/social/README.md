# Thunder Bay AI — social engine

Turns each weekly **Signal** into an Instagram **carousel + reel + story** and auto-schedules
them to **@thunderbayai**. Faceless, coded, ~free to produce. Local (needs `.env` GHL creds +
ffmpeg), because the GHL Social Planner API can't run from a cloud routine.

## Flow
```
weekly Signal routine (cloud)         local launchd job (Mon 2pm)
  writes the Signal post        ->      run.sh:
  + scripts/social/spec.json            git pull -> read spec.json -> generate.mjs
  (CONTENT-ENGINE.md)                   -> post.sh (schedule to IG) -> notify
```

## Pieces
- **`spec.json`** — the week's editorial input (cover hook, 5 stories with punchy `big` keywords,
  throughline, captions). The cloud Signal routine rewrites it each week. Schema + rules:
  **`make-spec-prompt.md`**.
- **`generate.mjs`** — calcified renderer. `node generate.mjs <spec.json> [outDir]` ->
  `out/<iso>/` with `carousel-01..08.png` (1080x1350), `reel.mp4` (1080x1920), `story.png`,
  `captions.json`. Standing rules baked in: scroll-stopping cover + follow/comment/save CTA.
  GOTCHA: no CSS `filter:blur` on the tall stacked page — it times out the screenshot rasterizer;
  glows are plain radial-gradients.
- **`post.sh`** — `post.sh <outDir> <accountId> <carouselISO> [reelISO]`. Converts the carousel to
  JPG, uploads the set to GHL media, and SCHEDULES a multi-image carousel + the reel video to the
  IG account. curl-only (Cloudflare WAF 403s other UAs). Scheduled, never instant.
- **`run.sh`** — weekly orchestrator (launchd `com.frayze.tbai-social`, Mon 2pm). Dedups by `iso`
  (marker `.last-posted`), notifies via macOS notification, logs to `run.log`.

## Account
@thunderbayai IG account id: `6a40daa7fbe81a5c2bb31b28_9A5cW9ju0zoGXbGIDmyW_17841445976710647`
(connected to the Frayze GHL location's Social Planner). The job targets ONLY this id — never the
Frayze account group.

## Run manually
```
node scripts/social/generate.mjs scripts/social/spec.json     # render only
bash scripts/social/run.sh                                     # full weekly job (pull/render/schedule)
```
Stories aren't auto-scheduled (IG stories via API are flaky) — the story frame is generated; post it
by hand with a poll + link sticker, or in the off-day cadence.

## Cadence
Carousel (Mon) + reel (Wed) are auto-scheduled. The off-day touches (Tue poll story, Thu explainer
from the article library, Fri "grant of the week", weekend "save this") are still manual — the
generator produces the assets; scheduling those lanes is a future addition.
