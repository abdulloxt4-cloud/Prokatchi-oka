
from __future__ import annotations

import csv
import json
import html
import os
import re
import sqlite3
import sys
import threading
import time
import urllib.parse
import urllib.request

from datetime import datetime, timezone
from zoneinfo import ZoneInfo
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request, send_from_directory


# ==========================================
# CONFIGURATION
# ==========================================

BASE = Path(__file__).resolve().parent
INSTANCE = BASE / "instance"
INSTANCE.mkdir(exist_ok=True)

load_dotenv(BASE / ".env")

app = Flask(__name__, static_folder=None)
app.json.ensure_ascii = False
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024

SEO_PAGES = {'uz': ('PROKATCHI OKA ? Qurilish asboblari va texnikasi ijarasi | Toshkent', 'Toshkentda qurilish asboblari, elektr asboblar va maxsus texnika ijarasi. PROKATCHI OKA ? Gulzor va Ibn Sino filiallari. Katalogni ko?ring va so?rov yuboring.', 'uz_UZ', 'https://prokatchioka.uz/'), 'ru': ('?????? ???????????? ? ???????????? ??????? ? ???????? | PROKATCHI OKA', '?????? ???????????? ????????????, ??????????????????? ? ??????????? ? ????????. PROKATCHI OKA ? ??????? ??????? ? ??? ????. ??????? ? ?????? ??????.', 'ru_RU', 'https://prokatchioka.uz/ru/'), 'en': ('Construction Equipment & Tool Rental in Tashkent | PROKATCHI OKA', 'Construction equipment rental and power tool hire in Tashkent. Browse the PROKATCHI OKA catalog, then contact our Gulzor or Ibn Sino branch.', 'en_US', 'https://prokatchioka.uz/en/')}

DB_FILE = INSTANCE / "inquiries.sqlite3"
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = (
        "postgresql://" + DATABASE_URL[len("postgres://"):]
    )

if os.getenv("RENDER") and not DATABASE_URL:
    raise RuntimeError(
        "Render production requires DATABASE_URL (Neon PostgreSQL)."
    )

_last_requests: dict[str, float] = {}
_rate_lock = threading.Lock()


# ==========================================
# DATABASE
# ==========================================

def db_connection():
    if DATABASE_URL:
        import psycopg
        return psycopg.connect(
            DATABASE_URL,
            connect_timeout=10
        )

    connection = sqlite3.connect(DB_FILE, timeout=5)
    connection.execute("PRAGMA busy_timeout=5000")
    return connection


def db_execute(connection, sql: str, params=()):
    if DATABASE_URL:
        sql = sql.replace("?", "%s")

    return connection.execute(sql, params)


def initialize_database():
    with db_connection() as connection:
        if DATABASE_URL:
            db_execute(connection, """
                CREATE TABLE IF NOT EXISTS inquiries (
                    id BIGSERIAL PRIMARY KEY,
                    created_at TEXT NOT NULL,
                    name TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    product TEXT,
                    branch TEXT,
                    rental_date TEXT,
                    message TEXT,
                    notification_sent INTEGER NOT NULL DEFAULT 0
                )
            """)
        else:
            db_execute(connection, """
                CREATE TABLE IF NOT EXISTS inquiries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    created_at TEXT NOT NULL,
                    name TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    product TEXT,
                    branch TEXT,
                    rental_date TEXT,
                    message TEXT,
                    notification_sent INTEGER NOT NULL DEFAULT 0
                )
            """)

            columns = {
                row[1]
                for row in connection.execute(
                    "PRAGMA table_info(inquiries)"
                )
            }

            if "branch" not in columns:
                connection.execute(
                    "ALTER TABLE inquiries ADD COLUMN branch TEXT"
                )


def read_json(filename):
    with (BASE / "data" / filename).open(
        encoding="utf-8"
    ) as file:
        return json.load(file)


# ==========================================
# WEBSITE ROUTES
# ==========================================

