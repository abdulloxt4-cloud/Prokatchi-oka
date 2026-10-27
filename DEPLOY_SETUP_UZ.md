# PROKATCHI OKA — Telegram + Neon + Render (UZ)

## 1. Lokal test

Windows PowerShell: `.\start_windows.bat` → `http://127.0.0.1:5000/`.
Bunda `DATABASE_URL` bo‘sh bo‘lsa SQLite ishlaydi va `instance/inquiries.sqlite3` da so‘rovlarni saqlaydi.

## 2. Telegram bot (real xabarnoma)

1. Telegram ilovasida **@BotFather** ni oching, `/newbot` bilan o‘z botingizni yarating.
2. Bot bilan o‘zingiz yoki xabar kelishi kerak bo‘lgan chatda **/start** ni yuboring. Guruhga xabar kerak bo‘lsa botni guruhga qo‘shing.
3. Bot tokeni va `chat_id` ni topib **faqat** maxfiy `.env` faylingizga yoki Render Environment settingsga yozing. Tokenni GitHub, screenshot yoki chatga yubormang.
4. Shaxsiy chat IDni (botga `/start` dan keyin) Telegram Bot API `getUpdates` javobidagi `message.chat.id` orqali topish mumkin. Telegram bot bilan avval suhbat boshlangan bo‘lishi kerak.
5. `.env` faylini `.env.example` dan nusxalab, `TELEGRAM_BOT_TOKEN=...` va `TELEGRAM_CHAT_ID=...` kiriting. Serverni qayta ishga tushiring.
6. Saytdan o‘zingiz uchun test so‘rov yuboring. Forma bazaga yozadi va muvaffaqiyatli yuborilgan bo‘lsa Telegramga ism, telefon, uskuna va filialni jo‘natadi.

**Eslatma:** Bu SMS operatori emas, Telegram **bot xabari**. Token bo‘lmasa so‘rov bazada saqlanadi, lekin Telegramga kelmaydi. Telegram faoliyati haqiqiy akkaunt va internet aloqasiga bog‘liq.

## 3. Neon PostgreSQL

1. Neon Console → yangi project → database → **Connection string** olasiz (SSL talab qilinadi).
2. Neon connection URI ni `DATABASE_URL` environment variable ichiga saqlang. Hech qachon GitHubga joylamang.
3. Server startida `inquiries` jadvali avtomatik yaratiladi; SQLite faqat lokal `DATABASE_URL` yo‘q bo‘lganda ishlaydi.
4. `DATABASE_URL` bo‘lmasa, Render ishga tushmaydi — so‘rovlar tasodifan vaqtinchalik SQLite faylga yozilmasin.

## 4. GitHub → Render

1. GitHub repo'ga **`prokatchi-oka` ichidagi** `app.py`, `index.html`, `requirements.txt`, `render.yaml`, `assets`, `data` fayllarini yuboring.
2. Render Dashboard → New → Web Service yoki Blueprint → GitHub repo ni ulang.
3. Root Directory `prokatchi-oka` (agar repo tashqi papkadan iborat bo‘lsa) yoki bo‘sh (agar repo ichida `app.py` rootda bo‘lsa).
4. Build: `pip install -r requirements-prod.txt`. Start: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 60`.
5. Render Environment: `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` maxfiy qiymatlarini joylang.
6. Deploy tugagach `/healthz`, `/api/products`, form va Telegram xabarnomasini test qiling.

**Muhim:** Jonli servis, Neon bazasi, Telegram boti bu ZIP ichida ochilmagan/ulangan emas; kod tayyorlangan, tashqi akkauntlarda ulash alohida qadam. Render rejalarining cheklovlari o‘zgarishi mumkin.

## 5. Tasvir va katalog

9 ta murakkab mahsulotda fonni avtomatik qirqish moslama qismlarini buzgan. Shu rasmlar butun qurilma ko‘rinadigan **asl manbadan** oq katalog ramkasida qayta tayyorlandi. Galereyada asl surat qoldi. To‘liq oq fon uchun professional retush yoki alohida toza fotosurat kerak. Xaridorni chalg‘itmaslik uchun Google’dan tasodifiy boshqa model surati qo‘yilmadi.

### Rasmlari qayta tayyorlangan SKUlar

`OKA-006`, `OKA-008`, `OKA-018`, `OKA-023`, `OKA-032`, `OKA-033`, `OKA-034`, `OKA-040`, `OKA-045`.

## 6. Qolgan masalalar

- Yuborilgan narxlar ayrim mahsulotlarga nomi bo‘yicha moslashtirilgan; do‘stingiz yakuniy tasdiqlashi kerak.
- 11 ta mahsulotda tasdiqlangan narx yo‘q, shuning uchun 'Narxni so‘rash' turadi.
- Telegramga yuborish muvaffaqiyatini haqiqiy token bilan bir marta alohida sinash zarur.
- Brauzer va real telefonlarda yakuniy QA muhim; internetga faqat tayyor bo‘lganda joylang.
