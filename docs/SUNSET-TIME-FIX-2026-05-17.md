# Sunset Cruise Departure Time Fix — 2026-05-17

## Summary
Changed the canonical Bosphorus Sunset Cruise "shown" departure time from **18:30 → 19:00** across product data, page schemas, FAQ, llms.txt, dev preview, and admin form default.

This is the second pass on this change — a previous pass missed several surfaces (notably email/PDF). This pass verified that **email templates and the PDF voucher pull `time` and `departureTime` from the tour data / reservation record at runtime** (no hardcoded `18:30` anywhere in `src/lib/email-templates/` or `src/lib/reservation-pdf.ts`). So updating `tours.ts` + the admin form default + the dev preview is sufficient to propagate the fix to all future emails and vouchers.

## Files Changed

| File | Reason |
|---|---|
| `src/data/tours.ts` | Canonical source. Updated `departureTime` for `bosphorus-sunset-cruise` from `18:30` → `19:00`. Updated 5 itinerary entries (boarding 18:15→18:45, then +30min for each subsequent stop preserving the 2-hour pacing). Updated FAQ answer ("shown as an 18:30 departure" → "19:00 departure"). |
| `src/data/faq.ts` | Top-level Turkish FAQ "görünen kalkış saati 18:30" → "19:00". |
| `src/app/page.tsx` | Homepage quick-facts strip "Karaköy pier, 18:30 sunset" → "19:00 sunset". |
| `src/app/cruises/[slug]/page.tsx` | Event schema for sunset cruise: `startDate` `T18:30:00` → `T19:00:00`, `endDate` `T20:30:00` → `T21:00:00`, `startTime` → `19:00`, `endTime` → `21:00` (2-hour duration preserved). |
| `src/app/ai-knowledge/page.tsx` | Updated AI-knowledge product card and table row: `~18:30-19:30` → `~19:00-19:30` (lower bound aligned with new canonical departure). |
| `src/lib/experience-support.ts` | Meeting-points page departure plan label "usually around 18:30" → "19:00". |
| `src/components/admin/AdminManualReservationForm.tsx` | Time field placeholder default `18:30` → `19:00` (defaults still resolve from `selectedTour?.defaultTime` first). |
| `src/app/api/dev/email-diagnostic/route.ts` | Dev email preview endpoint: 3 instances of `time: "18:30"` → `time: "19:00"` (preview renders sunset cruise confirmation + reminder emails — keeps the preview consistent with production data). |
| `public/llms-nl.txt` | Dutch llms.txt: `~18:30-19:30` → `~19:00-19:30` in 2 places. |

## Email Templates — Specifically Audited

Searched `src/lib/email-templates/` (all files: `booking-abandonment-notification.ts`, `contact-notification.ts`, `helpers.ts`, `lead-autoresponder.ts`, `reservation-cancelled.ts`, `reservation-confirmation.ts`, `reservation-notification.ts`, `reservation-reminder.ts`). Also `src/lib/email.ts`.

**Result: zero hardcoded `18:30` references in any email template.** Templates accept a `time` prop and render it directly. The `time` value flows from the reservation record (real bookings) or from the dev preview endpoint (test sends). With the dev endpoint now using `19:00`, all preview emails will render `19:00`. All real reservations naturally use the user-selected time, which on the booking flow now defaults to `19:00` per the updated `tours.ts` `departureTime` field.

## PDF Voucher — Specifically Audited

`src/lib/reservation-pdf.ts` and `src/lib/reservation-documents.ts`: **no hardcoded `18:30`.** The PDF builder uses the `time` field passed into `buildReservationPdfAttachments()`, which is set from the reservation record. Auto-propagates with `tours.ts` change. Confidence: high.

## 18:30 References Intentionally LEFT (with reason)

| Location | Reason |
|---|---|
| `src/app/[locale]/dinner-cruise-with-hotel-pickup-istanbul/page.tsx` (9 hits in TR/DE/NL + FR `18h30`) | DINNER cruise hotel pickup times, not sunset departure. |
| `src/app/[locale]/dinner-cruise-pickup-sultanahmet-taksim/page.tsx` (12+ hits in TR/DE/NL/FR) | DINNER cruise pickup route from Sultanahmet (18:30 pickup → 19:00 transit → 19:20 pier). |
| `src/components/tours/TourDetailClient.tsx:231` | Inline comment documenting historical Clarity dead-click data from 2026-05-08. Historical record, not visible text. |
| `src/lib/telegram/formatters.ts:623` | "18:30 Akşam özet" is the cron schedule for the admin evening-summary Telegram notification, not a cruise time. |
| `src/data/tours.ts:241` | Seasonal range "September-October around 18:30-19:30" — astronomical/seasonal context, accurate. |
| `src/data/tours.ts:264` | Same seasonal range answer ("spring and autumn ... around 18:30-19:30"). |
| `src/data/blog/posts/foundational-cruise-guides.ts` (5 hits) | Monthly schedule blog data showing March=18:30, October=18:30. These are real shoulder-season departure times across the operating year — accurate historical/seasonal information. |
| `src/data/blog/posts/private-yacht-and-occasion-guides.ts` (2 hits) | Sample bachelorette / wedding charter timelines — independent of sunset cruise product schedule. |
| `src/data/blog/posts/commercial-cruise-guides.ts:1333` | Astronomical sunset times by month ("by late March, sunset has shifted to 18:30"). Pure astronomy. |
| `src/data/blog/posts/istanbul-city-guides.ts:385` | Grand Bazaar vendors begin closing stalls from 18:30. Unrelated city-guide info. |
| `src/data/blog/posts/commercial-conversion-guides.ts` (6 hits) | Seasonal tables and Q&A describing the historical seasonal departure window — accurate. |
| `src/data/blog/posts/turkish-product-posts.ts:1505` | Turkish blog describing summer-window departure range "18:30–19:00 kalkışı" — describes June-August option range. |
| `src/data/blog/posts/planning-and-support-guides.ts:826` | "Hotel pickup begins around 18:30–19:00" — dinner cruise hotel pickup window. |
| `public/llms.txt`, `llms-full.txt`, `llms-de.txt`, `llms-fr.txt`, `llms-tr.txt` | No `18:30` references found in these files (already aligned). |

## Verification
- `npx tsc --noEmit` → clean (no errors)
- Email + PDF: confirmed pull from data source, auto-propagate.
- All non-dinner / non-astronomical sunset references updated.

## Confidence
**High** for email + PDF propagation (template-driven, no hardcoded times).
**High** for canonical product display (tours.ts is the single source of truth feeding tour pages and booking flow).
**Medium** for blog post seasonal tables — these are intentionally left as historical seasonal context, but if marketing wants the "headline" March/October departure rebased to 19:00 across all blog content, that is a separate editorial task (not a data fix).
