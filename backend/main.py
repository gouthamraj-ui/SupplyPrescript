from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from backend.db_connection import get_connection
from backend.recommendation import get_recommendation

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("models/optimized_random_forest.pkl")


class Shipment(BaseModel):
    shipment_quantity: int
    unit_price: float
    lead_time: float
    stock_quantity: int
    rating: float
    shipment_value: float
    supplier_avg_delay: float

class OutcomeRequest(BaseModel):
    decision_id: int
    outcome_status: str
    actual_delay: float
    comments: str


@app.get("/")
def home():
    return {"message": "SupplyPrescript API is Running"}


# --------------------- Health API ---------------------

@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "service": "SupplyPrescript API"
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

    delay_probability = round(float(probability), 4)
    confidence = round(float(probability * 100), 2)

    recommendation = get_recommendation(
        prediction,
        data.supplier_avg_delay,
        data.stock_quantity,
        data.lead_time,
        data.rating
    )

    # ---------------- Save Prediction ----------------

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO predict_decisions (
        shipment_quantity,
        unit_price,
        lead_time,
        stock_quantity,
        rating,
        shipment_value,
        supplier_avg_delay,
        prediction,
        delay_probability,
        confidence,
        recommended_action,
        estimated_saving
    )
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data.shipment_quantity,
        data.unit_price,
        data.lead_time,
        data.stock_quantity,
        data.rating,
        data.shipment_value,
        data.supplier_avg_delay,
        "Delayed" if prediction == 1 else "On Time",
        delay_probability,
        confidence,
        recommendation["recommended_action"],
        recommendation["estimated_saving"]
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    # ---------------- API Response ----------------

    return {
        "prediction": "Delayed" if prediction == 1 else "On Time",
        "delay_probability": delay_probability,
        "confidence": confidence,
        "recommended_action": recommendation["recommended_action"],
        "estimated_saving": recommendation["estimated_saving"]
    }

# -------------------- Decision History API --------------------

@app.get("/decisions")
def get_decisions():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT *
            FROM predict_decisions
            ORDER BY created_at DESC
        """)

        decisions = cursor.fetchall()

        cursor.close()
        conn.close()

        return decisions

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/outcomes")
def save_outcome(data: OutcomeRequest):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO post_outcomes
        (
            decision_id,
            outcome_status,
            actual_delay,
            comments
        )
        VALUES (%s, %s, %s, %s)
        """

        values = (
            data.decision_id,
            data.outcome_status,
            data.actual_delay,
            data.comments
        )

        cursor.execute(query, values)
        conn.commit()

        cursor.close()
        conn.close()

        return {
            "message": "Outcome saved successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/outcomes")
def get_outcomes():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                o.outcome_id,
                o.decision_id,
                d.prediction,
                d.recommended_action,
                o.outcome_status,
                o.actual_delay,
                o.comments,
                o.recorded_at
            FROM post_outcomes o
            JOIN predict_decisions d
                ON o.decision_id = d.decision_id
            ORDER BY o.recorded_at DESC
        """)

        outcomes = cursor.fetchall()

        cursor.close()
        conn.close()

        return outcomes

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))






