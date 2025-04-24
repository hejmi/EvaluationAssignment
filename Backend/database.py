from datetime import date
from models import Service, Customer

SERVICES = {
    "A": Service(0.2, [1, 2, 3, 4, 5]),
    "B": Service(0.24, [1, 2, 3, 4, 5]),
    "C": Service(0.4, [1, 2, 3, 4, 5, 6, 7]),
}

CUSTOMERS = {
    "Company_X": Customer(
        customer_id="Company_X",
        svc_start_dates={"A": date(2019, 9, 20), "C": date(2019, 9, 20)},
        svc_prices={},
        svc_discounts={
            "C": [(date(2019, 9, 22), date(2019, 9, 24), 0.2)]
        },
        free_days=0,
    ),
    "Company_Y": Customer(
        customer_id="Company_Y",
        svc_start_dates={"B": date(2018, 1, 1), "C": date(2018, 1, 1)},
        svc_prices={},
        svc_discounts={
            "B": [(date(2018, 1, 1), date(2019, 10, 1), 0.3)],
            "C": [(date(2018, 1, 1), date(2019, 10, 1), 0.3)],
        },
        free_days=200,
    )
}
