# Email Deliverability Fix — merrysails.com (2026-05-06)

## Mevcut DNS durumu (✓ çekildi)

```
SPF:    v=spf1 include:_spf.google.com ~all      ⚠️ soft fail
DKIM:   google._domainkey.merrysails.com         ✅ valid (RSA 2048-bit)
DMARC:  v=DMARC1; p=none; rua=mailto:resatakkus10@gmail.com  ⚠️ monitoring only
MX:     1 smtp.google.com.                        ✅ Workspace correctly set
```

## Sorun
`info@merrysails.com` Workspace mail Gmail'e gönderildiğinde spam klasörüne düşüyor (CC kendine bile).

## Sebep
1. **DMARC `p=none`** = Gmail spam filter'a "domain henüz olgun değil" sinyali
2. **SPF `~all`** = soft fail, strict değil — spoofing'e karşı zayıf
3. **Yeni domain reputation** = Workspace warmup süreci (ilk 30 gün)

---

## Fix planı (DNS registrar'da uygula — 5 dakika)

### Adım 1: SPF güçlendir
**Mevcut TXT record (apex `@`):**
```
v=spf1 include:_spf.google.com ~all
```

**Değişiklik:**
- Eğer Workspace mail dışında başka servis YOKSA (örn: SendGrid, Mailchimp): değiştir
- `~all` → `-all` (strict fail)

```
v=spf1 include:_spf.google.com -all
```

⚠️ Eğer marketing tool kullanıyorsan (Mailchimp, SendGrid, Brevo, etc.) **ÖNCE** onları SPF'e ekle:
```
v=spf1 include:_spf.google.com include:sendgrid.net -all
```

### Adım 2: DMARC kademeli enforce
**Mevcut TXT record (`_dmarc.merrysails.com`):**
```
v=DMARC1; p=none; rua=mailto:resatakkus10@gmail.com; ruf=mailto:resatakkus10@gmail.com; fo=1
```

**Yeni (kademeli — start with 10%):**
```
v=DMARC1; p=quarantine; pct=10; rua=mailto:resatakkus10@gmail.com; ruf=mailto:resatakkus10@gmail.com; fo=1; adkim=s; aspf=s
```

- `pct=10` = sadece %10 mailler quarantine'e alınır (test mode)
- 7 gün sonra problemsizse `pct=100`'e çıkar
- 30 gün sonra `p=reject` (en sıkı)

### Adım 3: postmaster.google.com kayıt
1. https://postmaster.google.com adresine Workspace admin Google account ile gir
2. "Add a new domain" → `merrysails.com`
3. TXT record ile verify (Google verify code verir, DNS'e ekle)
4. **Sonuç**: 24-48 saat sonra Gmail'in domainini nasıl gördüğünü dashboard'dan görürsün:
   - **Delivery error rate**
   - **Spam rate**
   - **IP reputation**
   - **Domain reputation**

### Adım 4: mail-tester.com test
1. https://www.mail-tester.com/ adresine git
2. Verilen test mail adresine info@merrysails.com'dan mail gönder
3. "Then check your score" tıkla
4. **Hedef: 9-10/10**
5. <8/10 ise: missing reverse DNS, content filter trigger, blacklist check

---

## Ekstra optimizasyon (zaman kalırsa)

### BIMI (Brand Indicators for Message Identification)
Verified marka logosu gönderim mailerinde gözükür (Gmail, Yahoo, Apple Mail):
1. SVG logo hazırla (BIMI spec)
2. VMC (Verified Mark Certificate) al — DigiCert/Entrust ($1500/yıl) ya da Let's Encrypt yakında ücretsiz
3. DNS'e BIMI record ekle:
```
default._bimi.merrysails.com TXT v=BIMI1; l=https://merrysails.com/bimi/logo.svg; a=https://merrysails.com/vmc.pem
```

### Reverse DNS (PTR)
Workspace üzerinden gönderim yapıyorsa Google'ın PTR'si zaten doğru — bypass edilemez. Kendi MTA kuruyorsan ayrı konu.

---

## Çıktı
DNS kayıtları registrar tarafında değiştir → 24-48h propagation → mail-tester score check → postmaster.google.com'da reputation izle.

**Soru olunca yaz** — uygulamada hata varsa beraber debug ederiz.
