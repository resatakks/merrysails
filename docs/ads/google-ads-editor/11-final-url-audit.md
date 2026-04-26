# MerrySails Final URL Audit

Use this before enabling spend.

## Campaign URL Ownership

Sunset campaign:

- Landing page: `https://merrysails.com/cruises/bosphorus-sunset-cruise`
- Intent: shared Bosphorus sunset cruise, wine option, landmark views
- Do not send private yacht or dinner traffic here.

Dinner campaign:

- Landing page: `https://merrysails.com/istanbul-dinner-cruise`
- Intent: shared dinner cruise, Turkish show, package ladder, central shuttle eligibility
- Do not send sunset-only or private yacht traffic here.

Private Yacht campaign:

- Landing page: `https://merrysails.com/yacht-charter-istanbul`
- Intent: private yacht charter, per-yacht package ladder, proposal / birthday / corporate planning

Support URLs:

- `https://merrysails.com/boat-rental-istanbul`
- `https://merrysails.com/proposal-yacht-rental-istanbul`
- `https://merrysails.com/corporate-events`
- `https://merrysails.com/contact`

## CTA Audit

Phone:

- Primary number: `+90 537 040 68 22`
- `tel:` value: `tel:+905370406822`
- Google call asset: `+90 537 040 68 22`

WhatsApp:

- Primary link: `https://wa.me/905370406822`
- Reservation confirmation link includes reservation ID in message.
- Landing-page WhatsApp clicks fire `whatsapp_click`.

Form:

- Contact form success fires `contact_submit_success`.
- Contact form also fires `generate_lead`.
- Contact form is useful for reporting, but not required as the first Google Ads primary conversion.

## Launch Conversion Decision

Primary:

- `purchase`

Secondary:

- `phone_click`
- `whatsapp_click`
- `contact_submit_success`
- `begin_checkout`
- `generate_lead`
- `booking_abandonment`

Do not set form, WhatsApp, or phone as primary on day 1 unless reservation creation fails.
Do not set abandonment as primary. It is a qualified recovery signal and Clarity/CRM filter, not a bidding target.
