# MerrySails — Authority Profile Checklist

Claim each profile, then paste its URL into the `sameAs` array in `src/app/layout.tsx`, uncomment the line, and commit + deploy.

---

## Priority Tier 0 (Claim First)

### Google Business Profile
- **Signup/claim:** https://business.google.com
- **Effort:** ~10 min
- **Notes:** Most important for local SEO and Google Maps visibility. Verify by postcard or phone.
- **After claim:** Uncomment `"https://www.google.com/maps/place/?q=place_id:..."` in layout.tsx, replace placeholder with real Place ID URL.

### TripAdvisor
- **Signup/claim:** https://www.tripadvisor.com/Owners
- **Effort:** ~15 min
- **Notes:** High authority for travel trust signals. Requires phone or email verification.
- **After claim:** Uncomment `"https://www.tripadvisor.com/Attraction_Review-XXXXXXX-..."` in layout.tsx, replace placeholder with your listing slug.

---

## Priority Tier 1

### Facebook Business Page
- **Signup/claim:** https://business.facebook.com/create/page
- **Effort:** ~10 min
- **Notes:** Create as a "Travel Company" page category. Connect WhatsApp Business if applicable.
- **After claim:** Uncomment `"https://www.facebook.com/merrysails"` in layout.tsx (verify the handle is available at facebook.com/merrysails first).

### Viator (Tripadvisor subsidiary)
- **Signup/claim:** https://www.viator.com/supplier
- **Effort:** ~15 min
- **Notes:** Requires description, photos, availability. Listing approval takes 3-7 days.
- **After claim:** Uncomment `"https://www.viator.com/..."` in layout.tsx with your Viator product URL.

---

## Priority Tier 2

### GetYourGuide
- **Signup/claim:** https://www.getyourguide.com/supplier-registration
- **Effort:** ~15 min
- **Notes:** Similar to Viator — photo uploads and product description required. Approval 3-5 days.
- **After claim:** Uncomment `"https://www.getyourguide.com/..."` in layout.tsx with your GYG activity URL.

### YouTube Channel
- **Signup/claim:** https://www.youtube.com/create_channel (use Google account)
- **Effort:** ~5 min to create, ~30 min to upload first video
- **Notes:** Even an empty channel with the brand handle claimed matters for sameAs. Upload 1 cruise clip.
- **After claim:** Uncomment `"https://www.youtube.com/@merrysails"` in layout.tsx.

---

## After Claiming Any Profile

1. Open `src/app/layout.tsx`.
2. Locate the `sameAs` array in the `organizationSchema` object.
3. Uncomment the relevant line and replace placeholder slugs with your actual URL.
4. Save, run `npm run build` to confirm no errors.
5. Commit: `chore(schema): activate [platform] sameAs link`
6. Deploy to production.

---

## Integration Snippet Reference

```ts
sameAs: [
  "https://www.instagram.com/merrysails/",
  "https://www.tiktok.com/@merrysails",
  // Activate these once claimed/created:
  // "https://www.facebook.com/merrysails",
  // "https://www.tripadvisor.com/Attraction_Review-XXXXXXX-...",
  // "https://www.viator.com/...",
  // "https://www.getyourguide.com/...",
  // "https://www.google.com/maps/place/?q=place_id:...",
  // "https://www.youtube.com/@merrysails",
],
```
