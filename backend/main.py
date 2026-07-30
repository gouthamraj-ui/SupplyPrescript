from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

from backend.recommendation import get_recommendation

app = FastAPI()

model = joblib.load("models/optimized_random_forest.pkl")


class Shipment(BaseModel):
    shipment_quantity: int
    unit_price: float
    lead_time: float
    stock_quantity: int
    rating: float
    shipment_value: float
    supplier_avg_delay: float


@app.get("/")
def home():
    return {"message": "SupplyPrescript API is Running"}

#---------------------Health API---------------------------
@app.get("/health")
def health():
    return {
        "status" : "Healthy",
        "service" : "Supplyprescript API"
    }


# -------------------- Recommendations API --------------------

recommendations = [
    {
        "shipment_id": 101,
        "action": "Change Supplier",
        "saving": 5000
    },
    {
        "shipment_id": 102,
        "action": "Increase Inventory",
        "saving": 3000
    }
]

@app.get("/recommendations")
def get_recommendations():
    return recommendations


# -------------------- Model Info API --------------------

@app.get("/model-info")
def model_info():
    return {
        "model": "Random Forest",
        "version": "1.0",
        "features": [
            "shipment_quantity",
            "unit_price",
            "lead_time",
            "stock_quantity",
            "rating",
            "shipment_value",
            "supplier_avg_delay"
        ]
    }


# -------------------- Prediction API --------------------

@app.post("/predict")
def predict(data: Shipment):

    sample = pd.DataFrame([{
        "shipment_quantity": data.shipment_quantity,
        "unit_price": data.unit_price,
        "lead_time": data.lead_time,
        "stock_quantity": data.stock_quantity,
        "rating": data.rating,
        "shipment_value": data.shipment_value,
        "supplier_avg_delay": data.supplier_avg_delay
    }])

    prediction = model.predict(sample)[0]
    probability = model.predict_proba(sample)[0][1]

    recommendation = get_recommendation(
        prediction,
        data.supplier_avg_delay,
        data.stock_quantity,
        data.lead_time,
        data.rating
    )

    return {
        "prediction": "Delayed" if prediction == 1 else "On Time",
        "delay_probability": round(float(probability), 4),
        "confidence": round(float(probability * 100), 2),
        "recommended_action": recommendation["recommended_action"],
        "estimated_saving": recommendation["estimated_saving"]
    }

