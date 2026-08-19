import React, { useEffect, useState } from "react";
import axios from "axios";

function DecisionROI({ refreshTrigger = 0 }) {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);


  // =========================================================
  // FETCH ANALYTICS
  // =========================================================

  const fetchAnalytics = async () => {

    try {
      if (!analytics) {
      setLoading(true);
      }
      const response = await axios.get(
        "http://127.0.0.1:8000/analytics/summary"
      );

      

      setAnalytics(response.data);

    } catch (error) {

      console.error(
        "Decision ROI error:",
        error
      );

      setAnalytics(null);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchAnalytics();

  }, [refreshTrigger]);


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <section className="roi-section">

        <div className="roi-header">

          <h2>📈 Decision ROI</h2>

          <p>
            Loading analytics...
          </p>

        </div>

      </section>

    );

  }


  // =========================================================
  // NO DATA
  // =========================================================

  if (!analytics) {

    return (

      <section className="roi-section">

        <div className="roi-header">

          <h2>📈 Decision ROI</h2>

          <p>
            No analytics available yet.
          </p>

        </div>

      </section>

    );

  }


  // =========================================================
  // SAFE VALUES
  // =========================================================

  const totalOutcomes =
    Number(analytics.total_outcomes || 0);

  const successful =
    Number(analytics.successful_decisions || 0);

  const failed =
    Number(analytics.failed_decisions || 0);

  const successRate =
    Number(analytics.success_rate || 0);

  const averageProbability =
    Number(
      analytics.average_delay_probability || 0
    );

  const averageActualDelay =
    Number(
      analytics.average_actual_delay_from_completed || 0
    );


  // =========================================================
  // COMPONENT
  // =========================================================

  return (

    <section className="roi-section">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="roi-header">

        <div>

          <div className="roi-title">

            <div className="roi-icon">
              📈
            </div>

            <div>

              <h2>
                Decision ROI
              </h2>

              <p>
                Measure how effectively AI recommendations perform
              </p>

            </div>

          </div>

        </div>


        <div className="roi-live">
          ● Live Analytics
        </div>

      </div>


      {/* =====================================================
          KPI GRID
      ===================================================== */}

      <div className="roi-grid">


        {/* TOTAL */}

        <div className="roi-card">

          <span>
            Total Outcomes
          </span>

          <strong>
            {totalOutcomes}
          </strong>

          <small>
            Evaluated decisions
          </small>

        </div>


        {/* SUCCESS */}

        <div className="roi-card success-card">

          <span>
            Successful Decisions
          </span>

          <strong>
            {successful}
          </strong>

          <small>
            Positive outcomes
          </small>

        </div>


        {/* FAILURE */}

        <div className="roi-card danger-card">

          <span>
            Failed Decisions
          </span>

          <strong>
            {failed}
          </strong>

          <small>
            Negative outcomes
          </small>

        </div>


        {/* SUCCESS RATE */}

        <div className="roi-card">

          <span>
            Success Rate
          </span>

          <strong>
            {successRate.toFixed(1)}%
          </strong>

          <small>
            Decision effectiveness
          </small>

        </div>

      </div>


      {/* =====================================================
          PREDICTION VS ACTUAL
      ===================================================== */}

      <div className="roi-comparison">

        <div className="comparison-header">

          <div>

            <h3>
              Prediction vs Actual
            </h3>

            <p>
              Compare model confidence with real-world outcomes.
            </p>

          </div>

        </div>


        <div className="comparison-grid">


          {/* PREDICTED PROBABILITY */}

          <div className="comparison-item">

            <span>
              Average Predicted Delay Probability
            </span>

            <strong>
              {averageProbability.toFixed(2)}%
            </strong>


            <div className="comparison-bar">

              <div
                style={{
                  width: `${Math.min(
                    averageProbability,
                    100
                  )}%`
                }}
              />

            </div>

          </div>


          {/* ACTUAL DELAY */}

          <div className="comparison-item">

            <span>
              Average Actual Delay
            </span>

            <strong>
              {averageActualDelay.toFixed(2)} days
            </strong>

            <small>
              Based on recorded outcomes
            </small>

          </div>

        </div>

      </div>
  {/* =====================================================
    FINANCIAL PERFORMANCE
===================================================== */}

<div className="roi-comparison">

  <div className="comparison-header">

    <div>

      <h3>
        💰 Financial Performance
      </h3>

      <p>
        Compare expected and actual operational costs.
      </p>

    </div>

  </div>


  <div className="comparison-grid">

    {/* EXPECTED COST */}

    <div className="comparison-item">

      <span>
        Total Expected Cost
      </span>

      <strong>
        ₹{Number(
          analytics.total_expected_cost || 0
        ).toLocaleString()}
      </strong>

      <small>
        Planned optimization cost
      </small>

    </div>


    {/* ACTUAL COST */}

    <div className="comparison-item">

      <span>
        Total Actual Cost
      </span>

      <strong>
        ₹{Number(
          analytics.total_actual_cost || 0
        ).toLocaleString()}
      </strong>

      <small>
        Recorded operational cost
      </small>

    </div>


    {/* SAVINGS */}

    <div className="comparison-item">

      <span>
        Total Savings
      </span>

      <strong>
        ₹{Number(
          analytics.total_savings || 0
        ).toLocaleString()}
      </strong>

      <small>
        Expected cost − actual cost
      </small>

    </div>


    {/* ROI */}

    <div className="comparison-item">

      <span>
        Overall ROI
      </span>

      <strong>
        {Number(
          analytics.average_roi || 0
        ).toFixed(2)}%
      </strong>

      <small>
        Overall financial performance
      </small>

    </div>

  </div>

</div>  

      {/* =====================================================
          CLOSED LOOP
      ===================================================== */}

      <div className="closed-loop">

        <div className="closed-loop-icon">
          🔄
        </div>

        <div>

          <h3>
            Closed-Loop Analytics Active
          </h3>

          <p>
            The system records operational outcomes
            and uses them to evaluate future decisions.
          </p>

        </div>

      </div>


    </section>

  );

}

export default DecisionROI;