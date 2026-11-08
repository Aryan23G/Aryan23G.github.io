"""Deterministic sample warehouse ("Orbit Outfitters", 14 tables).

    python -m app.db.seed            # writes data/warehouse.db
    python -m app.db.seed --force    # regenerate

The data is generated from a fixed seed so tests and demos are reproducible,
and carries realistic structure worth asking about: growth, holiday
seasonality, channel mix drift, category return rates, carrier delays,
support load, and campaign attribution.
"""

from __future__ import annotations

import argparse
import random
import sqlite3
from datetime import date, timedelta
from pathlib import Path

from app.config import BACKEND_ROOT

SEED = 20240101
START = date(2024, 1, 1)
END = date(2025, 12, 31)

DDL = """
CREATE TABLE regions (region_id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT NOT NULL);
CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY, full_name TEXT NOT NULL, role TEXT NOT NULL,
  region_id INTEGER REFERENCES regions(region_id), hire_date TEXT NOT NULL);
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY, full_name TEXT NOT NULL, email TEXT NOT NULL, segment TEXT NOT NULL,
  region_id INTEGER NOT NULL REFERENCES regions(region_id), signup_date TEXT NOT NULL,
  account_manager_id INTEGER REFERENCES employees(employee_id));
CREATE TABLE product_categories (category_id INTEGER PRIMARY KEY, department TEXT NOT NULL, name TEXT NOT NULL);
CREATE TABLE suppliers (
  supplier_id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT NOT NULL, lead_time_days INTEGER NOT NULL);
CREATE TABLE products (
  product_id INTEGER PRIMARY KEY, sku TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES product_categories(category_id),
  supplier_id INTEGER NOT NULL REFERENCES suppliers(supplier_id),
  list_price REAL NOT NULL, unit_cost REAL NOT NULL, is_active INTEGER NOT NULL);
CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  order_date TEXT NOT NULL, status TEXT NOT NULL, channel TEXT NOT NULL);
CREATE TABLE order_items (
  order_item_id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL REFERENCES orders(order_id),
  product_id INTEGER NOT NULL REFERENCES products(product_id),
  quantity INTEGER NOT NULL, unit_price REAL NOT NULL, discount REAL NOT NULL);
CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL REFERENCES orders(order_id),
  method TEXT NOT NULL, amount REAL NOT NULL, paid_at TEXT NOT NULL);
CREATE TABLE shipments (
  shipment_id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL REFERENCES orders(order_id),
  carrier TEXT NOT NULL, shipped_date TEXT NOT NULL, delivered_date TEXT);
CREATE TABLE returns (
  return_id INTEGER PRIMARY KEY, order_item_id INTEGER NOT NULL REFERENCES order_items(order_item_id),
  return_date TEXT NOT NULL, reason TEXT NOT NULL, refund_amount REAL NOT NULL);
CREATE TABLE support_tickets (
  ticket_id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  order_id INTEGER REFERENCES orders(order_id), assigned_to INTEGER REFERENCES employees(employee_id),
  opened_at TEXT NOT NULL, priority TEXT NOT NULL, status TEXT NOT NULL,
  csat_score INTEGER, resolution_hours REAL);
CREATE TABLE marketing_campaigns (
  campaign_id INTEGER PRIMARY KEY, name TEXT NOT NULL, channel TEXT NOT NULL,
  start_date TEXT NOT NULL, end_date TEXT NOT NULL, budget_usd REAL NOT NULL);
CREATE TABLE campaign_attributions (
  attribution_id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL REFERENCES orders(order_id),
  campaign_id INTEGER NOT NULL REFERENCES marketing_campaigns(campaign_id));
CREATE INDEX ix_orders_date ON orders(order_date);
CREATE INDEX ix_items_order ON order_items(order_id);
CREATE INDEX ix_items_product ON order_items(product_id);
"""

