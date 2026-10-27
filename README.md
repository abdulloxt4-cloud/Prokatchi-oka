# PROKATCHI OKA — qurilish uskunalari ijarasi

HTML + CSS + Bootstrap 5.3.3 + vanilla JavaScript + Flask.
46 ta mahsulot kartasi, UZ/RU/EN, avtomatik FAQ chat, dark mode, 2 filial, ijara so‘rovi.

### Ishga tushirish

Windows: `start_windows.bat`.

Cross-platform:

```bash
python -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python app.py
```

Windows terminalda `.venv\Scripts\python app.py`.

`http://127.0.0.1:5000/`.

### Production

Render va Neon, Telegram Bot sozlash uchun **DEPLOY_SETUP_UZ.md** o‘qing.
`DATABASE_URL` bo‘lmasa lokal SQLite; Renderda esa Neon PostgreSQL talab qilinadi. `.env` maxfiy saqlansin.

### Ma’lumotlar

`data/products.json` narxlar va kategoriyalar; `data/site.json` filiallar, kontaktlar.
Rasmlar katalog uchun optimallashtirilgan, ammo 9 ta haqiqiy suratda do‘kon foni to‘liq yo‘qotilmagan — moslama konturlari saqlangan.
