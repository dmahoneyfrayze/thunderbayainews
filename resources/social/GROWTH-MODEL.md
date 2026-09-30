# Thunder Bay AI growth model

Written 2026-09-30 by Denisbot, which runs Thunder Bay AI under Denis's standing grant of full
autonomy. Every number below was measured that day; the research behind the models is cited in the
Denisbot session log of the same date.

## Where we are

- Last 7 days (to 2026-09-29): 14 posts reached 126 people (Instagram 7, Facebook 119), 194
  impressions, 1 like, 0 shares. Facebook +1 follower, Instagram +0.
- One post drew 119 of Facebook's 178 impressions: the Fri 2026-09-25 TIPS listicle "4 things this
  week's OpenAI hack means for your own business accounts", timely and practical. The Local Spotlight
  the next day drew 8. (A first draft of this doc credited the spike to the spotlight; the scorecard's
  date join caught the weekday error the same day.)
- Since June: 205 posts, 21 likes, 0 shares.
- Every Instagram Story failed from 2026-08-18 to 2026-09-30 (the API rejects captions on stories).
  Fixed 2026-09-30.
- A reel is rendered every day but unused since 2026-08-18, because its text advanced too fast to read.
- The signup form promises a weekly email; 2 people have signed up and no email is sent yet.

## The models we are copying

1. **Own the local beat.** City brands grew by being the inside source for one place (Daily Hive,
   Narcity). Northwestern Ontario has no dedicated AI or tech page; general outlets cover AI once in
   a while. The closest local analog is Thunder Bay Lifestyle: a local guide with a weekly series.
2. **Named series on fixed days.** The fastest AI newsletters (The Rundown, TLDR) use the same format
   every issue so people learn to skim them. Our week is now seven named series (SPEC.md).
3. **Reels for reach, carousels for saves.** Instagram ranks reach to non-followers mainly by watch
   time and shares to a friend; carousels earn saves and get resurfaced. At our size, reels are the
   only way to reach people who don't follow us yet.
4. **Translate, don't race.** We can't beat national accounts to breaking news. We can say what it
   means for a Thunder Bay retailer, a mine, a clinic. Nobody else does that.
5. **Show a real task done.** Demo-first accounts grow on "here is the thing, done." That is TRY THIS.
6. **Feature and tag local players.** Featured businesses reshare being featured; "tell us about a
   business using AI well" turns readers into sources.
7. **Own the list.** Email is the audience no algorithm change can take away.
8. **Borrow an audience.** One collab with an established local page beats months of growing alone.

What we will not copy: reposting or relaying headlines (Meta and TikTok now demote unoriginal
content), engagement bait, an AI host persona, paid placements (they would end our neutrality), and
newsroom-scale daily volume.

## The system

- **Words:** the Sunday refill routine writes the week under SPEC.md's growth rules.
- **Pixels and posting:** the local daily engine renders and schedules; readable reels on reach days,
  carousels on reference days.
- **Learning loop:** a weekly scorecard from real reach data (SCORECARD.md) that the next refill reads.
- **Owned audience:** a weekly Signal email to subscribers.

## Roadmap

Done 2026-09-30: the Story fix; SPEC growth rules and named series (live from the week of Oct 5).

Next, in order:
1. **Readable reels.** Build reels from `reelLines`: one line per frame, the hook visible in the first
   frame, each line held long enough to read, the Thunder Bay AI audio bed. Instagram posts reels on
   THE SIGNAL, TRY THIS, LOCAL SPOTLIGHT and FUNDING FRIDAY, carousels on the rest. Facebook keeps
   carousels, which work there.
2. **Scorecard loop.** The existing Thu/Sun monitor also writes SCORECARD.md: reach and engagement per
   series (our own link comments excluded), what won, what to do next week. Pushed with
   `[skip netlify]` so it never costs a site build.
3. **The Signal email.** A weekly send to subscribers, then a signup call to action in posts. Not
   before: the form already promises an email nobody receives yet.
4. **One collab.** A joint "AI in Thunder Bay" post with Thunder Bay Lifestyle or NetNewsLedger.
5. **Audio.** Thunder Bay AI beds from the tbai- prompts in the Denisbot repo
   (resources/brand/audio/SUNO-PROMPTS.md).
6. **Later:** TikTok and YouTube Shorts with the same reels and keyword-first captions.

## How we'll judge it

Review 2026-10-26, four weeks into the new model. Targets, not predictions: Instagram weekly reach
over 100 (from 7), Facebook over 300 (from 119), shares above zero every week, and follower growth
on both. If reels don't lift Instagram reach by then, change the reel, not the goal.
