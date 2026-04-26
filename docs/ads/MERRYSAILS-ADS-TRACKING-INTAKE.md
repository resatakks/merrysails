# MerrySails — Ads Tracking Intake

**Purpose:** Turn the next MerrySails Ads work session into an implementation-ready tracking and optimization plan.
**Status:** GA4 and Clarity IDs received. Google Ads account exists, but Ads web tag / conversion labels are still pending.

---

## 1. What We Need From The User

- `GA4` measurement ID: `G-9B3Q7FM7X8`
- `Google Ads` account tag / `AW-` ID: pending
- `Google Ads` conversion labels, if already created
- `Microsoft Clarity` project ID: `wfsykdd4gb`
- `GTM` container ID, if GTM will be used
- Any `Bing / Microsoft Ads` tag, if the account is live
- Whether calls and WhatsApp clicks should count as `primary` or `secondary`
- Target geos:
  - only people physically in Istanbul
  - foreign-intent searchers planning Istanbul
  - both, but in separate campaigns
- Starting budget range by campaign
- Whether remarketing is allowed for this project

### Ads account context

- Google Ads account number received: `548-498-9676`
- Important: this is the Ads account number, not the site tag ID
- For direct Google Ads conversion firing, we still need:
  - `AW-...` tag ID
  - conversion label(s)
- Until then, the safest path is:
  - install `GA4`
  - fire clean events
  - import the chosen GA4 conversions into Google Ads after linking

---

## 2. Conversion Surfaces Already Present In The Codebase

### 2.1 Reservation success

- Server action: `src/app/actions/reservation.ts`
- Best candidate for the highest-value primary conversion
- Recommended event payload fields:
  - `tour_slug`
  - `tour_name`
  - `package_name`
  - `guests`
  - `value`
  - `currency`
  - `reservation_id` or safe dedupe identifier

### 2.2 Contact form success

- Server action: `src/app/actions/contact.ts`
- Good secondary or primary lead event depending on lead quality
- Recommended fields:
  - `subject`
  - `contact_method = form`
  - `page_path`

### 2.3 Call click

- Component: `src/components/layout/WhatsAppButton.tsx`
- Should usually start as a secondary conversion until call quality is known

### 2.4 WhatsApp click

- Component: `src/components/layout/WhatsAppButton.tsx`
- Important intent signal, but usually safer as a secondary conversion first

---

## 3. Recommended First Conversion Hierarchy

### Primary

- `purchase`

### Secondary

- `contact_submit_success`
- `whatsapp_click`
- `phone_click`
- `begin_checkout`

### Conditional Later Additions

- `view_pricing`
- `package_select`
- `same_day_booking_attempt`
- offline-qualified lead import if CRM discipline becomes available

---

## 4. Recommended Event Map

| Event | Trigger | Priority | Notes |
|---|---|---|---|
| `view_item` | Core commercial page view | Secondary | Attach `tour_slug` |
| `begin_checkout` | Booking modal / booking start | Secondary | Use only if the trigger is clean |
| `purchase` | Reservation success | Primary | Main paid-media optimizer target for this setup |
| `generate_lead` | Contact form success | Secondary | Fired alongside contact success for easier Ads import if needed |
| `contact_submit_success` | Contact form success | Secondary | Can become primary if needed |
| `whatsapp_click` | Sticky WhatsApp click | Secondary | Distinguish mobile vs desktop |
| `phone_click` | Tap-to-call click | Secondary | Track from visible CTA only |

---

## 5. Implementation Rules

- Use environment variables for tracking IDs whenever possible.
- Prefer one shared analytics helper rather than scattering snippets across components.
- Fire success events after confirmed success, not on submit click.
- Prevent duplicate firing on React rerenders or repeated success state hydration.
- If Google Ads conversion tracking is added, map each conversion action to a written owner and purpose before shipping.
- Do not import every engagement signal into Ads as `primary`.
- Do not add Google Ads conversion scripts by using the Ads account number in place of an `AW-` tag ID.

---

## 6. Campaign Readiness Checklist

- [x] GA4 ID received
- [ ] Google Ads tag ID received
- [ ] Ads conversion labels received or plan approved to create them
- [x] Clarity ID received
- [ ] GTM usage decision made
- [ ] Primary vs secondary conversion list approved
- [ ] Istanbul presence-only geo strategy confirmed
- [ ] Launch budgets confirmed
- [ ] Brand / Sunset / Dinner / Yacht campaign structure confirmed

---

## 7. What We Will Produce After IDs Arrive

- A clean tracking implementation plan
- The code patch for GA4 / Ads / Clarity integration
- Final conversion taxonomy
- Campaign recommendations based on real measured funnel points
- Competitor and landing-page improvement priorities

---

## 8. Working Notes

- MerrySails already has clear commercial owner pages for `Sunset`, `Dinner`, and `Yacht`.
- This makes paid search cleaner because ad groups can map to one dominant landing page instead of a generic cruise hub.
- The main risk right now is not campaign structure; it is incomplete measurement visibility.
- The site now has a clear path for `purchase`, `contact_submit_success`, `phone_click`, `whatsapp_click`, and `begin_checkout` event tracking.
