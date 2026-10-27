"""V5 regression checks for UI polish and accessible responsive behavior."""
from pathlib import Path
import json
import unittest
BASE = Path(__file__).resolve().parents[1]

class V5PolishTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (BASE / 'index.html').read_text('utf-8')
        cls.css = (BASE / 'assets/css/style.css').read_text('utf-8')
        cls.main = (BASE / 'assets/js/main.js').read_text('utf-8')
        cls.data = json.loads((BASE / 'data/products.json').read_text('utf-8'))
        cls.site = json.loads((BASE / 'data/site.json').read_text('utf-8'))

    def test_social_networks_have_only_one_display_component(self):
        self.assertIn('id="socialLinks"',self.html)
        self.assertNotIn('id="instagramLink"',self.html)
        self.assertNotIn('id="telegramLink"',self.html)
        for name in ['instagram','telegram','youtube','facebook']:
            self.assertIn(f"['{name}'",self.main)
            self.assertTrue(self.site[name].startswith('https://'))

    def test_stable_sku_numbers(self):
        sku = [p['sku'] for p in self.data]
        self.assertEqual(sku,[f'OKA-{n:03}' for n in range(1,47)])
        self.assertIn('${escapeHTML(product.sku',self.main)

    def test_theme_and_responsive_breakpoints(self):
        for q in ['max-width:600px','max-width:360px','max-width:991.98px']:
            self.assertIn(q,self.css)
        self.assertIn('body.dark-mode .product-card',self.css)
        self.assertIn('grid-template-columns:minmax(0,1fr)!important',self.css)
        self.assertIn('var(--oka-border)',self.css)
        self.assertIn('id="themeSwitch"',self.html)
        self.assertNotIn('user-scalable=no',self.html)
        self.assertNotIn('maximum-scale',self.html)

    def test_catalog_images_available_and_not_empty(self):
        for p in self.data:
            path=BASE/p['image']
            self.assertTrue(path.is_file(),f"Missing {path}")
            self.assertGreater(path.stat().st_size,1000,p['sku'])

if __name__ == '__main__':unittest.main()
