"""No third-party dependencies: python -m unittest discover -s tests -v"""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class CatalogTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.products = json.loads((ROOT / 'data/products.json').read_text(encoding='utf-8'))
        cls.site = json.loads((ROOT / 'data/site.json').read_text(encoding='utf-8'))

    def test_every_product_has_local_image(self):
        self.assertEqual(46, len(self.products))
        photo_count = 0
        for item in self.products:
            self.assertTrue((ROOT / item['image']).is_file(), item['id'])
            photo_count += 1
            for extra in item.get('additional_images', []):
                self.assertTrue((ROOT / extra).is_file(), item['id'])
                photo_count += 1
        self.assertGreaterEqual(photo_count, 46)

    def test_old_original_photos_retained(self):
        for n in range(3650,3688):
            self.assertTrue((ROOT / f'assets/images/products/IMG_{n}.jpeg').is_file())

    def test_categories_separate_machinery_and_cutters(self):
        categories = {item['category'] for item in self.products}
        self.assertTrue({'maxsus', 'kesish', 'zichlash', 'tozalash', 'payvandlash'}.issubset(categories))

    def test_unique_product_ids(self):
        ids = [item['id'] for item in self.products]
        self.assertEqual(len(ids), len(set(ids)))

    def test_confirmed_prices_are_numeric_and_partial(self):
        priced = [item for item in self.products if item['price_per_day'] is not None]
        unpriced = [item for item in self.products if item['price_per_day'] is None]
        self.assertGreaterEqual(len(priced), 20)
        self.assertGreaterEqual(len(unpriced), 1)
        self.assertTrue(all(isinstance(item['price_per_day'], int) and item['price_per_day'] > 0 for item in priced))

    def test_contact_links(self):
        locations = self.site['locations']
        self.assertEqual({'gulzor', 'ibn-sino'}, {item['id'] for item in locations})
        self.assertTrue(all(item['map_url'].startswith('https://maps.app.goo.gl/') for item in locations))
        self.assertTrue(self.site['instagram'].startswith('https://'))
        self.assertTrue(self.site['youtube'].startswith('https://'))


if __name__ == '__main__':
    unittest.main()
