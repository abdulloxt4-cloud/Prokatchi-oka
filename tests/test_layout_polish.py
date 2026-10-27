import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / 'index.html').read_text(encoding='utf-8')
CSS = (ROOT / 'assets/css/style.css').read_text(encoding='utf-8')
MAIN = (ROOT / 'assets/js/main.js').read_text(encoding='utf-8')
I18N = (ROOT / 'assets/js/i18n.js').read_text(encoding='utf-8')
PRODUCTS = json.loads((ROOT / 'data/products.json').read_text(encoding='utf-8'))
SITE = json.loads((ROOT / 'data/site.json').read_text(encoding='utf-8'))


class LayoutPolishTests(unittest.TestCase):
    def test_exactly_two_distinct_branches(self):
        keys = [item['id'] for item in SITE['locations']]
        self.assertEqual(set(keys), {'gulzor', 'ibn-sino'})
        self.assertEqual(len(keys), len(set(keys)))
        self.assertIn('holder.replaceChildren(fragment)', MAIN)
        self.assertIn('<template id="locationTemplate">', HTML)

    def test_products_unique_and_images_exist(self):
        self.assertEqual(len(PRODUCTS), 46)
        self.assertEqual(len(set(x['sku'] for x in PRODUCTS)), 46)
        for product in PRODUCTS:
            self.assertTrue((ROOT / product['image']).is_file(), product['sku'])
            self.assertEqual(product['is_sample_image'], bool(product.get('reference_image') or product.get('demo')))

    def test_catalog_grid_and_image_geometry(self):
        self.assertIn('repeat(auto-fill,minmax(260px,1fr))', CSS)
        self.assertIn('aspect-ratio:4/3', CSS)
        self.assertIn('object-fit:contain', CSS)
        self.assertIn('margin-top:auto', CSS)
        self.assertIn('loading="lazy"', MAIN)

    def test_reveal_is_one_shot(self):
        self.assertIn('IntersectionObserver', MAIN)
        self.assertIn('observer.unobserve(entry.target)', MAIN)
        self.assertIn("entry.target.dataset.revealed = 'true'", MAIN)
        self.assertIn('prefers-reduced-motion:reduce', CSS)

    def test_date_localized_and_form_copy(self):
        self.assertIn('KK.OO.YYYY', MAIN)
        self.assertIn('ДД.ММ.ГГГГ', MAIN)
        self.assertIn('DD/MM/YYYY', MAIN)
        self.assertIn('So‘rovingiz operator tomonidan tasdiqlanadi.', HTML)
        self.assertNotIn('Ma’lumotlaringiz Flask serverdagi bazaga saqlanadi;', HTML)
        self.assertIn('Your request will be confirmed by an operator.', I18N)

    def test_sample_categories_and_company_details(self):
        self.assertIn('assets/images/categories/kesish-kategoriyasi.webp', HTML)
        self.assertIn('assets/images/catalog/uskuna-3660.webp', HTML)
        self.assertNotIn('Telegram ID: ${telegramId}', MAIN)
        self.assertNotIn('Ish vaqti: telefon orqali aniqlang', HTML)

    def test_no_comments_in_edited_frontend_files(self):
        for name in ['index.html', 'assets/css/style.css', 'assets/js/main.js', 'assets/js/i18n.js']:
            source = (ROOT / name).read_text(encoding='utf-8')
            self.assertNotIn('<!--', source)
            self.assertNotIn('/*', source)
            self.assertNotIn('*/', source)
            self.assertFalse(re.search(r'(?m)^\s*//', source))


if __name__ == '__main__':
    unittest.main()
