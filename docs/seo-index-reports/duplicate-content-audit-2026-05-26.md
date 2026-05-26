# Blog Content Cannibalization Audit — 2026-05-26

Generated during daily routine.  Lists POTENTIAL duplicates for future
consolidation work.  Each cluster should be reviewed and either:
- noIndex the weaker page (lower impressions / older / shallower content)
- 301 redirect if the slug is genuinely deprecated
- Differentiate intent in titles + content if both should stay

## Resolved this session
- ✓ /blog/bosphorus-family-cruise-kids-guide → noIndex (loser vs /blog/bosphorus-cruise-with-kids, 15 imp pos 8.6)
- ✓ /blog/bosphorus-cruise-vs-ferry → noIndex (older duplicate of /blog/bosphorus-cruise-vs-ferry-istanbul-2026, 32 imp pos 10.5)

## Pending review (3+ posts share slug fragments)

### Private yacht charter / hire (5 posts)
- /blog/private-yacht-charter-istanbul-prices
- /blog/private-yacht-charter-istanbul-price
- /blog/private-yacht-hire-istanbul-2026
- /blog/private-yacht-charter-istanbul-guide
- /blog/private-yacht-charter-istanbul-2026-buyers-guide

### Sunset cruise variants (5 posts)
- /blog/istanbul-sunset-cruise-booking
- /blog/bosphorus-sunset-cruise-istanbul
- /blog/best-bosphorus-sunset-cruise-istanbul-2026
- /blog/best-bosphorus-sunset-cruise-operators-istanbul-2026
- /blog/istanbul-sunset-cruise-experience

### Dinner cruise variants (5 posts)
- /blog/bosphorus-dinner-cruise-booking
- /blog/bosphorus-dinner-cruise-what-to-expect
- /blog/istanbul-dinner-cruise-price-guide-2026
- /blog/istanbul-dinner-cruise-etiquette-2026
- /blog/bosphorus-sunset-dinner-cruise-vs-lunch

### Cruise vs ferry / comparison (1 posts)
- /blog/istanbul-boat-tour-vs-ferry

### Boat party / birthday boats (3 posts)
- /blog/istanbul-boat-party-private
- /blog/party-boat-istanbul
- /blog/birthday-party-boat-istanbul

### Bosphorus cruise prices (broad) (3 posts)
- /blog/bosphorus-cruise-prices-comparison
- /blog/bosphorus-cruise-price-istanbul-2026
- /blog/bosphorus-cruise-prices-2026

### Bosphorus cruise general guides (2 posts)
- /blog/best-bosphorus-cruise-istanbul-guide
- /blog/istanbul-cruise-complete-guide-2026

## Audit method
1. Pull GSC search analytics for each slug (impressions + position)
2. Read post content to confirm intent overlap
3. For each cluster: pick winner (highest impressions OR clearest CTA), noIndex losers
4. After noIndex deploy, monitor GSC 30 days for winner ranking lift

