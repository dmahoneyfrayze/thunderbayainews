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

## Weekly rotation (named series, fixed days; replaced 2026-09-30)
Put the series name in `cover.chip` exactly as written, so readers learn what each day brings:
- post[0] Mon **THE SIGNAL**: kind "signal", the week's Northwestern Ontario AI news from the radar brief.
- post[1] Tue **TRY THIS**: the how-to. One real task a local business can do this week with a free or
  common tool, 3 to 5 steps as a `list`.
- post[2] Wed **LOCAL SPOTLIGHT**: the pillar below.
- post[3] Thu **AI FOR BUSINESS**: one development translated into what it changes for a named local
  sector (mining, forestry, health care, tourism, trades, retail, public sector).
- post[4] Fri **FUNDING FRIDAY**: one verified program.
- post[5] Sat **THE LIST**: the listicle (`list` of 3 to 5).
- post[6] Sun **THE TAKE**: the radar brief's top op-ed seed, what this move means for Northwestern Ontario.

## LOCAL SPOTLIGHT pillar (added 2026-08-15)
One card per week profiles a real Northwestern Ontario business or organization putting AI or
modern digital tools to work. Rules:
- Facts ONLY from public sources fetched and verified in-session (the org's own site or posts,
  or news coverage); the source URL goes in the card's `source` field.
- Neutral profile in the educate voice: what they do, what they adopted, what it changed for
  them as stated by THEM or the coverage. No endorsement language, no invented results.
- Never repeat an org featured in the last 8 weeks (check prior week files).
- If the org is a Frayze client: skip it, or the carousel caption must carry the plain line
  "Disclosure: <org> works with Frayze, our publisher's company." Never feature a client
  without that line.

## Growth rules (added 2026-09-30; where older guidance conflicts, these win)

Why: in the 7 days to 2026-09-29, 14 posts reached 126 people (Instagram 7, Facebook 119). One post
drew 119 of Facebook's 178 impressions: the Fri 2026-09-25 TIPS listicle "4 things this week's OpenAI
hack means for your own business accounts", timely and practical. The rest drew almost nothing, and
the 205 posts since June earned 21 likes and 0 shares. One spike proves little; the rules below come
from what grows local and faceless pages (GROWTH-MODEL.md), and SCORECARD.md will test them weekly.
Platforms now rank on shares, saves and watch time, and demote posts that only relay a headline.

1. **Local first, practical always.** Every post names something in Northwestern Ontario in
   `cover.hook` or the first caption line: a place, organization, sector, program or event. And every
   post tells the reader what it means for them or what to do about it. Global AI news appears only
   translated into one concrete local consequence. No post may be generic global AI news.
2. **Our own framing, never a relayed headline.** Every post carries at least one sentence of Thunder
   Bay AI's own analysis of why it matters here (the `why` block, or the caption's second paragraph).
3. **Caption first line = the hook, local keyword first**, under 125 characters (e.g. "Thunder Bay
   businesses can now..."). It is what shows before "more" and what search reads.
4. **Exactly one specific call to action per caption**, chosen from:
   - a send prompt naming a real reader: "Send this to a Thunder Bay business owner who still answers
     every call themselves." (Shares to a friend are the strongest reach signal.)
   - a save prompt on reference posts: "Save this for your next grant application."
   - a specific question with concrete options: "Which would you try first, the chatbot or the
     scheduler?"
   - on LOCAL SPOTLIGHT: "Know a Northwestern Ontario business using AI well? Tell us in the comments."
   Never generic engagement asks ("What do you think?", "Like if you agree", "Comment YES", "Tag a
   friend"). Meta and Instagram reduce distribution for engagement bait. `cta.commentQ` follows the
   same rule.
5. **Tag the featured organization.** On LOCAL SPOTLIGHT, if the org has a public Instagram or Facebook
   handle you verified this session, mention it once in the caption as @handle. Never tag anyone else.
6. **Hashtags: 3 to 5**, starting with #ThunderBayAI, the rest specific to the topic or place. Never
   the identical set two days in a row.
7. **Reel lines.** Every card also carries `"reelLines": [4 to 6 strings]`, each 8 words or fewer:
   line 1 is the hook, the last line is the call to action. Written for a vertical video that holds
   each line long enough to read.
8. **Scorecard.** If `resources/social/SCORECARD.md` exists, read it before planning and follow its
   "next week" guidance. It is written from real reach data.

## Hard rules
- Funding facts ONLY from `src/data.js` GRANTS_DATA or official FedNor/NOHFC/NOIC/CRA pages;
  frame as "confirm eligibility with the program" — never "you qualify".
- No emojis anywhere. No em dashes in captions or on cards (use commas, colons or periods).
- No URLs in caption bodies: `followUpComment` carries the link.
- Every listicle hook MUST carry a matching `list` array.
- Neutral media voice: educate, never sell. Thunder Bay AI never sells services.
- Inputs: `resources/radar/brief-latest.md` (weekly aggregated news + civic watch, committed
  Saturdays by the local radar job) — verify every claim against its linked source before use.
