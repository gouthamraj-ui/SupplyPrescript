
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


class OptimizationRequest(BaseModel):
    shipment_value: float
    lead_time: float
    stock_quantity: int
    supplier_avg_delay: float


class OutcomeRequest(BaseModel):
    decision_id: int
    outcome_status: str
    actual_delay: float
    actual_cost: float
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
# DECISION ROI ANALYTICS
# =========================================================

@app.get("/analytics/decision-roi")
def get_decision_roi():

    conn = None
    cursor = None

    try:

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute("""
            SELECT

                COUNT(o.outcome_id)
                    AS total_outcomes,

                COALESCE(
                    SUM(
                        CASE
                            WHEN o.outcome_status = 'Success'
                            THEN 1
                            ELSE 0
                        END
                    ),
                    0
                ) AS successful_decisions,

                COALESCE(
                    SUM(
                        CASE
                            WHEN o.outcome_status = 'Failure'
                            THEN 1
                            ELSE 0
                        END
                    ),
                    0
                ) AS failed_decisions,

                COALESCE(
                    AVG(d.confidence),
                    0
                ) AS average_predicted_probability,

                COALESCE(
                    AVG(o.actual_delay),
                    0
                ) AS average_actual_delay

            FROM post_outcomes o

            JOIN predict_decisions d
                ON o.decision_id = d.decision_id
        """)

        result = cursor.fetchone()

        total_outcomes = int(
            result["total_outcomes"] or 0
        )

        successful_decisions = int(
            result["successful_decisions"] or 0
        )

        failed_decisions = int(
            result["failed_decisions"] or 0
        )

        # ---------------------------------------------
        # Calculate success rate
        # ---------------------------------------------

        if total_outcomes > 0:

            success_rate = (
                successful_decisions
                / total_outcomes
            ) * 100

        else:

            success_rate = 0


        # ---------------------------------------------
        # Response
        # ---------------------------------------------

        return {

            "total_outcomes":
                total_outcomes,

            "successful_decisions":
                successful_decisions,

            "failed_decisions":
                failed_decisions,

            "success_rate":
                round(success_rate, 2),

            "average_predicted_probability":
                round(
                    float(
                        result[
                            "average_predicted_probability"
                        ] or 0
                    ),
                    2
                ),

            "average_actual_delay":
                round(
                    float(
                        result[
                            "average_actual_delay"
                        ] or 0
                    ),
                    2
                )
        }


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
# PREDICTION API
# =========================================================