FIRST = ["Ava", "Liam", "Noah", "Mia", "Zara", "Arjun", "Priya", "Lucas", "Emma", "Omar", "Sofia", "Kai", "Maya",
         "Ethan", "Leah", "Ravi", "Chloe", "Ben", "Isla", "Mateo", "Hana", "Jonas", "Aisha", "Theo", "Nina",
         "Felix"]
LAST = ["Patel", "Smith", "Chen", "Singh", "Garcia", "Muller", "Brown", "Nguyen", "Kim", "Wilson", "Khan", "Lopez",
        "Taylor", "Schmidt", "Martin", "Shah", "Clarke", "Rossi", "Walker", "Fischer"]
REGIONS = [("Ontario", "Canada"), ("British Columbia", "Canada"), ("US Northeast", "United States"),
           ("US West", "United States"), ("US South", "United States"), ("United Kingdom", "United Kingdom"),
           ("DACH", "Germany"), ("ANZ", "Australia")]
CATEGORIES = [("Outdoor", "Camping"), ("Outdoor", "Climbing"), ("Outdoor", "Cycling"), ("Apparel", "Footwear"),
              ("Apparel", "Outerwear"), ("Apparel", "Base Layers"), ("Tech", "Wearables"), ("Tech", "Power & Lighting")]
NOUNS = {
    "Camping": ["Tent", "Sleeping Bag", "Camp Stove", "Backpack 45L", "Water Filter"],
    "Climbing": ["Harness", "Carabiner Set", "Dynamic Rope", "Helmet"],
    "Cycling": ["Bike Helmet", "Saddle Bag", "Gravel Tires", "Mini Pump"],
    "Footwear": ["Trail Runner", "Hiking Boot", "Approach Shoe", "Winter Boot"],
    "Outerwear": ["Rain Shell", "Down Jacket", "Softshell"],
    "Base Layers": ["Merino Top", "Thermal Tights", "Wool Socks"],
    "Wearables": ["GPS Watch", "Satellite Messenger", "Heart Rate Strap"],
    "Power & Lighting": ["Headlamp", "Solar Charger", "Power Bank", "Lantern"],
}
PRICE = {"Camping": (30, 450), "Climbing": (15, 280), "Cycling": (18, 160), "Footwear": (80, 240),
         "Outerwear": (60, 380), "Base Layers": (18, 120), "Wearables": (90, 520), "Power & Lighting": (20, 140)}
RETURN_RATE = {"Footwear": 0.12, "Outerwear": 0.08, "Base Layers": 0.05, "Wearables": 0.06}
SEASON = [0.8, 0.75, 0.85, 0.95, 1.05, 1.15, 1.2, 1.15, 1.0, 0.95, 1.35, 1.6]


def _iso(d: date) -> str:
    return d.isoformat()


