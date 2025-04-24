from database import CUSTOMERS
from logic import calculate
from datetime import date

# Test case for Company X
company_x = CUSTOMERS["Company_X"]
result1 = calculate(company_x, date(2019, 9, 20), date(2019, 10, 1))
print(company_x.customer_id,":", result1)

# Test case for Company Y
company_y = CUSTOMERS["Company_Y"]
result2 = calculate(company_y, date(2018, 1, 1), date(2019, 10, 1))
print(company_y.customer_id,":", result2)
