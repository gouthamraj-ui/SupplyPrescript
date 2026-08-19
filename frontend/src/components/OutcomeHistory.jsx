import React, { useEffect, useState } from "react";
import axios from "axios";

function OutcomeHistory({ refreshTrigger = 0}) {
  const [outcomes, setOutcomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOutcomes = async () => {
    try {
      if (outcomes.length === 0){
      setLoading(true);
      }
      const response = await axios.get(
        "http://127.0.0.1:8000/outcomes"
      );

       

      setOutcomes(response.data);
    } catch (error) {
      console.error("Outcome history error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutcomes();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <section className="outcome-history-pro">
        <h2>📊 Outcome Evaluation</h2>
        <p>Loading outcome data...</p>
      </section>
    );
  }

  const total = outcomes.length;

  const successful = outcomes.filter(
    (item) =>
      item.outcome_status?.toLowerCase() === "success"
  ).length;

  const failed = outcomes.filter(
    (item) =>
      item.outcome_status?.toLowerCase() === "failure"
  ).length;

  const successRate =
    total > 0
      ? ((successful / total) * 100).toFixed(1)
      : "0.0";

  const averageDelay =
    total > 0
      ? (
          outcomes.reduce(
            (sum, item) =>
              sum + Number(item.actual_delay || 0),
            0
          ) / total
        ).toFixed(1)
      : "0.0";

  return (
    <section className="outcome-history-pro">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="outcome-history-header">

        <div className="outcome-title-row">

          <div className="outcome-icon">
            📊
          </div>

          <div>

            <h2>
              Outcome Evaluation
            </h2>

            <p>
              Measure how well operational decisions performed
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          KPI CARDS
      ====================================== */}

      <div className="outcome-kpi-grid">

        <div className="outcome-kpi">

          <span>
            Total Outcomes
          </span>

          <strong>
            {total}
          </strong>

        </div>


        <div className="outcome-kpi success">

          <span>
            Successful Decisions
          </span>

          <strong>
            {successful}
          </strong>

        </div>


        <div className="outcome-kpi danger">

          <span>
            Failed Decisions
          </span>

          <strong>
            {failed}
          </strong>

        </div>


        <div className="outcome-kpi">

          <span>
            Success Rate
          </span>

          <strong>
            {successRate}%
          </strong>

        </div>


        <div className="outcome-kpi">

          <span>
            Average Actual Delay
          </span>

          <strong>
            {averageDelay} days
          </strong>

        </div>

      </div>


      {/* =====================================
          OUTCOME TABLE
      ====================================== */}

      {outcomes.length === 0 ? (

        <div className="outcome-empty">

          <div>
            📭
          </div>

          <h3>
            No Outcomes Recorded
          </h3>

          <p>
            Execute a decision and record its actual outcome.
          </p>

        </div>

      ) : (

        <div className="outcome-table">

          {/* TABLE HEADER */}

          <div className="outcome-table-header">

            <div>
              DECISION
            </div>

            <div>
              RESULT
            </div>

            <div>
              EXPECTED COST
            </div>

            <div>
              ACTUAL COST
            </div>

            <div>
              SAVING
            </div>

            <div>
              ROI
            </div>

            <div>
              DELAY
            </div>

          </div>


          {/* TABLE ROWS */}

          {outcomes.map((outcome) => {

            const status =
              outcome.outcome_status?.toLowerCase();

            return (

              <div
                className="outcome-row"
                key={outcome.outcome_id}
              >

                {/* DECISION */}

                <div>

                  <strong>
                    #{outcome.decision_id}
                  </strong>

                </div>


                {/* RESULT */}

                <div>

                  <span
                    className={
                      status === "success"
                        ? "result-pill success"
                        : "result-pill failed"
                    }
                  >

                    {status === "success"
                      ? "✓ Success"
                      : "✕ Failure"}

                  </span>

                </div>


                {/* EXPECTED COST */}

                <div className="outcome-money">

                  ₹
                  {Number(
                    outcome.expected_cost || 0
                  ).toLocaleString("en-IN")}

                </div>


                {/* ACTUAL COST */}

                <div className="outcome-money">

                  ₹
                  {Number(
                    outcome.actual_cost || 0
                  ).toLocaleString("en-IN")}

                </div>


                {/* SAVING */}

                <div
                  className={
                    Number(outcome.actual_saving) >= 0
                      ? "outcome-saving positive"
                      : "outcome-saving negative"
                  }
                >

                  ₹
                  {Number(
                    outcome.actual_saving || 0
                  ).toLocaleString("en-IN")}

                </div>


                {/* ROI */}

                <div
                  className={
                    Number(outcome.roi_percentage) >= 0
                      ? "outcome-roi positive"
                      : "outcome-roi negative"
                  }
                >

                  {Number(
                    outcome.roi_percentage || 0
                  ).toFixed(2)}
                  %

                </div>


                {/* DELAY */}

                <div className="outcome-delay">

                  <span>
                    Expected:{" "}
                    {Number(
                      outcome.expected_delay_days || 0
                    )} days
                  </span>

                  <span>
                    Actual:{" "}
                    {Number(
                      outcome.actual_delay || 0
                    )} days
                  </span>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </section>
  );
}

export default OutcomeHistory;