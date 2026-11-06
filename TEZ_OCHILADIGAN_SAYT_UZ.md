# PROKATCHI OKA — Render Loading ekransiz tez ochiladigan sayt

**Bu arxiv eski SEO-fix versiyasining davomidir. Sayt hali jonli domeningizda o‘zgarmagan.**

## Nima o‘zgardi?
- Bosh sahifa (`/`, `/ru/`, `/en/`), mahsulotlar (46 ta) va filiallar Static Site orqali server uyqu rejimiga bog‘liq bo‘lmagan holda ochiladi.
- Katalog `/data/products.json`, kontaktlar `/data/site.json` orqali Static Site CDN'dan yuklanadi. Python API uyg‘onishini kutmaydi.
- Ortiqcha aylanib turadigan `site-preloader` olib tashlandi.
- SEO title / description / canonical / sitemap / robots.txt har 3 til uchun tayyor.
- Python Flask backend **o‘chirilmaydi**. Faqat POST `/api/inquiries` va Neon / Telegram xabarnomalari uchun ishlaydi.
- CORS `prokatchioka.uz` va `www.prokatchioka.uz` uchun ruxsat etilgan; boshqa Render preview saytini test qilish uchun backendda `FRONTEND_ORIGIN` kiriting.

## 1-qadam: Xavfsiz tartib, hech narsani o‘chirmang
1. Avval yangi fayllarni GitHub repo asosiy papkasiga yuklang (yangi fayllar `scripts/build_static.py`, `assets/js/api-config.js`, `render-static.yaml`).
2. Renderdagi **eski Python Web Service `prokatchi-oka-v2`** ishini davom ettirsin. Bu serverning haqiqiy URL manzilini (masalan `https://<haqiqiy-nom>.onrender.com`) dashboarddan **ko‘chirib oling**. Uni o‘zingizcha taxmin qilmang.
3. Yangi `Render Dashboard → New → Static Site` yarating; GitHub repository va branchni ulang. `Root Directory` = bo‘sh bo‘lsin, `app.py` GitHub ildizida turgan bo‘lsa.
4. `Build Command`: `python scripts/build_static.py`
5. `Publish Directory`: `dist`
6. **Static Site → Environment** ga `PROKATCHI_API_URL` = 2-qadamda olgan eski Python backend **https://...onrender.com** URL manzilini kiriting. Bu sozlamasiz build atayin to‘xtaydi, chunki buyurtma formasi buzilib qolmasin.
7. `Deploy` qiling. Yangi statik preview URL ni oling (`https://...onrender.com`). **Hali domenni almashtirmang.**
8. Backend `prokatchi-oka-v2` Render → Environment ga `FRONTEND_ORIGIN` = yangi Static Site preview HTTPS origin (oxirida `/` bo‘lmasin) qo‘shing, redeployni kuting.
9. **Preview saytda** 3 til, 46 ta mahsulot, rasmlar, mahsulot tafsilotlari va forma bilan test buyurtma yuboring. Buyurtma Neonga saqlanganini, ikkala Telegramga xabar kelganini tekshiring. Token va parollarni ZIP yoki GitHubga joylamang.
10. Shundan keyin `prokatchioka.uz` (va kerak bo‘lsa `www`) domenlarini **Static Site → Settings → Custom Domains** ga ulashni boshlang. Eski backend servisini domain asosiy manzilidan ajrating, biroq uning **onrender.com** domeni va Neon/Telegram sozlamalarini saqlang. Render ko‘rsatgan DNS yozuvlarini registrar (TCloud)da yangilang. SSL (HTTPS) tayyorligini tekshiring.
11. `https://prokatchioka.uz/`, `/ru/`, `/en/`, `/robots.txt`, `/sitemap.xml` va formani qayta test qiling. So‘ng Google Search Console da URL Inspection bilan tekshiring.

## Muhim cheklov
- Asosiy sahifa endi Free Flask uyg‘onishini kutmaydi. Lekin **buyurtma yuborishda** Flask 15 daqiqa faol bo‘lmasa, *birinchi forma* uyg‘onishini kutishi mumkin. Forma bosilganda xabar chiqadi; uni ikki marta yubormang.
- Bosh sahifaning mutlaq `0 sekund`da yuklanishi kafolatlanmaydi: internet, rasmlar va telefon tezligiga bog‘liq.
- **Barcha funksiyalar doimiy tez** bo‘lishini xohlasangiz, Python backendni uxlamaydigan (odatda pullik) xizmatga ko‘chirish yoki Render'ning pullik Web Service tarifiga o‘tish kerak; bunday variantda kodni o‘zgartirish shart bo‘lmasligi mumkin.
- `render-static.yaml` — ko‘rsatma shabloni. Jonli `render.yaml`dagi Python server sozlamasi o‘chirilmagan. Yangi Static Site yaratishni dashboarddan bajaring.

## Lokal avtomatik tekshirish
Windows PowerShell (GitHub repo ildizida):
```
$env:PROKATCHI_API_URL='https://HAQIQIY-BACKEND.onrender.com'
py scripts/build_static.py
py -m http.server 8080 --directory dist
```
Brauzer: `http://127.0.0.1:8080/`, `http://127.0.0.1:8080/ru/`, `http://127.0.0.1:8080/en/`.
Local preview uchun faqat katalog va sahifani tekshiring; haqiqiy forma CORS va domenlarga bog‘liq.

## 2026-11-06 — ruscha Google qidiruviga qo‘shimcha tuzatish
- `/ru/` va `/en/` endi dastlabki HTML ichidayoq tegishli tillardagi mavjud tarjimalar bilan tayyorlanadi. Brauzer JS ishlashini kutishga hojat kamroq.
- Barcha tillarning hero xizmat sarlavhasi Toshkent va ijara xizmatini tabiiy ko‘rsatadi. Dizayn va mahsulot fayllari o‘zgarmagan.
- `sitemap.xml`da UZ/RU/EN hamda `x-default` variantlari bir-biriga `hreflang` orqali bog‘langan.
- Bular sayt Google qidiruvida aniq o‘rinda chiqishini kafolatlamaydi. `Google Search Console`da uchta URL'ni URL Inspection qilib, indekslash so‘rovini yuboring va sitemap ni qayta jo‘nating.
