from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import date

from database import CUSTOMERS
from logic import calculate

app = FastAPI()

class PriceRequest(BaseModel):
    customer_id: str
    start_date: date
    end_date: date

@app.post("/calculate")
def get_price(data: PriceRequest):
    customer = CUSTOMERS.get(data.customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    return calculate(customer, data.start_date, data.end_date)
