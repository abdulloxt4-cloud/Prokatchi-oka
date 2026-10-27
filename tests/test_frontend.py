"""Static regression checks for website structure and scripted chat."""
import json
import unittest
from html.parser import HTMLParser
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]


class HtmlInspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.local_assets = []
        self.quick_categories = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for attr in ('src', 'href'):
            if attrs.get(attr, '').startswith('assets/'):
                self.local_assets.append(attrs[attr])
        if 'data-quick-category' in attrs:
            self.quick_categories.append(attrs['data-quick-category'])


class FrontendTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = HtmlInspector()
        cls.html.feed((BASE / 'index.html').read_text(encoding='utf-8'))
        cls.products = json.loads((BASE / 'data/products.json').read_text(encoding='utf-8'))
        cls.chat = (BASE / 'assets/js/chat.js').read_text(encoding='utf-8')

    def test_every_local_html_asset_exists(self):
        for path in self.html.local_assets:
            self.assertTrue((BASE / path).is_file(), path)

    def test_html_id_uniqueness(self):
        self.assertEqual(len(self.html.ids), len(set(self.html.ids)))

    def test_quick_category_matches_catalog(self):
        categories = {p['category'] for p in self.products}
        self.assertTrue(set(self.html.quick_categories).issubset(categories))
        self.assertEqual(len(self.html.quick_categories), 6)

    def test_chat_is_local_and_present(self):
        for marker in ['chatPanel', 'chatLauncher', 'chatTranscript', 'chatInput', 'chatForm']:
            self.assertIn(marker, self.html.ids)
        self.assertIn('Narx', self.chat)
        self.assertIn('filial', self.chat)
        self.assertIn('textContent = text', self.chat)
        self.assertNotIn('fetch(', self.chat)
        self.assertNotIn('openai.com', self.chat)

    def test_brand_assets_present(self):
        self.assertTrue((BASE / 'assets/images/logo.png').is_file())
        self.assertTrue((BASE / 'assets/images/brand-poster.jpg').is_file())


if __name__ == '__main__':
    unittest.main()
