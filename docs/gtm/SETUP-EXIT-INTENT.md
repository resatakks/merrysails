# GTM — Exit Intent Events Setup

Exit-intent popup `merrysails.com`'da live ve şu dataLayer eventlerini push ediyor:
- `exit_intent_shown` — popup gösterildi
- `exit_intent_code_copied` — kullanıcı SAIL10 kodunu kopyaladı
- `exit_intent_whatsapp_click` — kullanıcı WhatsApp'a tıkladı
- `exit_intent_dismissed` — popup kapatıldı

## Hızlı Kurulum (60 saniye)

### Yöntem 1: Container Import (önerilen)

1. https://tagmanager.google.com → MerrySails container (GTM-MWVS696K)
2. Sol menüden **Admin** → **Import Container**
3. Dosya seç: `docs/gtm/exit-intent-import.json`
4. Workspace seç: **Existing → Default Workspace**
5. **Import option**: **Merge** (üzerine yazma — mevcut tag'ları korur)
6. **Confirm** → **Save**
7. Sağ üst **Submit** butonuna basıp publish et

Bu otomatik olarak ekler:
- 4 trigger (exit_intent_shown / code_copied / whatsapp_click / dismissed)
- 4 GA4 event tag (G-9B3Q7FM7X8)
- 1 Google Ads conversion tag (WhatsApp click → label gnRdCPi4saEcEJ7x2LxD)
- 2 dataLayer variable (device, reason)

### Yöntem 2: Manuel (5 dakika)

GTM > Triggers > New > Custom Event:
- Trigger 1: Event name = `exit_intent_shown`
- Trigger 2: Event name = `exit_intent_code_copied`
- Trigger 3: Event name = `exit_intent_whatsapp_click`

Her trigger için bir GA4 Event Tag oluştur:
- Tag type: **Google Analytics: GA4 Event**
- Measurement ID: **G-9B3Q7FM7X8**
- Event name: trigger ile aynı (örn `exit_intent_shown`)
- Trigger: ilgili custom event trigger

WhatsApp click conversion ekle:
- Tag type: **Google Ads Conversion Tracking**
- Conversion ID: **AW-18112460958**
- Conversion Label: **gnRdCPi4saEcEJ7x2LxD** (WhatsApp Click)
- Trigger: `exit_intent_whatsapp_click`

## Test Etme

GTM > **Preview** → URL: `https://merrysails.com`
- Tab kapatmaya çalış (mouse'u tarayıcı barına götür)
- Popup açılmalı
- GTM debugger'da `exit_intent_shown` event görünmeli
- Tag'lar fired olmalı

## GA4'te Doğrulama

GA4 > **Configure** → **Events**:
- 24 saat sonra exit_intent_* eventleri listede görünür
- Her birini **Mark as conversion** olarak işaretle

## Google Ads'te Doğrulama

Google Ads > **Tools** → **Conversions**:
- "WhatsApp Click" conversion zaten var (label `gnRdCPi4saEcEJ7x2LxD`)
- 48 saat içinde "Conversion action status" → **Recording conversions** olur