def build(path: Path, seed: int = SEED) -> dict[str, int]:
    rnd = random.Random(seed)
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        path.unlink()
    con = sqlite3.connect(path)
    cur = con.cursor()
    cur.executescript(DDL)

    cur.executemany("INSERT INTO regions VALUES (?,?,?)", [(i + 1, n, c) for i, (n, c) in enumerate(REGIONS)])

    employees: list[tuple[int, str]] = []
    roles = ["support_agent"] * 14 + ["account_manager"] * 8 + ["marketing"] * 4 + ["operations"] * 4
    for i, role in enumerate(roles, start=1):
        employees.append((i, role))
        cur.execute("INSERT INTO employees VALUES (?,?,?,?,?)",
                    (i, f"{rnd.choice(FIRST)} {rnd.choice(LAST)}", role, rnd.randint(1, len(REGIONS)),
                     _iso(START - timedelta(days=rnd.randint(30, 2000)))))
    agents = [e for e, r in employees if r == "support_agent"]
    managers = [e for e, r in employees if r == "account_manager"]

    cur.executemany("INSERT INTO product_categories VALUES (?,?,?)",
                    [(i + 1, d, n) for i, (d, n) in enumerate(CATEGORIES)])
    suppliers = [(1, "Northwind Textiles", "Vietnam", 45), (2, "Alpine Forge", "Italy", 30),
                 (3, "Pacific Gear Co", "Taiwan", 38), (4, "Maple Outdoor Supply", "Canada", 12),
                 (5, "Voltaic Devices", "China", 52), (6, "Blackforest Goods", "Germany", 21)]
    cur.executemany("INSERT INTO suppliers VALUES (?,?,?,?)", suppliers)

    products: list[tuple[int, str, float]] = []
    pid = 1
    for cid, (_dept, cat) in enumerate(CATEGORIES, start=1):
        for noun in NOUNS[cat]:
            lo, hi = PRICE[cat]
            price = round(lo + rnd.random() ** 1.5 * (hi - lo), 0) - 0.01
            cost = round(price * rnd.uniform(0.4, 0.62), 2)
            cur.execute("INSERT INTO products VALUES (?,?,?,?,?,?,?,?)",
                        (pid, f"OO-{cid:02d}{pid:03d}", f"{rnd.choice(['Orbit', 'Nova', 'Summit', 'Polaris'])} {noun}",
                         cid, rnd.randint(1, len(suppliers)), price, cost, 1 if rnd.random() > 0.08 else 0))
            products.append((pid, cat, price))
            pid += 1

    customers: list[tuple[int, date, str]] = []
    for cid in range(1, 801):
        segment = rnd.choices(["Consumer", "Small Business", "Enterprise"], [75, 18, 7])[0]
        signup = START + timedelta(days=int(rnd.random() ** 0.8 * 850) - 120)
        first, last = rnd.choice(FIRST), rnd.choice(LAST)
        cur.execute("INSERT INTO customers VALUES (?,?,?,?,?,?,?)",
                    (cid, f"{first} {last}", f"{first}.{last}{cid}@example.com".lower(), segment,
                     rnd.choices(range(1, len(REGIONS) + 1), [18, 10, 16, 15, 12, 12, 9, 8])[0], _iso(signup),
                     rnd.choice(managers) if segment != "Consumer" else None))
        customers.append((cid, signup, segment))

    campaigns: list[tuple[int, date, date]] = []
    camp_id = 1
    month = START
    while month <= END:
        for ch in rnd.sample(["email", "paid_search", "paid_social", "affiliate", "display"], 2):
            s = month + timedelta(days=rnd.randint(0, 10))
            e = s + timedelta(days=rnd.randint(14, 40))
            cur.execute("INSERT INTO marketing_campaigns VALUES (?,?,?,?,?,?)",
                        (camp_id, f"{month:%b %Y} {ch.replace('_', ' ').title()}", ch, _iso(s), _iso(e),
                         round(rnd.uniform(4000, 40000), -2)))
            campaigns.append((camp_id, s, e))
            camp_id += 1
        month = (month.replace(day=28) + timedelta(days=4)).replace(day=1)

    oid = iid = pay = ship = ret = tick = attr = 1
    d = START
    while d <= END:
        midx = (d.year - 2024) * 12 + d.month - 1
        expected = 5.5 * (1.026 ** midx) * SEASON[d.month - 1]
        n = max(0, round(expected + rnd.uniform(-2, 2)))
        eligible = [c for c in customers if c[1] <= d]
        mobile = 0.2 + 0.015 * midx
        for _ in range(n):
            cid, _signup, segment = rnd.choice(eligible)
            channel = "sales_rep" if segment == "Enterprise" and rnd.random() < 0.6 else rnd.choices(
                ["web", "mobile", "marketplace"], [0.65 - mobile * 0.7, mobile, 0.15 + mobile * 0.3])[0]
            days_left = (END - d).days
            status = ("processing" if days_left < 3 else "shipped" if days_left < 9
                      else "cancelled" if rnd.random() < 0.035 else "delivered")
            cur.execute("INSERT INTO orders VALUES (?,?,?,?,?)", (oid, cid, _iso(d), status, channel))
            total = 0.0
            for _l in range(1 + int(rnd.random() ** 1.7 * (6 if segment == "Enterprise" else 3))):
                p_id, cat, price = rnd.choice(products)
                qty = rnd.randint(1, 8) if segment == "Enterprise" else 1 + int(rnd.random() ** 3 * 3)
                unit = round(price * (1.04 if d.year == 2025 else 1.0), 2)
                disc = rnd.choice([0, 0, 0, 0.05, 0.1, 0.15, 0.2]) if rnd.random() < 0.35 else 0.0
                cur.execute("INSERT INTO order_items VALUES (?,?,?,?,?,?)", (iid, oid, p_id, qty, unit, disc))
                line = qty * unit * (1 - disc)
                total += line
                if status == "delivered" and rnd.random() < RETURN_RATE.get(cat, 0.03):
                    reason = "wrong_size" if cat == "Footwear" and rnd.random() < 0.6 else rnd.choice(
                        ["damaged", "not_as_described", "changed_mind", "late_delivery"])
                    cur.execute("INSERT INTO returns VALUES (?,?,?,?,?)",
                                (ret, iid, _iso(d + timedelta(days=rnd.randint(7, 30))), reason, round(line, 2)))
                    ret += 1
                iid += 1
            if status != "cancelled":
                method = "invoice" if segment == "Enterprise" else rnd.choices(
                    ["card", "paypal", "gift_card"], [70, 25, 5])[0]
                cur.execute("INSERT INTO payments VALUES (?,?,?,?,?)", (pay, oid, method, round(total, 2), _iso(d)))
                pay += 1
            if status in ("shipped", "delivered"):
                carrier = rnd.choice(["UPS", "FedEx", "DHL", "Canada Post"])
                shipped = d + timedelta(days=rnd.randint(0, 2))
                transit = rnd.randint(2, 6) + (3 if carrier == "DHL" and rnd.random() < 0.3 else 0)
                delivered = _iso(shipped + timedelta(days=transit)) if status == "delivered" else None
                cur.execute("INSERT INTO shipments VALUES (?,?,?,?,?)", (ship, oid, carrier, _iso(shipped), delivered))
                ship += 1
            if rnd.random() < 0.09:
                prio = rnd.choices(["low", "medium", "high", "urgent"], [35, 40, 18, 7])[0]
                opened = d + timedelta(days=rnd.randint(1, 20))
                resolved = opened <= END - timedelta(days=5) or rnd.random() < 0.3
                tstatus = "resolved" if resolved else rnd.choice(["open", "pending"])
                hours = round(rnd.uniform(0.5, 12) * {"low": 4, "medium": 2.5, "high": 1.4, "urgent": 0.6}[prio], 1)
                csat = (max(1, min(5, round(5.2 - hours / 12 + rnd.uniform(-1.2, 0.6))))
                        if resolved and rnd.random() < 0.6 else None)
                cur.execute("INSERT INTO support_tickets VALUES (?,?,?,?,?,?,?,?,?)",
                            (tick, cid, oid, rnd.choice(agents), _iso(min(opened, END)), prio, tstatus, csat,
                             hours if resolved else None))
                tick += 1
            active = [c for c in campaigns if c[1] <= d <= c[2]]
            if active and rnd.random() < 0.3:
                cur.execute("INSERT INTO campaign_attributions VALUES (?,?,?)", (attr, oid, rnd.choice(active)[0]))
                attr += 1
            oid += 1
        d += timedelta(days=1)

    con.commit()
    counts = {t: cur.execute(f"SELECT count(*) FROM {t}").fetchone()[0]  # fixed table names from sqlite_master
              for (t,) in cur.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()}
    con.close()
    return counts


def default_path() -> Path:
    return BACKEND_ROOT / "data" / "warehouse.db"


def ensure(path: Path | None = None) -> Path:
    """Create the sample warehouse if it does not exist yet."""
    target = path or default_path()
    if not target.exists():
        build(target)
    return target


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--path", type=Path, default=default_path())
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    if args.path.exists() and not args.force:
        print(f"{args.path} exists (use --force to regenerate)")
        return
    for table, n in build(args.path).items():
        print(f"{table:24s} {n:>7,}")


if __name__ == "__main__":
    main()
