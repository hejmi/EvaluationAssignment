from datetime import timedelta
from typing import Dict
from collections import defaultdict

from models import Customer
from database import SERVICES

def daterange(start, end):
    for n in range((end - start).days + 1):
        yield start + timedelta(n)

def calculate(customer: Customer, start_date, end_date) -> Dict:
    all_days = []

    for svc, svc_start in customer.svc_start_dates.items():
        if svc not in SERVICES:
            continue
        service = SERVICES[svc]
        actual_start = max(start_date, svc_start)

        for day in daterange(actual_start, end_date):
            if day.isoweekday() in service.chargeable_days:
                all_days.append((day, svc))

    chargeable_days = all_days[customer.free_days:]
    per_svc_cost = defaultdict(float)
    total_cost = 0.0

    for day, svc in chargeable_days:
        service = SERVICES[svc]
        price = customer.svc_prices.get(svc, service.base_price)

        for d_start, d_end, discount in customer.svc_discounts.get(svc, []):
            if d_start <= day <= d_end:
                price *= (1 - discount)
                break

        per_svc_cost[svc] += price
        total_cost += price

    return {
        "total": round(total_cost, 2),
        "per_svc_cost": {svc_key: round(per_svc_cost.get(svc_key, 0.0), 2) for svc_key in SERVICES.keys()}
    }
