import React, { useEffect, useState } from "react";
import axios from "axios";

function DecisionHistory() {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedActions, setSelectedActions] = useState({});
  const [executingId, setExecutingId] = useState(null);

  // =========================
  // FETCH DECISIONS
  // =========================

  const fetchDecisions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://127.0.0.1:8000/decisions"
      );

      console.log("Decision API:", response.data);

      setDecisions(response.data);
    } catch (err) {
      console.error("Decision history error:", err);
      setError("Unable to load decision history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecisions();
  }, []);

  // =========================
  // SELECT ACTION
  // =========================

  const handleActionChange = (decisionId, action) => {
    setSelectedActions((previous) => ({
      ...previous,
      [decisionId]: action,
    }));
  };

  // =========================
  // EXECUTE ACTION
  // =========================

  const executeAction = async (decisionId) => {
    const action = selectedActions[decisionId];

    if (!action) {
      alert("Please select an action first.");
      return;
    }

    try {
      setExecutingId(decisionId);

      const response = await axios.post(
        "http://127.0.0.1:8000/decisions",
        {
          decision_id: decisionId,
          action_taken: action,
        }
      );

      console.log("Execute Action Response:", response.data);

      alert("✅ Decision executed successfully!");

      await fetchDecisions();

      setSelectedActions((previous) => {
        const updated = { ...previous };
        delete updated[decisionId];
        return updated;
      });
    } catch (err) {
      console.error("Execute action error:", err);

      if (err.response) {
        alert(
          `❌ Failed to execute decision: ${
            err.response.data.detail || "Server error"
          }`
        );
      } else {
        alert("❌ Unable to connect to backend.");
      }
    } finally {
      setExecutingId(null);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="decision-history-pro">
        <div className="history-pro-header">
          <div className="history-title-row">
            <div className="history-icon">📋</div>

            <div>
              <h2>Decision History</h2>
              <p>Loading previous decisions...</p>
            </div>
          </div>
        </div>

        <div className="history-loading">
          Loading decision history...
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="decision-history-pro">
        <div className="history-pro-header">
          <div className="history-title-row">
            <div className="history-icon">📋</div>

            <div>
              <h2>Decision History</h2>
              <p>Track predictions, recommendations and actions.</p>
            </div>
          </div>
        </div>

        <div className="history-error-pro">
          <span>⚠️</span>
          <p>{error}</p>

          <button onClick={fetchDecisions}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <div className="decision-history-pro">

      {/* HEADER */}
      <div className="history-pro-header">

        <div className="history-title-row">

          <div className="history-icon">
            📋
          </div>

          <div>
            <h2>Decision History</h2>

            <p>
              Track predictions, recommendations, and actions taken.
            </p>
          </div>

        </div>

        <div className="history-total">
          <span>Total Decisions</span>
          <strong>{decisions.length}</strong>
        </div>

      </div>

      {/* EMPTY */}
      {decisions.length === 0 ? (

        <div className="history-empty-pro">

          <div>📭</div>

          <h3>No Decision History</h3>

          <p>
            Your prediction decisions will appear here.
          </p>

        </div>

      ) : (

        <div className="history-table">

          {/* TABLE HEADER */}

          <div className="history-table-header">

            <div>DECISION</div>

            <div>STATUS</div>

            <div>PROBABILITY</div>

            <div>SAVING</div>

            <div>RECOMMENDATION</div>

            <div>ACTION</div>

          </div>

          {/* TABLE ROWS */}

          {decisions.map((decision) => {

            const prediction =
              String(decision.prediction || "").toLowerCase();

            const isDelayed =
              prediction === "delayed";

            const probability =
              Number(decision.delay_probability || 0) * 100;

            const confidence =
              Number(decision.confidence || 0);

            const saving =
              Number(decision.estimated_saving || 0);

            const actionTaken =
              decision.action_taken || "Not selected";

            const isExecuting =
              executingId === decision.decision_id;

            return (

              <div
                className="history-row"
                key={decision.decision_id}
              >

                {/* DECISION */}

                <div className="history-decision">

                  <span className="decision-number">
                    #{decision.decision_id}
                  </span>

                  <span className="decision-date">
                    {decision.created_at
                      ? new Date(
                          decision.created_at
                        ).toLocaleDateString()
                      : "-"}
                  </span>

                </div>

                {/* STATUS */}

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
                      : "✅ On Time"}

                  </span>

                </div>

                {/* PROBABILITY */}

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
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* SAVING */}

                <div className="saving-cell">

                  ₹
                  {saving.toLocaleString("en-IN")}

                </div>

                {/* RECOMMENDATION */}

                <div className="recommendation-cell">

                  <span>
                    {decision.recommended_action || "-"}
                  </span>

                </div>

                {/* ACTION */}

                <div>

                  <span
                    className={`action-pill ${
                      actionTaken === "Not selected"
                        ? "pending"
                        : "completed"
                    }`}
                  >

                    {actionTaken === "Not selected"
                      ? "⏳ Pending"
                      : "✅ Done"}

                  </span>

                </div>

                {/* EXTRA INFORMATION */}

                <div className="history-row-details">

                  <span>
                    Prediction:{" "}
                    <strong>
                      {decision.prediction || "-"}
                    </strong>
                  </span>

                  <span>
                    Confidence:{" "}
                    <strong>
                      {confidence.toFixed(1)}%
                    </strong>
                  </span>

                  <span>
                    Action:{" "}
                    <strong>
                      {actionTaken}
                    </strong>
                  </span>

                  <span>
                    Created:{" "}
                    <strong>
                      {decision.created_at
                        ? new Date(
                            decision.created_at
                          ).toLocaleString()
                        : "-"}
                    </strong>
                  </span>

                </div>

                {/* EXECUTE ACTION */}

                {actionTaken === "Not selected" && (

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

                      <option value="Change Supplier">
                        🔄 Change Supplier
                      </option>

                      <option value="Increase Inventory">
                        📦 Increase Inventory
                      </option>

                      <option value="Use Express Shipping">
                        🚚 Use Express Shipping
                      </option>

                      <option value="Review Supplier Performance">
                        📊 Review Supplier Performance
                      </option>

                      <option value="Monitor Shipment">
                        👀 Monitor Shipment
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
                        : "⚡ Execute Action"}

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