@app.post("/predict")
def predict(data: Shipment):

    conn = None
    cursor = None

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

        delay_probability = round(
            float(probability),
            4
        )

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
                estimated_saving,
                expected_cost,
                expected_delay_days
            )
            VALUES (
                %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s
            )
        """


        values = (
            data.shipment_quantity,
            data.unit_price,
            data.lead_time,
            data.stock_quantity,
            data.rating,
            data.shipment_value,
            data.supplier_avg_delay,

            "Delayed"
            if prediction == 1
            else "On Time",

            delay_probability,
            confidence,

            recommendation["recommended_action"],

            recommendation["estimated_saving"],

            optimization["best_cost"],

            optimization["best_delay_days"]
        )


        cursor.execute(
            query,
            values
        )

        conn.commit()


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
# OPTIMIZATION API
# =========================================================

@app.post("/optimize")
def optimize(data: OptimizationRequest):

    try:

        result = optimize_shipment(
            shipment_value=data.shipment_value,
            lead_time=data.lead_time,
            stock_quantity=data.stock_quantity,
            supplier_avg_delay=data.supplier_avg_delay
        )

        return result

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
                expected_cost,
                expected_delay_days,
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
def execute_decision(data: DecisionRequest):

    conn = None
    cursor = None

    try:

        conn = get_connection()

        cursor = conn.cursor(dictionary=True)

        # -------------------------------------------------
        # Get original decision details
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                decision_id,
                shipment_value,
                lead_time,
                stock_quantity,
                supplier_avg_delay
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
        # Run optimization for this shipment
        # -------------------------------------------------

        optimization = optimize_shipment(
            shipment_value=float(
                decision["shipment_value"]
            ),

            lead_time=float(
                decision["lead_time"]
            ),

            stock_quantity=int(
                decision["stock_quantity"]
            ),

            supplier_avg_delay=float(
                decision["supplier_avg_delay"]
            )
        )

        # -------------------------------------------------
        # Find the action selected by the user
        # -------------------------------------------------

        selected_option = None

        for option in optimization["alternatives"]:

            if option["action"] == data.action_taken:

                selected_option = option

                break

        # -------------------------------------------------
        # Validate action
        # -------------------------------------------------

        if selected_option is None:

            raise HTTPException(
                status_code=400,
                detail=f"Invalid action: {data.action_taken}"
            )

        # -------------------------------------------------
        # Save decision + expected values
        # -------------------------------------------------

        cursor.execute(
            """
            UPDATE predict_decisions
            SET
                action_taken = %s,
                expected_cost = %s,
                expected_delay_days = %s
            WHERE decision_id = %s
            """,
            (
                data.action_taken,
                selected_option["cost"],
                selected_option["delay_days"],
                data.decision_id
            )
        )

        conn.commit()

        # -------------------------------------------------
        # Response
        # -------------------------------------------------

        return {
            "message": "Decision executed successfully",

            "decision_id": data.decision_id,

            "action_taken": data.action_taken,

            "expected_cost": selected_option["cost"],

            "expected_delay_days": selected_option["delay_days"],

            "expected_risk": selected_option["risk"]
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

        cursor = conn.cursor(
            dictionary=True
        )

        # -------------------------------------------------
        # Get original decision
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                decision_id,
                expected_cost,
                expected_delay_days
            FROM predict_decisions
            WHERE decision_id = %s
            """,
            (data.decision_id,)
        )

        decision = cursor.fetchone()

        if not decision:
            raise HTTPException(
                status_code=404,
                detail="Decision not found."
            )

        # -------------------------------------------------
        # Prevent duplicate outcome
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT outcome_id
            FROM post_outcomes
            WHERE decision_id = %s
            """,
            (data.decision_id,)
        )

        existing_outcome = cursor.fetchone()

        if existing_outcome:
            raise HTTPException(
                status_code=400,
                detail="An outcome has already been recorded for this decision."
            )

        # -------------------------------------------------
        # Expected values
        # -------------------------------------------------

        expected_cost = float(
            decision["expected_cost"] or 0
        )

        expected_delay_days = float(
            decision["expected_delay_days"] or 0
        )

        # -------------------------------------------------
        # Actual values
        # -------------------------------------------------

        actual_cost = float(
            data.actual_cost
        )

        actual_delay = float(
            data.actual_delay
        )
       

        # -------------------------------------------------
        # Calculate actual saving
        # -------------------------------------------------

        actual_saving = (
            expected_cost - actual_cost
        )

        # -------------------------------------------------
        # Calculate ROI
        # -------------------------------------------------

        if expected_cost > 0:

            roi_percentage = (
                actual_saving
                / expected_cost
            ) * 100

        else:

            roi_percentage = 0

        # -------------------------------------------------
        # Insert outcome
        # -------------------------------------------------

        query = """
            INSERT INTO post_outcomes
            (
                decision_id,
                outcome_status,
                actual_delay,
                comments,
                actual_cost,
                actual_saving,
                roi_percentage
            )
            VALUES (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
            )
        """

        values = (
            data.decision_id,
            data.outcome_status,
            actual_delay,
            data.comments,
            actual_cost,
            actual_saving,
            roi_percentage
        )

        cursor.execute(
            query,
            values
        )

        conn.commit()

        # -------------------------------------------------
        # Response
        # -------------------------------------------------

        return {
            "message": "Outcome saved successfully",
            "decision_id": data.decision_id,
            "expected_cost": expected_cost,
            "expected_delay_days": expected_delay_days,
            "actual_cost": actual_cost,
            "actual_delay": actual_delay,
            "actual_saving": round(
                actual_saving,
                2
            ),
            "roi_percentage": round(
                roi_percentage,
                2
            )
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
                d.estimated_saving,
                d.expected_cost,
                d.expected_delay_days,

                o.outcome_status,
                o.actual_delay,

                o.actual_cost,
                o.actual_saving,
                o.roi_percentage,

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

@app.get("/analytics/summary")
def get_analytics_summary():

    conn = None
    cursor = None

    try:

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # =================================================
        # 1. TOTAL DECISIONS
        # =================================================

        cursor.execute("""
            SELECT COUNT(*) AS total_decisions
            FROM predict_decisions
        """)

        total_decisions = (
            cursor.fetchone()["total_decisions"] or 0
        )


        # =================================================
        # 2. OUTCOME STATISTICS
        # =================================================

        cursor.execute("""
            SELECT

                COUNT(*) AS total_outcomes,

                SUM(
                    CASE
                        WHEN outcome_status = 'Success'
                        THEN 1
                        ELSE 0
                    END
                ) AS successful_decisions,

                SUM(
                    CASE
                        WHEN outcome_status = 'Failure'
                        THEN 1
                        ELSE 0
                    END
                ) AS failed_decisions,

                COALESCE(
                    AVG(actual_delay),
                    0
                ) AS average_actual_delay

            FROM post_outcomes
        """)

        outcome_stats = cursor.fetchone()


        total_outcomes = (
            outcome_stats["total_outcomes"] or 0
        )

        successful_decisions = (
            outcome_stats["successful_decisions"] or 0
        )

        failed_decisions = (
            outcome_stats["failed_decisions"] or 0
        )


        # =================================================
        # 3. SUCCESS RATE
        # =================================================

        if total_outcomes > 0:

            success_rate = (
                successful_decisions
                / total_outcomes
            ) * 100

        else:

            success_rate = 0


        # =================================================
        # 4. FINANCIAL STATISTICS
        # =================================================

        cursor.execute("""
            SELECT

                COALESCE(
                    SUM(p.expected_cost),
                    0
                ) AS total_expected_cost,

                COALESCE(
                    SUM(o.actual_cost),
                    0
                ) AS total_actual_cost,

                COALESCE(
                    SUM(
                        p.expected_cost
                        - o.actual_cost
                    ),
                    0
                ) AS total_savings

            FROM post_outcomes o

            INNER JOIN predict_decisions p
                ON o.decision_id = p.decision_id

            WHERE p.expected_cost IS NOT NULL
              AND p.expected_cost > 0
        """)

        financial_stats = cursor.fetchone()


        total_expected_cost = float(
            financial_stats["total_expected_cost"] or 0
        )

        total_actual_cost = float(
            financial_stats["total_actual_cost"] or 0
        )

        total_savings = (
            total_expected_cost
            - total_actual_cost
        )


        # =================================================
        # 5. OVERALL ROI
        # =================================================

        if total_expected_cost > 0:

            average_roi = (
                total_savings
                / total_expected_cost
            ) * 100

        else:

            average_roi = 0


        # =================================================
        # 6. PREDICTION STATISTICS
        # =================================================

        cursor.execute("""
            SELECT

                COUNT(*) AS total_predictions,

                SUM(
                    CASE
                        WHEN prediction = 'Delayed'
                        THEN 1
                        ELSE 0
                    END
                ) AS delayed_predictions,

                SUM(
                    CASE
                        WHEN prediction = 'On Time'
                        THEN 1
                        ELSE 0
                    END
                ) AS on_time_predictions,

                COALESCE(
                    AVG(delay_probability),
                    0
                ) AS average_delay_probability

            FROM predict_decisions
        """)

        prediction_stats = cursor.fetchone()


        # =================================================
        # 7. COST COMPARISON
        # =================================================

        cursor.execute("""
            SELECT

                COALESCE(
                    SUM(p.expected_cost),
                    0
                ) AS total_expected_cost,

                COALESCE(
                    SUM(o.actual_cost),
                    0
                ) AS total_actual_cost

            FROM post_outcomes o

            INNER JOIN predict_decisions p
                ON o.decision_id = p.decision_id

            WHERE p.expected_cost IS NOT NULL
              AND p.expected_cost > 0
        """)

        cost_stats = cursor.fetchone()


        # =================================================
        # 8. DELAY COMPARISON
        # =================================================

        cursor.execute("""
            SELECT

                COALESCE(
                    AVG(p.expected_delay_days),
                    0
                ) AS average_expected_delay,

                COALESCE(
                    AVG(o.actual_delay),
                    0
                ) AS average_actual_delay

            FROM post_outcomes o

            INNER JOIN predict_decisions p
                ON o.decision_id = p.decision_id

            WHERE p.expected_cost IS NOT NULL
              AND p.expected_cost > 0
        """)

        delay_stats = cursor.fetchone()


        # =================================================
        # 9. RESPONSE
        # =================================================

        return {

            # ---------------------------------------------
            # Decisions
            # ---------------------------------------------

            "total_decisions": total_decisions,


            # ---------------------------------------------
            # Outcomes
            # ---------------------------------------------

            "total_outcomes": total_outcomes,

            "successful_decisions": successful_decisions,

            "failed_decisions": failed_decisions,

            "success_rate": round(
                float(success_rate),
                2
            ),


            # ---------------------------------------------
            # Financial
            # ---------------------------------------------

            "total_savings": round(
                total_savings,
                2
            ),

            "average_roi": round(
                average_roi,
                2
            ),


            # ---------------------------------------------
            # Actual Delay
            # ---------------------------------------------

            "average_actual_delay": round(
                float(
                    outcome_stats[
                        "average_actual_delay"
                    ] or 0
                ),
                2
            ),


            # ---------------------------------------------
            # Predictions
            # ---------------------------------------------

            "total_predictions": (
                prediction_stats[
                    "total_predictions"
                ] or 0
            ),

            "delayed_predictions": (
                prediction_stats[
                    "delayed_predictions"
                ] or 0
            ),

            "on_time_predictions": (
                prediction_stats[
                    "on_time_predictions"
                ] or 0
            ),

            "average_delay_probability": round(
                float(
                    prediction_stats[
                        "average_delay_probability"
                    ] or 0
                ) * 100,
                2
            ),


            # ---------------------------------------------
            # Cost
            # ---------------------------------------------

            "total_expected_cost": round(
                float(
                    cost_stats[
                        "total_expected_cost"
                    ] or 0
                ),
                2
            ),

            "total_actual_cost": round(
                float(
                    cost_stats[
                        "total_actual_cost"
                    ] or 0
                ),
                2
            ),


            # ---------------------------------------------
            # Delay
            # ---------------------------------------------

            "average_expected_delay": round(
                float(
                    delay_stats[
                        "average_expected_delay"
                    ] or 0
                ),
                2
            ),

            "average_actual_delay_from_completed": round(
                float(
                    delay_stats[
                        "average_actual_delay"
                    ] or 0
                ),
                2
            )
        }


    # =================================================
    # ERROR HANDLING
    # =================================================

    except Exception as e:

        if conn:
            conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


    # =================================================
    # CLOSE CONNECTION
    # =================================================

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()