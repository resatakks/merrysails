#!/bin/bash
# Weekly Multi-Brand Review — Pazartesi 09:00 auto-run
# Runs AI visibility scan + rank tracker, generates summary, logs result.
#
# Usage:
#   ./scripts/weekly-review.sh
# OR via launchd (com.merrysails.weekly-review.plist)

set -e

REPO_ROOT="/Users/resat/Desktop/merrysails"
cd "$REPO_ROOT"

# Timestamps
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
DATE=$(date +%Y-%m-%d)
LOG_DIR="$REPO_ROOT/data/multi-brand-monitoring/weekly-logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/weekly-review-$DATE.log"

echo "═══════════════════════════════════════════════" | tee "$LOG_FILE"
echo "Weekly Multi-Brand Review — $TIMESTAMP" | tee -a "$LOG_FILE"
echo "═══════════════════════════════════════════════" | tee -a "$LOG_FILE"

# Load PATH for cron environment (Node is in homebrew)
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

# Verify Node exists
if ! command -v node &>/dev/null; then
  echo "ERROR: node not found in PATH ($PATH)" | tee -a "$LOG_FILE"
  exit 1
fi

# Verify .env.local exists
if [ ! -f "$REPO_ROOT/.env.local" ]; then
  echo "ERROR: $REPO_ROOT/.env.local missing" | tee -a "$LOG_FILE"
  exit 1
fi

echo "" | tee -a "$LOG_FILE"
echo "▶ AI Visibility Scan (9 brands × 3 models × prompts)..." | tee -a "$LOG_FILE"
node --env-file=.env.local scripts/ai-visibility-scan.mjs 2>&1 | tee -a "$LOG_FILE" || {
  echo "❌ AI visibility scan failed" | tee -a "$LOG_FILE"
}

echo "" | tee -a "$LOG_FILE"
echo "▶ Rank Tracker (weekly — 65 KW × 9 brands)..." | tee -a "$LOG_FILE"
node --env-file=.env.local scripts/rank-tracker.mjs 2>&1 | tee -a "$LOG_FILE" || {
  echo "❌ Rank tracker failed" | tee -a "$LOG_FILE"
}

# Summary section — extract key insights
echo "" | tee -a "$LOG_FILE"
echo "═══════════════════════════════════════════════" | tee -a "$LOG_FILE"
echo "📋 WEEKLY DIGEST (auto-extracted)" | tee -a "$LOG_FILE"
echo "═══════════════════════════════════════════════" | tee -a "$LOG_FILE"

# AI visibility top-line
if [ -f "$REPO_ROOT/data/multi-brand-monitoring/ai-visibility-latest.md" ]; then
  echo "" | tee -a "$LOG_FILE"
  echo "AI Visibility scoreboard:" | tee -a "$LOG_FILE"
  sed -n '/^## Brand visibility scoreboard/,/^## /p' "$REPO_ROOT/data/multi-brand-monitoring/ai-visibility-latest.md" | head -30 | tee -a "$LOG_FILE"
fi

# Rank delta extraction
if [ -f "$REPO_ROOT/data/multi-brand-monitoring/rank-latest.md" ]; then
  echo "" | tee -a "$LOG_FILE"
  echo "Rank improvements this period (↑) and losses (↓):" | tee -a "$LOG_FILE"
  grep -E "↑|↓" "$REPO_ROOT/data/multi-brand-monitoring/rank-latest.md" | head -30 | tee -a "$LOG_FILE"
fi

echo "" | tee -a "$LOG_FILE"
echo "✅ Done — full reports:" | tee -a "$LOG_FILE"
echo "   AI: data/multi-brand-monitoring/ai-visibility-latest.md" | tee -a "$LOG_FILE"
echo "   Rank: data/multi-brand-monitoring/rank-latest.md (weekly)" | tee -a "$LOG_FILE"
echo "   Log: $LOG_FILE" | tee -a "$LOG_FILE"

# Mac notification (works when laptop is on)
osascript -e "display notification \"Multi-brand weekly review complete. See $LOG_FILE\" with title \"MerrySails Weekly Review\" sound name \"default\"" 2>/dev/null || true
