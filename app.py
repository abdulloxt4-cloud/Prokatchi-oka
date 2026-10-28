
from __future__ import annotations

import csv
import json
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
from flask import Flask, jsonify, request, send_from_directory

BASE = Path(__file__).resolve().parent
INSTANCE = BASE / "instance"
INSTANCE.mkdir(exist_ok=True)
load_dotenv(BASE / ".env")

app = Flask(__name__, static_folder=None)
app.json.ensure_ascii = False
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024

DB_FILE = INSTANCE / "inquiries.sqlite3"
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = "postgresql://" + DATABASE_URL[len("postgres://"):]

if os.getenv("RENDER") and not DATABASE_URL:
    raise RuntimeError(
        "Render production requires DATABASE_URL (Neon PostgreSQL)."
    )

_last_requests: dict[str, float] = {}
_rate_lock = threading.Lock()


# DATABASE

def db_connection():
    if DATABASE_URL:
        import psycopg
        return psycopg.connect(DATABASE_URL, connect_timeout=10)

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
                row[1] for row in connection.execute(
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


# WEBSITE ROUTES

@app.get("/")
def index():
    return send_from_directory(BASE, "index.html")


# GOOGLE SITEMAP

@app.get("/sitemap.xml")
def sitemap():
    return send_from_directory(
        BASE,
        "sitemap.xml",
        mimetype="application/xml"
    )


# STATIC ASSETS

@app.get("/assets/<path:filename>")
def assets(filename):
    return send_from_directory(
        BASE / "assets",
        filename
    )


# PUBLIC DATA

@app.get("/data/<path:filename>")
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


# TEXT VALIDATION

def clean_text(data, key, limit):
    value = data.get(key, "")

    if not isinstance(value, str):
        return ""

    return value.strip()[:limit]


# TELEGRAM NOTIFICATIONS

def send_telegram(payload):
    token = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
    chat_id = os.getenv("TELEGRAM_CHAT_ID", "").strip()

    if not token or not chat_id:
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

    body = urllib.parse.urlencode({
        "chat_id": chat_id,
        "text": "\n".join(lines)
    }).encode()

    try:
        with urllib.request.urlopen(
            urllib.request.Request(
                f"https://api.telegram.org/bot{token}/sendMessage",
                data=body,
                method="POST",
            ),
            timeout=5,
        ) as response:
            result = json.loads(
                response.read().decode("utf-8")
            )

        return bool(result.get("ok"))

    except (OSError, ValueError):
        app.logger.warning(
            "Telegram xabarnomasi yuborilmadi"
        )
        return False


# CUSTOMER INQUIRIES API

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

    with db_connection() as connection:
        statement = """
            INSERT INTO inquiries
            (
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


# ERROR HANDLER

@app.errorhandler(413)
def too_large(_):
    return jsonify(
        ok=False,
        error="So‘rov juda katta."
    ), 413


# EXPORT INQUIRIES

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


# INITIALIZE DATABASE

initialize_database()


# START APPLICATION

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "export-inquiries":
        export_inquiries()
    else:
        app.run(
            host="127.0.0.1",
            port=5000,
            debug=os.getenv("FLASK_DEBUG") == "1"
        )
