#!/usr/bin/env python3
"""Build Prokatchi Oka static frontend (UZ/RU/EN) for Render CDN.

No Flask/Neon/Telegram secrets are included in public static assets.
"""
from __future__ import annotations

from html.parser import HTMLParser

import ast
import html
import json
import os
import re
import shutil
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist'


def get_seo_pages():
    tree = ast.parse((ROOT / 'app.py').read_text(encoding='utf-8'))
    for node in tree.body:
        if isinstance(node, ast.Assign) and any(isinstance(t, ast.Name) and t.id == 'SEO_PAGES' for t in node.targets):
            return ast.literal_eval(node.value)
    raise RuntimeError('SEO_PAGES topilmadi')


def backend_origin():
    raw = os.environ.get('PROKATCHI_API_URL', '').strip().rstrip('/')
    url = urlsplit(raw)
    if url.scheme != 'https' or not url.hostname or url.path or url.query or url.fragment or url.username:
        raise SystemExit('PROKATCHI_API_URL kerak: eski Flask Web Service https://....onrender.com URL manzilini Static Site Environment ga kiriting.')
    if url.hostname in {'prokatchioka.uz', 'www.prokatchioka.uz'}:
        raise SystemExit('PROKATCHI_API_URL static sayt domeni bo‘lmasin; Python backend .onrender.com manzilini ishlating.')
    return raw


def change_once(source, pattern, replacement):
    output, count = re.subn(pattern, lambda _: replacement, source, count=1)
    if count != 1:
        raise RuntimeError('SEO HTML ichida topilmadi: '+pattern)
    return output


def get_translations():
    """Read existing UZ -> RU/EN phrases; reuse text approved for the live site."""
    js = (ROOT / 'assets/js/i18n.js').read_text(encoding='utf-8')
    match = re.search(r'const TABLE = (\{.*?\n\});', js, flags=re.S)
    if not match:
        raise RuntimeError('i18n TABLE topilmadi; rus/ingliz matnlarini taxmin qilmaymiz')
    phrases = json.loads(match.group(1))
    phrases['So‘rovingiz operator tomonidan tasdiqlanadi.'] = {
        'ru': 'Ваш запрос будет подтверждён оператором.',
        'en': 'Your request will be confirmed by an operator.',
    }
    return phrases


class StaticTranslator(HTMLParser):
    """Translate real HTML text *before* delivery to Google, preserving original tags.

    JavaScript still translates API-driven product cards, so no catalogue or
    image paths are changed by this process.
    """
    def __init__(self, language, phrases):
        super().__init__(convert_charrefs=False)
        self.language = language
        self.phrases = phrases
        self.out = []
        self.ignored = []

    def localized(self, raw):
        key = html.unescape(raw).strip()
        translation = self.phrases.get(key, {}).get(self.language)
        if not translation:
            return raw
        start = len(raw) - len(raw.lstrip())
        end = len(raw.rstrip())
        return raw[:start] + html.escape(translation, quote=False) + raw[end:]

    def handle_starttag(self, tag, attrs):
        raw = self.get_starttag_text()
        if tag in {'script', 'style', 'noscript'}:
            self.ignored.append(tag)
        if not self.ignored:
            def translate_attribute(match):
                value = match.group(2)
                phrase = self.phrases.get(html.unescape(value).strip(), {}).get(self.language)
                if not phrase:
                    return match.group(0)
                return match.group(1) + html.escape(phrase, quote=True) + match.group(3)
            raw = re.sub(r'(\b(?:placeholder|aria-label|title)\s*=\s*")([^"]*)(")', translate_attribute, raw)
        self.out.append(raw)

    def handle_startendtag(self, tag, attrs):
        self.out.append(self.get_starttag_text())

    def handle_endtag(self, tag):
        self.out.append(f'</{tag}>')
        if self.ignored and self.ignored[-1] == tag:
            self.ignored.pop()

    def handle_data(self, data):
        self.out.append(data if self.ignored else self.localized(data))

    def handle_entityref(self, name):
        self.out.append(f'&{name};')

    def handle_charref(self, name):
        self.out.append(f'&#{name};')

    def handle_comment(self, data):
        self.out.append(f'<!--{data}-->')

    def handle_decl(self, decl):
        self.out.append(f'<!{decl}>')

    def handle_pi(self, data):
        self.out.append(f'<?{data}>')


def prerender_language(source, lang, phrases):
    if lang == 'uz':
        return source
    translator = StaticTranslator(lang, phrases)
    translator.feed(source)
    translator.close()
    return ''.join(translator.out)


def build_page(src, lang, seo):
    title, description, locale, canonical = seo
    src = change_once(src, r'<html lang="[^"]+">', f'<html lang="{lang}">')
    items = [
        (r'<title>[^<]*</title>', f'<title>{html.escape(title)}</title>'),
        (r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{html.escape(description, quote=True)}">'),
        (r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{html.escape(title, quote=True)}">'),
        (r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{html.escape(description, quote=True)}">'),
        (r'<meta property="og:locale" content="[^"]*">', f'<meta property="og:locale" content="{locale}">'),
        (r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{canonical}">'),
        (r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{html.escape(title, quote=True)}">'),
        (r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{html.escape(description, quote=True)}">'),
        (r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{canonical}">'),
    ]
    for pattern, value in items:
        src = change_once(src, pattern, value)
    # Keep a natural, visible service keyword in each language; brand H1 unchanged.
    headline = {
        'uz': 'Toshkentda qurilish asboblari va texnika ijarasi',
        'ru': 'Аренда инструментов и строительной техники в Ташкенте',
        'en': 'Tool and construction equipment rental in Tashkent',
    }[lang]
    src = change_once(src, r'<h2>Qurilish uskunalari ijarasi</h2>',
                      f'<h2>{html.escape(headline)}</h2>')
    # Nested language paths (/ru/ and /en/) need root-based asset references.
    src = src.replace('src="assets/', 'src="/assets/').replace('href="assets/', 'href="/assets/')
    return src


def main():
    api = backend_origin()  # do NOT build a broken contact form without an API URL
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copytree(ROOT / 'assets', OUT / 'assets')
    (OUT / 'data').mkdir()
    for filename in ('products.json','site.json'):
        shutil.copy2(ROOT / 'data' / filename, OUT / 'data' / filename)
    for filename in ('robots.txt','sitemap.xml'):
        shutil.copy2(ROOT / filename, OUT / filename)

    # Static-only config: publicly exposed backend hostname, never a database password or bot token.
    config = ("// Auto-generated at build time. Do not place secrets here.\n"
              f"window.PROKATCHI_API_URL = {json.dumps(api)};\n"
              "window.PROKATCHI_STATIC_SITE = true;\n")
    (OUT / 'assets/js/api-config.js').write_text(config, encoding='utf-8')

    source = (ROOT / 'index.html').read_text(encoding='utf-8')
    phrases = get_translations()
    for language, seo in get_seo_pages().items():
        dest = OUT if language == 'uz' else OUT / language
        dest.mkdir(exist_ok=True)
        page = build_page(source, language, seo)
        page = prerender_language(page, language, phrases)
        (dest / 'index.html').write_text(page, encoding='utf-8')
    print('Prokatchi Oka statik sayt tayyor: dist/ (UZ, RU, EN, katalog, SEO)')


if __name__ == '__main__':
    main()
