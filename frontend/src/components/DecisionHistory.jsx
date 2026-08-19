import React, { useEffect, useState } from "react";
import axios from "axios";

function DecisionHistory({
  onDecisionSelected,
  refreshTrigger = 0
})  {

  // =========================================================
  // STATE
  // =========================================================

  const [decisions, setDecisions] = useState([]);
  const [outcomes, setOutcomes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedActions, setSelectedActions] = useState({});
  const [executingId, setExecutingId] = useState(null);


  // =========================================================
  // FETCH DECISIONS + OUTCOMES
  // =========================================================

  const fetchDecisions = async (showLoading = false) => {

    try {

      if (showLoading) {
        setLoading(true);
      }

      setError("");

      const [decisionResponse, outcomeResponse] =
        await Promise.all([
          axios.get(
            "http://127.0.0.1:8000/decisions"
          ),

          axios.get(
            "http://127.0.0.1:8000/outcomes"
          )
        ]);



      setDecisions(
        decisionResponse.data
      );

      const outcomeData = Array.isArray(
        outcomeResponse.data
      )
        ? outcomeResponse.data
        : [];


      

      setOutcomes(outcomeData);


    } catch (err) {

      console.error(
        "Decision history error:",
        err
      );


      setError(
        "Unable to load decision history."
      );


    } finally {

      if (showLoading) {
        setLoading(false);
      }

    }

  };


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    fetchDecisions(true);

  }, [refreshTrigger]);


  // =========================================================
  // SELECT ACTION
  // =========================================================

  const handleActionChange = (
    decisionId,
    action
  ) => {

    setSelectedActions((previous) => ({
      ...previous,
      [decisionId]: action
    }));

  };


  // =========================================================
  // EXECUTE ACTION
  // =========================================================

  const executeAction = async (
    decisionId
  ) => {

    const action =
      selectedActions[decisionId];


    // ---------------------------------------------------------
    // Validate action
    // ---------------------------------------------------------

    if (!action) {

      alert(
        "Please select an action first."
      );

      return;

    }


    try {

      setExecutingId(decisionId);


      const response = await axios.post(
        "http://127.0.0.1:8000/decisions",
        {
          decision_id: decisionId,
          action_taken: action
        }
      );

      // =====================================================
      // SEND SELECTED DECISION ID TO OUTCOME FORM
      // =====================================================

      if (onDecisionSelected) {

        onDecisionSelected(
          decisionId
        );

      }


      alert(
        "✅ Decision executed successfully!"
      );


      // =====================================================
      // REFRESH DECISIONS + OUTCOMES
      // =====================================================

      await fetchDecisions(false);


      // =====================================================
      // CLEAR SELECTED ACTION
      // =====================================================

      setSelectedActions((previous) => {

        const updated = {
          ...previous
        };


        delete updated[decisionId];


        return updated;

      });


    } catch (err) {



      if (err.response) {

        alert(
          `❌ Failed to execute decision: ${
            err.response.data.detail ||
            "Server error"
          }`
        );

      } else {

        alert(
          "❌ Unable to connect to backend."
        );

      }

    } finally {

      setExecutingId(null);

    }

  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="decision-history-pro">

        <div className="history-pro-header">

          <div className="history-title-row">

            <div className="history-icon">
              📋
            </div>

            <div>

              <h2>
                Decision History
              </h2>

              <p>
                Loading previous decisions...
              </p>

            </div>

          </div>

        </div>


        <div className="history-loading">
          Loading decision history...
        </div>

      </div>

    );

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error) {

    return (

      <div className="decision-history-pro">

        <div className="history-pro-header">

          <div className="history-title-row">

            <div className="history-icon">
              📋
            </div>

            <div>

              <h2>
                Decision History
              </h2>

              <p>
                Track predictions, recommendations and actions.
              </p>

            </div>

          </div>

        </div>


        <div className="history-error-pro">

          <span>
            ⚠️
          </span>

          <p>
            {error}
          </p>


          <button
            onClick={fetchDecisions}
          >
            🔄 Try Again
          </button>

        </div>

      </div>

    );

  }


  // =========================================================
  // MAIN UI
  // =========================================================

  return (

    <div className="decision-history-pro">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="history-pro-header">

        <div className="history-title-row">

          <div className="history-icon">
            📋
          </div>


          <div>

            <h2>
              Decision History
            </h2>

            <p>
              Track predictions, recommendations, and actions taken.
            </p>

          </div>

        </div>


        <div className="history-total">

          <span>
            Total Decisions
          </span>

          <strong>
            {decisions.length}
          </strong>

        </div>

      </div>


      {/* =====================================================
          EMPTY
      ===================================================== */}

      {decisions.length === 0 ? (

        <div className="history-empty-pro">

          <div>
            📭
          </div>

          <h3>
            No Decision History
          </h3>

          <p>
            Your prediction decisions will appear here.
          </p>

        </div>

      ) : (


        <div className="history-table">


          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="history-table-header">

            <div>
              DECISION
            </div>

            <div>
              STATUS
            </div>

            <div>
              PROBABILITY
            </div>

            <div>
              SAVING
            </div>

            <div>
              RECOMMENDATION
            </div>

            <div>
              ACTION
            </div>

          </div>


          {/* =================================================
              TABLE ROWS
          ================================================= */}

          {decisions.map((decision) => {


            // =================================================
            // FIND MATCHING OUTCOME
            // =================================================

            const outcome = outcomes.find((item) => {
              const outcomeDecisionId =
                String(item?.decision_id ?? "").trim();

              const currentDecisionId =
                String(decision?.decision_id ?? "").trim();

              return (
                outcomeDecisionId !== "" &&
                outcomeDecisionId === currentDecisionId
              );
            });


            // =================================================
            // PREDICTION
            // =================================================

            const prediction =
              String(
                decision.prediction || ""
              ).toLowerCase();


            const isDelayed =
              prediction === "delayed";


            // =================================================
            // PROBABILITY
            // =================================================

            const probability =
              Number(
                decision.delay_probability || 0
              ) * 100;


            // =================================================
            // CONFIDENCE
            // =================================================

            const confidence =
              Number(
                decision.confidence || 0
              );


            // =================================================
            // SAVING
            // =================================================

            const saving = outcome
              ? Number(outcome.actual_saving ?? 0)
              : Number(decision.estimated_saving ?? 0);


            // =================================================
            // ACTION TAKEN
            // =================================================

            const actionTaken =
              decision.action_taken ||
              "Not selected";


            // =================================================
            // EXECUTING
            // =================================================

            const isExecuting =
              executingId ===
              decision.decision_id;


            // =================================================
            // ACTUAL COST
            // =================================================

            const actualCost =
              outcome?.actual_cost !== null &&
              outcome?.actual_cost !== undefined
                ? Number(
                    outcome.actual_cost
                  )
                : null;


            // =================================================
            // ACTUAL DELAY
            // =================================================

            const actualDelay =
              outcome?.actual_delay !== null &&
              outcome?.actual_delay !== undefined
                ? Number(
                    outcome.actual_delay
                  )
                : null;


            // =================================================
            // OUTCOME STATUS
            // =================================================

            const outcomeStatus =
              outcome?.outcome_status ||
              null;


            return (

              <div
                className="history-row"
                key={decision.decision_id}
              >


                {/* =================================================
                    DECISION
                ================================================= */}

                <div className="history-decision">

                  <span className="decision-number">

                    #{decision.decision_id}

                  </span>


                  <span className="decision-date">

                    {decision.created_at

                      ? new Date(
                          decision.created_at
                        ).toLocaleDateString()

                      : "-"

                    }

                  </span>

                </div>


                {/* =================================================
                    STATUS
                ================================================= */}

                <div>

                  <span
                    className={`status-pill ${
                      isDelayed
                        ? "delayed"
                        : "ontime"
                    }`}
                  >

                    {isDelayed
                      ? "⚠️ Delayed"
                      : "✅ On Time"
                    }

                  </span>

                </div>


                {/* =================================================
                    PROBABILITY
                ================================================= */}

                <div className="probability-cell">

                  <strong>

                    {probability.toFixed(1)}%

                  </strong>


                  <div className="mini-progress">

                    <div
                      className="mini-progress-fill"
                      style={{
                        width: `${Math.min(
                          probability,
                          100
                        )}%`
                      }}
                    />

                  </div>

                </div>


                {/* =================================================
                    SAVING
                ================================================= */}

                <div className="saving-cell">

                  ₹
                  {saving.toLocaleString(
                    "en-IN"
                  )}

                </div>


                {/* =================================================
                    RECOMMENDATION
                ================================================= */}

                <div className="recommendation-cell">

                  <span>

                    {decision.recommended_action ||
                      "-"
                    }

                  </span>

                </div>


                {/* =================================================
                    ACTION STATUS
                ================================================= */}

                <div>

                  <span
                    className={`action-pill ${
                      actionTaken ===
                      "Not selected"
                        ? "pending"
                        : "completed"
                    }`}
                  >

                    {actionTaken ===
                    "Not selected"

                      ? "⏳ Pending"

                      : `✅ ${actionTaken}`

                    }

                  </span>

                </div>


                {/* =================================================
                    EXTRA INFORMATION
                ================================================= */}

                <div className="history-row-details">


                  {/* Prediction */}

                  <span>

                    Prediction:{" "}

                    <strong>

                      {decision.prediction || "-"}

                    </strong>

                  </span>


                  {/* Confidence */}

                  <span>

                    Confidence:{" "}

                    <strong>

                      {confidence.toFixed(1)}%

                    </strong>

                  </span>


                  {/* Expected Cost */}

                  <span>

                    Expected Cost:{" "}

                    <strong>

                      ₹
                      {Number(
                        decision.expected_cost || 0
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </strong>

                  </span>


                  {/* =================================================
                      ACTUAL COST
                  ================================================= */}

                  <span>

                    Actual Cost:{" "}

                    <strong>

                      {actualCost !== null

                        ? `₹${actualCost.toLocaleString(
                            "en-IN"
                          )}`

                        : "-"

                      }

                    </strong>

                  </span>


                  {/* Expected Delay */}

                  <span>

                    Expected Delay:{" "}

                    <strong>

                      {Number(
                        decision.expected_delay_days || 0
                      )}

                      {" "}days

                    </strong>

                  </span>


                  {/* =================================================
                      ACTUAL DELAY
                  ================================================= */}

                  <span>

                    Actual Delay:{" "}

                    <strong>

                      {actualDelay !== null

                        ? `${actualDelay} days`

                        : "-"

                      }

                    </strong>

                  </span>


                  {/* =================================================
                      OUTCOME STATUS
                  ================================================= */}

                  <span>

                    Outcome:{" "}

                    <strong>

                      {outcomeStatus || "-"}

                    </strong>

                  </span>


                  {/* Action */}

                  <span>

                    Action:{" "}

                    <strong>

                      {actionTaken}

                    </strong>

                  </span>


                  {/* Created */}

                  <span>

                    Created:{" "}

                    <strong>

                      {decision.created_at

                        ? new Date(
                            decision.created_at
                          ).toLocaleString()

                        : "-"

                      }

                    </strong>

                  </span>


                </div>


                {/* =================================================
                    EXECUTE ACTION
                ================================================= */}

                {actionTaken ===
                  "Not selected" && (

                  <div className="execute-section">


                    <label>
                      Select Action
                    </label>


                    <select
                      value={
                        selectedActions[
                          decision.decision_id
                        ] || ""
                      }

                      onChange={(e) =>
                        handleActionChange(
                          decision.decision_id,
                          e.target.value
                        )
                      }
                    >

                      <option value="">
                        -- Select Action --
                      </option>


                      <option value="Air Freight">
                        ✈️ Air Freight
                      </option>


                      <option value="Secondary Supplier">
                        🏭 Secondary Supplier
                      </option>


                      <option value="Delay Product Launch">
                        📅 Delay Product Launch
                      </option>

                    </select>


                    <button
                      className="execute-button"

                      onClick={() =>
                        executeAction(
                          decision.decision_id
                        )
                      }

                      disabled={isExecuting}
                    >

                      {isExecuting

                        ? "⏳ Executing..."

                        : "⚡ Execute Action"

                      }

                    </button>


                  </div>

                )}

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}

export default DecisionHistory;