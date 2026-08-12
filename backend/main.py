from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

from backend.db_connection import get_connection
from backend.recommendation import get_recommendation
from backend.optimizer import optimize_shipment


app = FastAPI()


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# LOAD ML MODEL
# =========================================================

model = joblib.load("models/optimized_random_forest.pkl")


# =========================================================
# REQUEST MODELS
# =========================================================

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


class DecisionRequest(BaseModel):
    decision_id: int
    action_taken: str


# =========================================================
# HOME API
# =========================================================

@app.get("/")
def home():
    return {
        "message": "SupplyPrescript API is Running"
    }


# =========================================================
# HEALTH API
# =========================================================

@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "service": "SupplyPrescript API"
    }


# =========================================================
# RECOMMENDATIONS API
# =========================================================

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


# =========================================================
# MODEL INFO API
# =========================================================

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


# =========================================================
# PREDICTION API
# =========================================================

@app.post("/predict")
def predict(data: Shipment):

    try:

        # -------------------------------------------------
        # Prepare input data
        # -------------------------------------------------

        sample = pd.DataFrame([{
            "shipment_quantity": data.shipment_quantity,
            "unit_price": data.unit_price,
            "lead_time": data.lead_time,
            "stock_quantity": data.stock_quantity,
            "rating": data.rating,
            "shipment_value": data.shipment_value,
            "supplier_avg_delay": data.supplier_avg_delay
        }])


        # -------------------------------------------------
        # ML Prediction
        # -------------------------------------------------

        prediction = model.predict(sample)[0]

        probability = model.predict_proba(sample)[0][1]

        delay_probability = round(float(probability), 4)

        confidence = round(
            float(probability * 100),
            2
        )


        # -------------------------------------------------
        # Recommendation
        # -------------------------------------------------

        recommendation = get_recommendation(
            prediction,
            data.supplier_avg_delay,
            data.stock_quantity,
            data.lead_time,
            data.rating
        )


        # -------------------------------------------------
        # PuLP Optimization
        # -------------------------------------------------

        optimization = optimize_shipment(
            shipment_value=data.shipment_value,
            lead_time=data.lead_time,
            stock_quantity=data.stock_quantity,
            supplier_avg_delay=data.supplier_avg_delay
        )


        # -------------------------------------------------
        # Save Prediction
        # -------------------------------------------------

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


        # -------------------------------------------------
        # API Response
        # -------------------------------------------------

        return {
            "prediction": (
                "Delayed"
                if prediction == 1
                else "On Time"
            ),

            "delay_probability": delay_probability,

            "confidence": confidence,

            "recommended_action": (
                recommendation["recommended_action"]
            ),

            "estimated_saving": (
                recommendation["estimated_saving"]
            ),

            "optimized_action": (
                optimization["best_action"]
            ),

            "optimized_cost": (
                optimization["best_cost"]
            ),

            "optimized_delay_days": (
                optimization["best_delay_days"]
            ),

            "optimized_risk": (
                optimization["best_risk"]
            ),

            "alternatives": (
                optimization["alternatives"]
            )
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =========================================================
# GET DECISION HISTORY
# =========================================================

@app.get("/decisions")
def get_decisions():

    conn = None
    cursor = None

    try:

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute("""
            SELECT
                decision_id,
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
                estimated_saving,
                action_taken,
                created_at
            FROM predict_decisions
            ORDER BY created_at DESC
        """)

        decisions = cursor.fetchall()

        return decisions


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# EXECUTE DECISION
# =========================================================

@app.post("/decisions")
def execute_decision(
    data: DecisionRequest
):

    conn = None
    cursor = None

    try:

        conn = get_connection()

        cursor = conn.cursor()


        # -------------------------------------------------
        # Check whether decision exists
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT decision_id
            FROM predict_decisions
            WHERE decision_id = %s
            """,
            (data.decision_id,)
        )

        decision = cursor.fetchone()


        if not decision:

            raise HTTPException(
                status_code=404,
                detail="Decision not found"
            )


        # -------------------------------------------------
        # Save selected action
        # -------------------------------------------------

        cursor.execute(
            """
            UPDATE predict_decisions
            SET action_taken = %s
            WHERE decision_id = %s
            """,
            (
                data.action_taken,
                data.decision_id
            )
        )


        conn.commit()


        return {
            "message": "Decision executed successfully",
            "decision_id": data.decision_id,
            "action_taken": data.action_taken
        }


    except HTTPException:

        raise


    except Exception as e:

        if conn:
            conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# SAVE OUTCOME
# =========================================================

@app.post("/outcomes")
def save_outcome(
    data: OutcomeRequest
):

    conn = None
    cursor = None

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


        cursor.execute(
            query,
            values
        )

        conn.commit()


        return {
            "message": "Outcome saved successfully"
        }


    except Exception as e:

        if conn:
            conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# GET OUTCOMES
# =========================================================

@app.get("/outcomes")
def get_outcomes():

    conn = None
    cursor = None

    try:

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )


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


        return outcomes


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()