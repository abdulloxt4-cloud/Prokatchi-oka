import json, re, unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

class TranslationTests(unittest.TestCase):
    def test_language_buttons_and_script(self):
        html=(ROOT/'index.html').read_text()
        for code in ('uz','ru','en'):
            self.assertIn(f'data-lang="{code}"',html)
        self.assertIn('assets/js/i18n.js',html)
    def test_all_product_translations_present(self):
        products=json.loads((ROOT/'data/products.json').read_text())
        self.assertEqual(len(products),46)
        for p in products:
            with self.subTest(product=p['id']):
                for lang in ('ru','en'):
                    self.assertTrue(p['i18n'][lang]['name'])
                    self.assertTrue(p['i18n'][lang]['description'])
    def test_chat_covers_languages(self):
        chat=(ROOT/'assets/js/chat.js').read_text()
        self.assertIn('сколько',chat)
        self.assertIn('how much',chat)
        self.assertIn('window.I18N',chat)
    def test_language_ui_styles(self):
        self.assertIn('.language-switch', (ROOT/'assets/css/style.css').read_text())

if __name__ == '__main__':unittest.main()
