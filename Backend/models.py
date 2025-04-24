from datetime import date
from typing import List, Dict, Tuple

class Service:
    def __init__(self, base_price: float, chargeable_days: List[int]):
        self.base_price = base_price # Base price for the service
        self.chargeable_days = chargeable_days  # List of chargeable days where 1=Monday ... 7=Sunday

class Customer:
    def __init__(
        self,
        customer_id: str,
        svc_start_dates: Dict[str, date], # Service specific start dates for customer
        svc_prices: Dict[str, float], # Service specific prices for customer
        svc_discounts: Dict[str, List[Tuple[date, date, float]]], # Service specific discounts for customer
        free_days: int, # Affects all services for customer, could be extended to be service specific
    ):
        self.customer_id = customer_id
        self.svc_start_dates = svc_start_dates
        self.svc_prices = svc_prices
        self.svc_discounts = svc_discounts
        self.free_days = free_days
