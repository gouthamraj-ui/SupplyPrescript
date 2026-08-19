import React, { useState } from "react";
import axios from "axios";

function OptimizationPanel({ shipmentData }) {

  const [optimization, setOptimization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runOptimization = async () => {

    

    if (!shipmentData) {
      setError("Please run prediction first.");
      return;
    }

    const data = {
      shipment_value: Number(shipmentData.shipment_value),
      lead_time: Number(shipmentData.lead_time),
      stock_quantity: Number(shipmentData.stock_quantity),
      supplier_avg_delay: Number(shipmentData.supplier_avg_delay)
    };

    

    if (
      !Number.isFinite(data.shipment_value) ||
      !Number.isFinite(data.lead_time) ||
      !Number.isFinite(data.stock_quantity) ||
      !Number.isFinite(data.supplier_avg_delay)
    ) {
      setError(
        "Invalid optimization data. Please check the prediction inputs."
      );
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://127.0.0.1:8000/optimize",
        data
      );

    
      setOptimization(response.data);

    } catch (err) {

      console.error("Optimization error:", err);

      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {

        setError(
          detail.map((item) => item.msg).join(", ")
        );

      } else {

        setError(
          detail || "Unable to run optimization."
        );

      }

    } finally {

      setLoading(false);

    }
  };


  return (
    <section className="optimization-panel">


      {/* =========================================
          HEADER
      ========================================== */}

      <div className="optimization-header">

        <div className="optimization-title">

          <div className="optimization-icon">
            🧠
          </div>

          <div>

            <h2>
              Prescriptive Optimization
            </h2>

            <p>
              Find the best supply-chain action based on
              cost, delay and risk.
            </p>

          </div>

        </div>


        <button
          type="button"
          className="optimize-button"
          onClick={runOptimization}
          disabled={loading}
        >

          {loading
            ? "⏳ Optimizing..."
            : "⚡ Run Optimization"
          }

        </button>

      </div>


      {/* =========================================
          ERROR
      ========================================== */}

      {error && (

        <div className="optimization-error">
          ⚠️ {error}
        </div>

      )}


      {/* =========================================
          EMPTY STATE
      ========================================== */}

      {!optimization && !loading && (

        <div className="optimization-empty">

          <div className="optimization-empty-icon">
            🧮
          </div>

          <h3>
            Ready to Optimize
          </h3>

          <p>
            Run the optimization engine to compare
            Air Freight, Secondary Supplier and
            Delay Product Launch.
          </p>

        </div>

      )}


      {/* =========================================
          LOADING
      ========================================== */}

      {loading && (

        <div className="optimization-loading">

          <div className="loader-circle">
            ⚙️
          </div>

          <h3>
            Optimization Engine Running
          </h3>

          <p>
            Evaluating cost, speed, budget and
            operational constraints...
          </p>

        </div>

      )}


      {/* =========================================
          RESULT
      ========================================== */}

      {optimization && !loading && (

        <>

          {/* =====================================
              OPTIMAL RECOMMENDATION
          ====================================== */}

          <div className="optimal-result">

            <div>

              <span className="optimal-label">
                ⭐ OPTIMAL RECOMMENDATION
              </span>

              <h3>
                {optimization.best_action}
              </h3>

              <p>
                Lowest-cost feasible solution based
                on current constraints.
              </p>

            </div>


            <div className="optimal-cost">

              <span>
                Objective Cost
              </span>

              <strong>
                ₹
                {Number(
                  optimization.best_cost || 0
                ).toLocaleString("en-IN")}
              </strong>

            </div>

          </div>


          {/* =====================================
              SUMMARY
          ====================================== */}

          <div className="optimization-summary">

            <div>

              <span>
                Best Delay
              </span>

              <strong>
                {optimization.best_delay_days} days
              </strong>

            </div>

            <div>

              <span>
                Risk Level
              </span>

              <strong
                className={`risk-${optimization.best_risk?.toLowerCase()}`}
              >
                {optimization.best_risk}
              </strong>

            </div>

          </div>


          {/* =====================================
              ALTERNATIVES HEADER
          ====================================== */}

          <div className="alternatives-header">

            <div>

              <h3>
                Recommended Alternatives
              </h3>

              <p>
                Compare available operational strategies.
              </p>

            </div>

          </div>


          {/* =====================================
              ALTERNATIVE CARDS
          ====================================== */}

          <div className="optimization-cards">

            {optimization.alternatives?.map(
              (alternative, index) => {

                const isRecommended =
                  alternative.action ===
                  optimization.best_action;

                return (

                  <div
                    className={`optimization-card ${
                      isRecommended
                        ? "recommended"
                        : ""
                    }`}
                    key={index}
                  >

                    {isRecommended && (

                      <div className="recommended-badge">
                        ⭐ Recommended
                      </div>

                    )}


                    <div className="alternative-icon">

                      {alternative.action ===
                      "Air Freight"
                        ? "✈️"
                        : alternative.action ===
                          "Secondary Supplier"
                        ? "🏭"
                        : "⏳"}

                    </div>


                    <h4>
                      {alternative.action}
                    </h4>


                    <p className="alternative-reason">

                      {alternative.action ===
                      "Air Freight"
                        ? "Fastest recovery option for urgent shipments."
                        : alternative.action ===
                          "Secondary Supplier"
                        ? "Alternative supplier option to reduce disruption."
                        : "Delay product launch to reduce immediate logistics pressure."
                      }

                    </p>


                    <div className="alternative-metrics">

                      <div>

                        <span>
                          Cost
                        </span>

                        <strong>
                          ₹
                          {Number(
                            alternative.cost || 0
                          ).toLocaleString("en-IN")}
                        </strong>

                      </div>


                      <div>

                        <span>
                          Delay
                        </span>

                        <strong>
                          {alternative.delay_days} days
                        </strong>

                      </div>


                      <div>

                        <span>
                          Risk
                        </span>

                        <strong
                          className={`risk-${alternative.risk?.toLowerCase()}`}
                        >
                          {alternative.risk}
                        </strong>

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>


          {/* =====================================
              OPTIMIZATION INFORMATION
          ====================================== */}

          <div className="constraints-section">

            <div className="constraints-header">

              <h3>
                ⚙️ Optimization Information
              </h3>

              <span className="optimal-status">
                ✓ Feasible
              </span>

            </div>


            <div className="constraints-grid">

              <div>

                <span>
                  Maximum Budget
                </span>

                <strong>
                  ₹20,000
                </strong>

              </div>


              <div>

                <span>
                  Selected Action
                </span>

                <strong>
                  {optimization.best_action}
                </strong>

              </div>


              <div>

                <span>
                  Selected Risk
                </span>

                <strong
                  className={`risk-${optimization.best_risk?.toLowerCase()}`}
                >
                  {optimization.best_risk}
                </strong>

              </div>

            </div>

          </div>

        </>

      )}

    </section>
  );
}

export default OptimizationPanel;