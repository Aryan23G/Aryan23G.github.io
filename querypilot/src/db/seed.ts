/**
 * Deterministic synthetic dataset for "Orbit Outfitters".
 *
 * Generated from a fixed seed so every visitor, test and eval run sees the
 * exact same numbers (eval gold answers depend on this). The generator bakes
 * in realistic structure worth asking about: month-over-month growth, holiday
 * seasonality, summer peaks for some categories, a mobile channel that grows
 * over time, category-specific return rates and per-product quality.
 */
import type { Database } from "sql.js";
import { ddl } from "./schema.ts";

export const SEED = 20240101;

/** mulberry32: tiny, fast, deterministic PRNG. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rand = () => number;
const pick = <T>(r: Rand, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]!;
function weighted<T>(r: Rand, items: readonly (readonly [T, number])[]): T {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let x = r() * total;
  for (const [v, w] of items) {
    x -= w;
    if (x <= 0) return v;
  }
  return items[items.length - 1]![0];
}
const round2 = (n: number) => Math.round(n * 100) / 100;
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

const FIRST = ["Ava", "Liam", "Noah", "Mia", "Zara", "Arjun", "Priya", "Lucas", "Emma", "Omar", "Sofia", "Kai", "Maya", "Ethan", "Leah", "Ravi", "Chloe", "Ben", "Isla", "Mateo", "Hana", "Jonas", "Aisha", "Theo", "Nina", "Felix", "Anika", "Owen", "Grace", "Dev"];
const LAST = ["Patel", "Smith", "Chen", "Singh", "Garcia", "Muller", "Brown", "Nguyen", "Kim", "Wilson", "Khan", "Lopez", "Taylor", "Schmidt", "Martin", "Shah", "Clarke", "Rossi", "Walker", "Fischer"];
const GEO = [
  ["Canada", ["Toronto", "Vancouver", "Montreal", "Calgary", "Waterloo"], 26],
  ["United States", ["Seattle", "Denver", "Austin", "Boston", "Portland", "Chicago"], 34],
  ["United Kingdom", ["London", "Manchester", "Edinburgh", "Bristol"], 14],
  ["Germany", ["Berlin", "Munich", "Hamburg"], 10],
  ["Australia", ["Sydney", "Melbourne", "Brisbane"], 9],
  ["India", ["Bengaluru", "Mumbai", "Pune", "Delhi"], 7],
] as const;

const CATALOG: Record<string, { nouns: string[]; price: [number, number]; returnRate: number; summer: number }> = {
  Camping: { nouns: ["Tent", "Sleeping Bag", "Camp Stove", "Trekking Poles", "Headlamp", "Backpack 45L", "Water Filter", "Hammock"], price: [25, 420], returnRate: 0.04, summer: 0.6 },
  Climbing: { nouns: ["Harness", "Chalk Bag", "Carabiner Set", "Dynamic Rope", "Belay Device", "Helmet"], price: [15, 260], returnRate: 0.03, summer: 0.25 },
  Cycling: { nouns: ["Bike Helmet", "Cycling Jersey", "Bike Light", "Saddle Bag", "Gravel Tires", "Mini Pump"], price: [18, 180], returnRate: 0.05, summer: 0.5 },
  Footwear: { nouns: ["Trail Runner", "Hiking Boot", "Approach Shoe", "Camp Sandal", "Winter Boot"], price: [70, 240], returnRate: 0.13, summer: 0.1 },
  Apparel: { nouns: ["Rain Shell", "Down Jacket", "Fleece Hoodie", "Base Layer", "Hiking Pants", "Wool Beanie", "Softshell"], price: [22, 350], returnRate: 0.08, summer: -0.15 },
  Electronics: { nouns: ["GPS Watch", "Satellite Messenger", "Solar Charger", "Action Camera", "Power Bank"], price: [40, 520], returnRate: 0.06, summer: 0.15 },
};
const BRANDS = ["Orbit", "Nova", "Summit", "Polaris", "Vega", "Comet", "Apex", "Lumen"];

const START = new Date("2024-01-01T00:00:00Z");
const END = new Date("2025-12-31T00:00:00Z");

export interface SeedStats {
  customers: number;
  products: number;
  orders: number;
  order_items: number;
  reviews: number;
}

export function seedDatabase(db: Database, seed = SEED): SeedStats {
  const r = rng(seed);
  db.run(ddl());
  db.run("BEGIN");

  // ---- products ----
  const products: { id: number; category: string; price: number; quality: number }[] = [];
  const insP = db.prepare("INSERT INTO products VALUES (?,?,?,?,?)");
  let pid = 1;
  for (const [category, spec] of Object.entries(CATALOG)) {
    for (const noun of spec.nouns) {
      const variants = 1 + Math.floor(r() * 2);
      for (let v = 0; v < variants; v++) {
        const [lo, hi] = spec.price;
        const price = round2(lo + Math.pow(r(), 1.6) * (hi - lo)) - 0.01;
        const cost = round2(price * (0.42 + r() * 0.2));
        const name = `${pick(r, BRANDS)} ${noun}${variants > 1 ? (v === 0 ? " Lite" : " Pro") : ""}`;
        insP.run([pid, name, category, round2(price), cost]);
        products.push({ id: pid, category, price: round2(price), quality: 3.2 + r() * 1.6 });
        pid++;
      }
    }
  }
  insP.free();

  // ---- customers ----
  const N_CUSTOMERS = 600;
  const customers: { id: number; signup: Date; segment: string; activity: number }[] = [];
  const insC = db.prepare("INSERT INTO customers VALUES (?,?,?,?,?,?,?)");
  const span = (END.getTime() - START.getTime()) / 86400000;
  for (let id = 1; id <= N_CUSTOMERS; id++) {
    const [country, cities] = weighted(r, GEO.map((g) => [[g[0], g[1]] as const, g[2]] as const));
    const first = pick(r, FIRST);
    const last = pick(r, LAST);
    // Signups skew later (growing business); some predate the order window.
    const signup = addDays(START, Math.floor((Math.pow(r(), 0.8) * (span + 120)) - 120));
    const segment = weighted(r, [["Consumer", 74], ["Small Business", 19], ["Enterprise", 7]] as const);
    insC.run([id, `${first} ${last}`, `${first}.${last}${id}@example.com`.toLowerCase(), country, pick(r, cities), segment, iso(signup)]);
    customers.push({ id, signup, segment, activity: Math.pow(r(), 2) * (segment === "Enterprise" ? 3 : segment === "Small Business" ? 1.8 : 1) });
  }
  insC.free();

  // ---- orders + items ----
  const insO = db.prepare("INSERT INTO orders VALUES (?,?,?,?,?,?)");
  const insI = db.prepare("INSERT INTO order_items VALUES (?,?,?,?,?,?)");
  const insR = db.prepare("INSERT INTO reviews VALUES (?,?,?,?,?)");
  let oid = 1, iid = 1, rid = 1;
  const SEASON = [0.8, 0.75, 0.85, 0.95, 1.05, 1.15, 1.2, 1.15, 1.0, 0.95, 1.35, 1.6];

  for (let d = START; d <= END; d = addDays(d, 1)) {
    const monthIdx = (d.getUTCFullYear() - 2024) * 12 + d.getUTCMonth();
    const month = d.getUTCMonth();
    const growth = Math.pow(1.028, monthIdx);
    const expected = 4.2 * growth * SEASON[month]! * (d.getUTCDay() === 0 || d.getUTCDay() === 6 ? 1.15 : 1);
    const nOrders = Math.max(0, Math.round(expected + (r() - 0.5) * 3));
    const eligible = customers.filter((c) => c.signup <= d);
    if (eligible.length === 0) continue;
    const isSummer = month >= 4 && month <= 7;
    const mobileShare = 0.22 + 0.016 * monthIdx;
    const daysToEnd = (END.getTime() - d.getTime()) / 86400000;

    for (let k = 0; k < nOrders; k++) {
      // activity-weighted customer choice (a few loyal heavy buyers)
      let c = pick(r, eligible);
      for (let tries = 0; tries < 3 && r() > c.activity; tries++) c = pick(r, eligible);

      const channel = weighted(r, [["mobile", mobileShare], ["web", 0.66 - mobileShare * 0.7], ["marketplace", 0.12 + mobileShare * 0.3]] as const);
      let status: string;
      if (daysToEnd < 4) status = r() < 0.7 ? "processing" : "shipped";
      else if (daysToEnd < 10) status = r() < 0.75 ? "shipped" : "delivered";
      else status = weighted(r, [["delivered", 0.9], ["cancelled", 0.04]] as const);

      const lines = 1 + Math.floor(Math.pow(r(), 1.8) * (c.segment === "Enterprise" ? 6 : 4));
      let orderReturned = false;
      const orderLines: [number, number, number, number, number, number][] = [];
      for (let l = 0; l < lines; l++) {
        const cat = weighted(r, Object.entries(CATALOG).map(([name, s]) => [name, 1 + (isSummer ? s.summer : -s.summer * 0.4)] as const));
        const choices = products.filter((p) => p.category === cat);
        const p = pick(r, choices);
        const qty = c.segment === "Enterprise" ? 1 + Math.floor(r() * 5) : 1 + Math.floor(Math.pow(r(), 3) * 3);
        // Prices drift up ~4% in 2025.
        const price = round2(p.price * (d.getUTCFullYear() === 2025 ? 1.04 : 1));
        const discount = r() < 0.28 ? pick(r, [0.05, 0.1, 0.15, 0.2, 0.3]) : 0;
        if (status === "delivered" && r() < CATALOG[cat]!.returnRate) orderReturned = true;
        orderLines.push([iid++, oid, p.id, qty, price, discount]);

        if (status === "delivered" && r() < 0.3) {
          const rating = Math.max(1, Math.min(5, Math.round(p.quality + (r() - 0.5) * 2.4)));
          insR.run([rid++, p.id, c.id, rating, iso(addDays(d, 5 + Math.floor(r() * 25)))]);
        }
      }
      if (orderReturned) status = "returned";
      const shipping = channel === "marketplace" ? 0 : pick(r, [0, 0, 4.99, 7.99, 12.5]);
      insO.run([oid, c.id, iso(d), status, channel, shipping]);
      for (const line of orderLines) insI.run(line);
      oid++;
    }
  }
  insO.free();
  insI.free();
  insR.free();
  db.run("COMMIT");
  // Reviews can be dated a few weeks after the order; clamp to the data window.
  db.run("UPDATE reviews SET review_date = '2025-12-31' WHERE review_date > '2025-12-31'");
  db.run("CREATE INDEX idx_orders_date ON orders(order_date); CREATE INDEX idx_items_order ON order_items(order_id); CREATE INDEX idx_items_product ON order_items(product_id);");

  return { customers: N_CUSTOMERS, products: pid - 1, orders: oid - 1, order_items: iid - 1, reviews: rid - 1 };
}
