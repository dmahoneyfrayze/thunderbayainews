# week.json spec — the weekly social refill contract

The Sunday refill routine writes `resources/social/week-next.json` in this shape. The local
daily engine (`~/frayze-jobs/tbai-social/` on Denis's Mac) adopts it each morning when its
`startDate` is newer than the local queue, rebuilds the queue, and posts one card per day to
@thunderbayai IG + FB (scheduled ~3h out; link in first comment). Render is deterministic —
the words written here are exactly what ships.

```json
{
  "startDate": "YYYY-MM-DD",        // the coming Monday
  "handle": "thunderbayai",
  "posts": [
    { "kind": "signal", "issueNo": "NN", "dateLabel": "MON DD", "cover": {"hook","sub"},
      "items": [ {tag,big,bigSize,title,body,tease,reelLine} x5 ], "summary": {title,body},
      "reelSub","storySub","captions": {carousel,reel,story,followUpComment} },      // Monday
    { "kind": "card", "pillar": "...", "accent": "#hex", "cover": {"chip","hook","sub"},
      "list": [ {"title","body"} x3-5 ],          // LISTICLES: one slide per item — REQUIRED when
                                                  // the hook promises "N things/questions/signs".
                                                  // With list set, title/body/big are skipped.
      "big","bigLabel","bigCaption","bigSub",     // STAT cards: big REQUIRES bigCaption (a bare
      "detailChip","title","body",                // number is a wasted slide); bigSub = eligibility.
      "why": {"title","body"}, "cta": {"hook","commentQ"}, "storyCta",
      "captions": {"carousel","story","followUpComment"}, "source": "..." }        // Tue-Sun (6 cards)
  ]
}
```

`build-queue.mjs` assigns dates from `startDate` (post[0]=Mon ... post[6]=Sun) and stable ids.

## Weekly rotation
Mon **Signal** (from the radar brief's top stories) · Tue Funding · Wed AI-for-business/How-to ·
Thu Signal-story or Tool · Fri **Funding Friday** · Sat Local use-case · Sun Mindset/Take (the
radar brief's top op-ed seed — why this matters for Northwestern Ontario).

## Hard rules
- Funding facts ONLY from `src/data.js` GRANTS_DATA or official FedNor/NOHFC/NOIC/CRA pages;
  frame as "confirm eligibility with the program" — never "you qualify".
- No emojis anywhere. No URLs in caption bodies — `followUpComment` carries the link.
- Every listicle hook MUST carry a matching `list` array.
- Neutral media voice: educate, never sell. Thunder Bay AI never sells services.
- Inputs: `resources/radar/brief-latest.md` (weekly aggregated news + civic watch, committed
  Saturdays by the local radar job) — verify every claim against its linked source before use.
