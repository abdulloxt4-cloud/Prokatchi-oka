from pathlib import Path
import json

BASE = Path(__file__).resolve().parents[1]


def test_deploy_files():
    assert (BASE / 'render.yaml').is_file()
    assert 'gunicorn app:app' in (BASE / 'render.yaml').read_text()
    assert 'DATABASE_URL' in (BASE / '.env.example').read_text()
    assert '.env' in (BASE / '.gitignore').read_text()
    assert 'DATABASE_URL' in (BASE / 'app.py').read_text()


def test_all_items_are_referenced_and_priced_consistently():
    products = json.loads((BASE / 'data/products.json').read_text(encoding='utf-8'))
    assert len(products) == 46
    assert len(set(item['sku'] for item in products)) == 46
    for item in products:
        assert (BASE / item['image']).is_file(), item['sku']
        price = item['price_per_day']
        assert price is None or (isinstance(price, int) and price > 0)
