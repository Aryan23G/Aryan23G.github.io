"""Business data dictionary for the sample warehouse.

Physical schema (names, types, keys) is always introspected from the live
database. This module only adds the *semantic* layer that databases rarely
carry: what a table means, units, and how metrics are defined. For a database
with real column comments (e.g. Postgres `COMMENT ON`), introspected comments
take precedence and this dictionary can be empty.
"""

from __future__ import annotations

from typing import Final

TABLE_DESCRIPTIONS: Final[dict[str, str]] = {
    "regions": "Sales regions used for territory reporting.",
    "customers": "Registered customers (B2C and B2B accounts) with segment and home region.",
    "product_categories": "Product category hierarchy (department > category).",
    "suppliers": "Vendors supplying products, with country and lead time.",
    "products": "Product catalogue with list price, unit cost and supplier.",
    "orders": "Order headers: who ordered, when, through which channel, and fulfilment status.",
    "order_items": "Order lines. Line revenue = quantity * unit_price * (1 - discount).",
    "payments": "Payments captured against orders (card, paypal, invoice, gift_card).",
    "shipments": "Outbound shipments per order with carrier and delivery dates.",
    "returns": "Returned order lines with reason and refund amount.",
    "employees": "Staff directory including support agents and account managers.",
    "support_tickets": "Customer support tickets with priority, status, CSAT and resolution time.",
    "marketing_campaigns": "Marketing campaigns with channel, budget and flight dates.",
    "campaign_attributions": "Last-touch attribution of orders to marketing campaigns.",
}

COLUMN_DESCRIPTIONS: Final[dict[str, dict[str, str]]] = {
    "customers": {
        "segment": "One of 'Consumer', 'Small Business', 'Enterprise'.",
        "signup_date": "ISO date (YYYY-MM-DD) the account was created.",
        "account_manager_id": "Employee managing the account (Enterprise/Small Business only).",
    },
    "products": {
        "list_price": "Current list price in USD.",
        "unit_cost": "Landed cost per unit in USD; margin = price paid - unit_cost.",
    },
    "orders": {
        "order_date": "ISO date (YYYY-MM-DD).",
        "status": "'delivered', 'shipped', 'processing' or 'cancelled'. Revenue excludes 'cancelled'.",
        "channel": "'web', 'mobile', 'marketplace' or 'sales_rep'.",
    },
    "order_items": {
        "unit_price": "Price per unit charged, USD, before discount.",
        "discount": "Fractional discount 0-0.3 (0.1 = 10% off).",
    },
    "payments": {"method": "'card', 'paypal', 'invoice' or 'gift_card'.", "amount": "USD captured."},
    "shipments": {
        "carrier": "'UPS', 'FedEx', 'DHL' or 'Canada Post'.",
        "shipped_date": "ISO date.",
        "delivered_date": "ISO date; NULL while in transit.",
    },
    "returns": {
        "reason": "'damaged', 'wrong_size', 'not_as_described', 'changed_mind' or 'late_delivery'.",
        "refund_amount": "USD refunded.",
    },
    "employees": {"role": "'support_agent', 'account_manager', 'marketing' or 'operations'."},
    "support_tickets": {
        "priority": "'low', 'medium', 'high' or 'urgent'.",
        "status": "'open', 'pending' or 'resolved'.",
        "csat_score": "Customer satisfaction 1-5, NULL if no survey response.",
        "resolution_hours": "Hours from open to resolution; NULL if unresolved.",
    },
    "marketing_campaigns": {
        "channel": "'email', 'paid_search', 'paid_social', 'affiliate' or 'display'.",
        "budget_usd": "Total planned spend in USD.",
    },
}
