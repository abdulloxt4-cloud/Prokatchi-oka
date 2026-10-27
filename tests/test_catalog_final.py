import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class CatalogFinalTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.products=json.loads((ROOT/'data/products.json').read_text(encoding='utf-8'))
        cls.main=(ROOT/'assets/js/main.js').read_text(encoding='utf-8')

    def test_product_codes_unique_stable(self):
        self.assertEqual([f'OKA-{i:03}' for i in range(1,47)], [p['sku'] for p in self.products])
        self.assertEqual(len(set(p['sku'] for p in self.products)),46)

    def test_white_catalog_images_and_originals(self):
        for p in self.products:
            img=ROOT / p['image']
            self.assertEqual(img.suffix,'.webp')
            self.assertIn('/catalog/',p['image'])
            self.assertGreater(img.stat().st_size,6000)
            self.assertEqual(img.read_bytes()[:4],b'RIFF')
            for old in p.get('additional_images', []):
                self.assertTrue((ROOT/old).is_file(),old)

    def test_ui_uses_catalog_images_and_stable_sku(self):
        self.assertIn('products|catalog',self.main)
        self.assertIn('product.sku',self.main)
        self.assertIn('group.map((p) => productHTML(p))',self.main)
        self.assertIn('social-tile',self.main)

if __name__=='__main__': unittest.main()
