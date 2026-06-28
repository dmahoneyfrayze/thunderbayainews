#!/usr/bin/env bash
# run.sh — Thunder Bay AI weekly social engine (LOCAL: needs .env GHL + ffmpeg).
# Consumes the committed scripts/social/spec.json (kept fresh each week by the cloud Signal
# routine — see resources/CONTENT-ENGINE.md), renders the carousel/reel/story, and SCHEDULES
# them to the thunderbayai IG. Scheduled, never instant: always a review window in the GHL
# planner. Does NOT push to git (out/ is gitignored), so it never races a cloud routine.
# A marker dedups so the same week's spec is not posted twice.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO="/Users/denismahoney/Desktop/thunder-bay-ai"; SOCIAL="$REPO/scripts/social"
ACCT="6a40daa7fbe81a5c2bb31b28_9A5cW9ju0zoGXbGIDmyW_17841445976710647"  # thunderbayai IG
LOG="$SOCIAL/run.log"; MARKER="$SOCIAL/.last-posted"; SPEC="$SOCIAL/spec.json"
note(){ echo "[$(date '+%F %T')] $*" | tee -a "$LOG"; }
notify(){ osascript -e "display notification \"$1\" with title \"TBAI social\"" 2>/dev/null || true; }

cd "$REPO" || exit 1
git pull --rebase --autostash origin main >/dev/null 2>&1 || note "git pull failed (using local copy)"

[ -f "$SPEC" ] || { note "no spec.json"; exit 0; }
jq -e '.cover.hook and (.items|length>=3) and .captions.carousel' "$SPEC" >/dev/null 2>&1 \
  || { note "spec.json invalid — not posting"; notify "spec invalid — nothing scheduled"; exit 1; }
ISO=$(jq -r '.iso' "$SPEC")
if [ -f "$MARKER" ] && [ "$(cat "$MARKER")" = "$ISO" ]; then note "already posted $ISO — skip"; exit 0; fi

OUT="$SOCIAL/out/$ISO"; mkdir -p "$OUT"
note "rendering $ISO: $(jq -r '.cover.hook' "$SPEC")"
node "$SOCIAL/generate.mjs" "$SPEC" "$OUT" >>"$LOG" 2>&1 || { note "render failed"; notify "render failed"; exit 1; }

CAR=$(date -v+1d -u +%Y-%m-%dT13:00:00.000Z 2>/dev/null || date -u -d "+1 day" +%Y-%m-%dT13:00:00.000Z)
REEL=$(date -v+3d -u +%Y-%m-%dT13:00:00.000Z 2>/dev/null || date -u -d "+3 day" +%Y-%m-%dT13:00:00.000Z)
note "scheduling carousel ($CAR) + reel ($REEL)..."
RES=$(bash "$SOCIAL/post.sh" "$OUT" "$ACCT" "$CAR" "$REEL" 2>&1); note "$RES"

if echo "$RES" | grep -q "HTTP 20[01]"; then
  echo "$ISO" > "$MARKER"; notify "scheduled this week's carousel + reel — review in the GHL planner"; note "done"
else
  notify "posting may have failed — check run.log"; note "posting did not confirm 200/201"
fi
