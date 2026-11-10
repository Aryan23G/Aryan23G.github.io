/**
 * Schema + data dictionary for the demo warehouse. The table list is the guard's
 * allowlist, and the descriptions are shown in the schema browser.
 */

export interface ColumnDef {
  name: string;
  type: "INTEGER" | "REAL" | "TEXT";
  description: string;
  pk?: boolean;
  references?: string; // "table.column"
}

export interface TableDef {
  name: string;
  description: string;
  columns: ColumnDef[];
}

export const TABLES: TableDef[] = [
  {
    name: "customers",
    description: "One row per registered customer of Orbit Outfitters, an online outdoor-gear store.",
    columns: [
      { name: "customer_id", type: "INTEGER", pk: true, description: "Primary key." },
      { name: "name", type: "TEXT", description: "Full name." },
      { name: "email", type: "TEXT", description: "Email address (synthetic)." },
      { name: "country", type: "TEXT", description: "Country: Canada, United States, United Kingdom, Germany, Australia, India." },
      { name: "city", type: "TEXT", description: "City within the country." },
      { name: "segment", type: "TEXT", description: "Customer segment: 'Consumer', 'Small Business' or 'Enterprise'." },
      { name: "signup_date", type: "TEXT", description: "Account creation date, ISO 'YYYY-MM-DD'." },
    ],
  },
  {
    name: "products",
    description: "Product catalogue.",
    columns: [
      { name: "product_id", type: "INTEGER", pk: true, description: "Primary key." },
      { name: "name", type: "TEXT", description: "Product name." },
      { name: "category", type: "TEXT", description: "One of 'Camping', 'Climbing', 'Cycling', 'Footwear', 'Apparel', 'Electronics'." },
      { name: "unit_price", type: "REAL", description: "Current list price in USD." },
      { name: "unit_cost", type: "REAL", description: "Cost to the store in USD (for margin calculations)." },
    ],
  },
  {
    name: "orders",
    description: "One row per order (order header).",
    columns: [
      { name: "order_id", type: "INTEGER", pk: true, description: "Primary key." },
      { name: "customer_id", type: "INTEGER", references: "customers.customer_id", description: "Who placed the order." },
      { name: "order_date", type: "TEXT", description: "Order date, ISO 'YYYY-MM-DD'. Use strftime('%Y-%m', order_date) for months." },
      { name: "status", type: "TEXT", description: "'delivered', 'shipped', 'processing', 'cancelled' or 'returned'. Revenue normally excludes 'cancelled' and 'returned'." },
      { name: "channel", type: "TEXT", description: "Sales channel: 'web', 'mobile' or 'marketplace'." },
      { name: "shipping_cost", type: "REAL", description: "Shipping charged to the customer in USD (not part of product revenue)." },
    ],
  },
  {
    name: "order_items",
    description: "Order lines. Line revenue = quantity * unit_price * (1 - discount).",
    columns: [
      { name: "order_item_id", type: "INTEGER", pk: true, description: "Primary key." },
      { name: "order_id", type: "INTEGER", references: "orders.order_id", description: "Parent order." },
      { name: "product_id", type: "INTEGER", references: "products.product_id", description: "Product sold." },
      { name: "quantity", type: "INTEGER", description: "Units on this line (1-5)." },
      { name: "unit_price", type: "REAL", description: "Price per unit actually charged, in USD, before discount." },
      { name: "discount", type: "REAL", description: "Fractional discount between 0 and 0.3 (0.1 = 10% off)." },
    ],
  },
  {
    name: "reviews",
    description: "Product reviews left by customers.",
    columns: [
      { name: "review_id", type: "INTEGER", pk: true, description: "Primary key." },
      { name: "product_id", type: "INTEGER", references: "products.product_id", description: "Product reviewed." },
      { name: "customer_id", type: "INTEGER", references: "customers.customer_id", description: "Reviewer." },
      { name: "rating", type: "INTEGER", description: "Star rating 1-5." },
      { name: "review_date", type: "TEXT", description: "ISO 'YYYY-MM-DD'." },
    ],
  },
];

export const TABLE_NAMES = TABLES.map((t) => t.name);


export function ddl(): string {
  return TABLES.map((t) => {
    const cols = t.columns.map((c) => {
      let s = `  ${c.name} ${c.type}`;
      if (c.pk) s += " PRIMARY KEY";
      if (c.references) {
        const [rt, rc] = c.references.split(".");
        s += ` REFERENCES ${rt}(${rc})`;
      }
      return s;
    });
    return `CREATE TABLE ${t.name} (\n${cols.join(",\n")}\n);`;
  }).join("\n\n");
}
