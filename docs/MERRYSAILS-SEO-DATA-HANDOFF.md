# MerrySails SEO Data Handoff

Use this file as the standard format when sharing GSC and Semrush data into a MerrySails SEO session.

## 1. What To Send First

Send data in this order:

1. GSC top queries for the last 28 days
2. GSC top queries for the last 3 months
3. Semrush organic positions export
4. Semrush keyword gap or keyword ideas export

## 2. GSC Export Template

Preferred columns:

| query | page | clicks | impressions | ctr | position |
|---|---|---:|---:|---:|---:|
| istanbul dinner cruise | https://merrysails.com/istanbul-dinner-cruise | 42 | 1800 | 2.3% | 11.4 |
| bosphorus dinner cruise | https://merrysails.com/istanbul-dinner-cruise | 18 | 1320 | 1.4% | 15.7 |
| private yacht charter istanbul | https://merrysails.com/yacht-charter-istanbul | 9 | 410 | 2.2% | 13.2 |
| boat rental istanbul | https://merrysails.com/boat-rental-istanbul | 6 | 290 | 2.1% | 17.9 |
| corporate yacht event istanbul | https://merrysails.com/corporate-events | 2 | 74 | 2.7% | 21.3 |

What helps most:

- Export separate slices for dinner, sunset, yacht, boat rental, proposal, and corporate pages
- Include rows where one query shows up on multiple URLs
- Include branded and non-branded rows

## 3. Semrush Export Template

Preferred columns:

| keyword | intent | volume | kd | cpc | url | position | note |
|---|---|---:|---:|---:|---|---:|---|
| istanbul dinner cruise | commercial | 1600 | 27 | 0.62 | https://merrysails.com/istanbul-dinner-cruise | 14 | owner-now |
| bosphorus dinner cruise | commercial | 1300 | 39 | 0.58 | https://merrysails.com/istanbul-dinner-cruise | 18 | owner-now |
| private yacht charter istanbul | commercial | 70 | 27 | 1.24 | https://merrysails.com/yacht-charter-istanbul | 22 | owner-now |
| private yacht charter istanbul price | commercial | 40 | 19 | 1.34 | https://merrysails.com/blog/private-yacht-charter-istanbul-price | 8 | blog-commercial |
| boat rental istanbul | commercial | 30 | 24 | 0.83 | https://merrysails.com/boat-rental-istanbul | 19 | owner-now |

Recommended note tags:

- `owner-now`
- `supporting-commercial`
- `blog-commercial`
- `informational`
- `cannibalization-check`

## 4. How To Mark Commercial Keywords

Commercial keywords usually contain at least one of these patterns:

- product + city
- price or cost
- book or ticket
- rental, hire, charter
- private
- package
- best
- with pickup

Strong MerrySails examples:

- `istanbul dinner cruise`
- `bosphorus dinner cruise`
- `dinner cruise with pickup istanbul`
- `bosphorus sunset cruise istanbul`
- `private yacht charter istanbul`
- `private yacht charter istanbul price`
- `boat rental istanbul`
- `proposal yacht istanbul`
- `corporate yacht event istanbul`
- `bosphorus cruise prices`

## 5. Copy-Paste Prompt For Future Sessions

Use this at the start of a future MerrySails SEO session:

```text
This is a MerrySails SEO session.
Use the repo AGENTS.md rules.
First audit owner URLs and cannibalization.
Then use the GSC and Semrush data I provide to map each commercial keyword to one owner page.
Flag duplicate ownership, CTR wins, quick-win queries in positions 5-20, and pages that need title/H1/internal-link updates.
Do not propose new pages until current owner pages are evaluated.
```