@app.get("/")
@app.get("/ru/")
@app.get("/en/")
def index():
    language = {
        "": "uz",
        "ru": "ru",
        "en": "en"
    }[request.path.strip("/")]

    title, description, og_locale, canonical = SEO_PAGES[language]
    page = (BASE / "index.html").read_text(encoding="utf-8")

    replacements = (
        (r'<html lang="[^"]+">', f'<html lang="{language}">'),
        (r'<title>[^<]*</title>', f'<title>{html.escape(title)}</title>'),
        (r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{html.escape(description, quote=True)}">'),
        (r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{html.escape(title, quote=True)}">'),
        (r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{html.escape(description, quote=True)}">'),
        (r'<meta property="og:locale" content="[^"]*">', f'<meta property="og:locale" content="{og_locale}">'),
        (r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{canonical}">'),
        (r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{html.escape(title, quote=True)}">'),
        (r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{html.escape(description, quote=True)}">'),
        (r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{canonical}">'),
    )

    for pattern, replacement in replacements:
        page, count = re.subn(
            pattern,
            lambda _: replacement,
            page,
            count=1
        )
        if count != 1:
            raise RuntimeError(
                f"index.html SEO elementi topilmadi: {pattern}"
            )

    page = page.replace('src="assets/', 'src="/assets/')
    page = page.replace('href="assets/', 'href="/assets/')

    return Response(
        page,
        content_type="text/html; charset=utf-8"
    )


# GOOGLE SITEMAP
@app.get("/sitemap.xml")
def sitemap():
    return send_from_directory(
        BASE,
        "sitemap.xml",
        mimetype="application/xml"
    )


# GOOGLE ROBOTS.TXT — NEW
@app.get("/robots.txt")
def robots():
    return send_from_directory(
        BASE,
        "robots.txt",
        mimetype="text/plain"
    )


# STATIC ASSETS
@app.get("/assets/<path:filename>")
@app.get("/ru/assets/<path:filename>")
@app.get("/en/assets/<path:filename>")
def assets(filename):
    return send_from_directory(
        BASE / "assets",
        filename
    )


# PUBLIC DATA
@app.get("/data/<path:filename>")
@app.get("/ru/data/<path:filename>")
@app.get("/en/data/<path:filename>")
def public_data(filename):
    if filename not in {"products.json", "site.json"}:
        return jsonify(error="Not found"), 404

    return send_from_directory(
        BASE / "data",
        filename
    )


# HEALTH CHECK
@app.get("/healthz")
def healthz():
    return jsonify(ok=True), 200


# PRODUCTS API
@app.get("/api/products")
def products():
    return jsonify(read_json("products.json"))


# SITE API
@app.get("/api/site")
def site():
    return jsonify(read_json("site.json"))


# ==========================================
# TEXT VALIDATION
# ==========================================

def clean_text(data, key, limit):
    value = data.get(key, "")

    if not isinstance(value, str):
        return ""

    return value.strip()[:limit]


# ==========================================
# TELEGRAM — TWO RECIPIENTS
# ==========================================

def send_telegram(payload):
    token = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()

    # Your original Telegram ID
    primary_chat_id = os.getenv(
        "TELEGRAM_CHAT_ID", ""
    ).strip()

    # Your friend's Telegram ID
    secondary_chat_id = os.getenv(
        "TELEGRAM_CHAT_ID_2", ""
    ).strip()

    # Remove empty IDs and duplicates
    chat_ids = list(dict.fromkeys(
        chat_id
        for chat_id in (
            primary_chat_id,
            secondary_chat_id
        )
        if chat_id
    ))

    if not token or not chat_ids:
        app.logger.warning(
            "Telegram tokeni yoki chat ID sozlanmagan"
        )
        return False

    lines = [
        "🛠 PROKATCHI OKA — yangi ijara so'rovi",
        f"Ism: {payload['name']}",
        f"Telefon: {payload['phone']}",
        f"Uskuna: {payload['product'] or 'Ko‘rsatilmagan'}",
        f"Filial: {payload['branch'] or 'Farqi yo‘q'}",
        f"Sana: {payload['rental_date'] or 'Ko‘rsatilmagan'}",
        f"Izoh: {payload['message'] or 'Yo‘q'}",
    ]

    message_text = "\n".join(lines)
    sent_count = 0

    # Send independently to each recipient
    for recipient_number, chat_id in enumerate(
        chat_ids, start=1
    ):
        body = urllib.parse.urlencode({
            "chat_id": chat_id,
            "text": message_text
        }).encode("utf-8")

        try:
            telegram_request = urllib.request.Request(
                f"https://api.telegram.org/bot{token}/sendMessage",
                data=body,
                method="POST"
            )

            with urllib.request.urlopen(
                telegram_request,
                timeout=5
            ) as response:
                result = json.loads(
                    response.read().decode("utf-8")
                )

            if result.get("ok"):
                sent_count += 1
            else:
                app.logger.warning(
                    "Telegram %s-qabul qiluvchiga yuborilmadi",
                    recipient_number
                )

        except (OSError, ValueError):
            app.logger.warning(
                "Telegram %s-qabul qiluvchiga yuborishda xatolik",
                recipient_number
            )

    # True only if all configured recipients received it
    return sent_count == len(chat_ids)


# ==========================================
# CUSTOMER INQUIRIES API
# ==========================================

@app.post("/api/inquiries")
def create_inquiry():
    if not request.is_json:
        return jsonify(
            ok=False,
            error="JSON so‘rov yuboring."
        ), 415

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify(
            ok=False,
            error="Noto‘g‘ri ma’lumot."
        ), 400

    # Honeypot protection
    if data.get("website"):
        return jsonify(
            ok=True,
            notification_sent=False
        ), 200

    if data.get("consent") is not True:
        return jsonify(
            ok=False,
            error="Aloqa ma’lumotlariga rozilik zarur."
        ), 400

    name = clean_text(data, "name", 80)
    phone = clean_text(data, "phone", 25)
    product = clean_text(data, "product", 120)
    branch = clean_text(data, "branch", 30)
    rental_date = clean_text(data, "rental_date", 10)
    message = clean_text(data, "message", 1000)

    if branch and branch not in {"gulzor", "ibn-sino"}:
        return jsonify(
            ok=False,
            error="Filial noto‘g‘ri tanlangan."
        ), 400

    if len(name) < 2 or len(name) > 80:
        return jsonify(
            ok=False,
            error="Ism kamida 2 ta belgidan iborat bo‘lsin."
        ), 400

    if (
        not re.fullmatch(r"\+?[0-9 ()-]{7,25}", phone)
        or not 7 <= len(re.sub(r"\D", "", phone)) <= 16
    ):
        return jsonify(
            ok=False,
            error="Telefon raqam noto‘g‘ri."
        ), 400

    if rental_date:
        try:
            chosen = datetime.strptime(
                rental_date,
                "%Y-%m-%d"
            ).date()

        except ValueError:
            return jsonify(
                ok=False,
                error="Sana noto‘g‘ri."
            ), 400

        if chosen < datetime.now(
            ZoneInfo("Asia/Tashkent")
        ).date():
            return jsonify(
                ok=False,
                error="O‘tgan sanani tanlamang."
            ), 400

    ip = request.remote_addr or "unknown"
    now = time.monotonic()

    with _rate_lock:
        if now - _last_requests.get(ip, -1000) < 10:
            return jsonify(
                ok=False,
                error="Iltimos, keyingi so‘rovdan oldin biroz kuting."
            ), 429

        _last_requests[ip] = now

        if len(_last_requests) > 10000:
            _last_requests.clear()

    payload = {
        "name": name,
        "phone": phone,
        "product": product,
        "branch": branch,
        "rental_date": rental_date,
        "message": message
    }

    # Save order to database
    with db_connection() as connection:
        statement = """
            INSERT INTO inquiries (
                created_at,
                name,
                phone,
                product,
                branch,
                rental_date,
                message
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """

        if DATABASE_URL:
            statement += " RETURNING id"

        cursor = db_execute(
            connection,
            statement,
            (
                datetime.now(timezone.utc).isoformat(),
                name,
                phone,
                product,
                branch,
                rental_date,
                message
            )
        )

        inquiry_id = (
            cursor.fetchone()[0]
            if DATABASE_URL
            else cursor.lastrowid
        )

    # Notify both Telegram recipients
    notified = send_telegram(payload)

    if notified:
        with db_connection() as connection:
            db_execute(
                connection,
                """
                UPDATE inquiries
                SET notification_sent = 1
                WHERE id = ?
                """,
                (inquiry_id,)
            )

    return jsonify(
        ok=True,
        notification_sent=notified
    ), 201


# ==========================================
# ERROR HANDLER
# ==========================================

@app.errorhandler(413)
def too_large(_):
    return jsonify(
        ok=False,
        error="So‘rov juda katta."
    ), 413


# ==========================================
# EXPORT INQUIRIES
# ==========================================

def export_inquiries():
    initialize_database()
    output = INSTANCE / "inquiries.csv"

    with db_connection() as connection:
        rows = db_execute(
            connection,
            "SELECT * FROM inquiries ORDER BY id DESC"
        )

        columns = [
            getattr(
                info,
                "name",
                info[0]
                if isinstance(info, (tuple, list))
                else str(info)
            )
            for info in rows.description
        ]

        with output.open(
            "w",
            encoding="utf-8-sig",
            newline=""
        ) as file:
            writer = csv.writer(file)
            writer.writerow(columns)
            writer.writerows(rows)

    print(f"CSV fayl tayyor: {output}")


# ==========================================
# INITIALIZE DATABASE
# ==========================================

initialize_database()


# ==========================================
# START APPLICATION
# ==========================================

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "export-inquiries":
        export_inquiries()
    else:
        app.run(
            host="127.0.0.1",
            port=5000,
            debug=os.getenv("FLASK_DEBUG") == "1"
        )
