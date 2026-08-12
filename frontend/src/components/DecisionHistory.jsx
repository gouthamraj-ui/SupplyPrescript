import React, { useEffect, useState } from "react";
import axios from "axios";

function DecisionHistory() {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="decision-history">
        <div className="history-header">
          <h2>📋 Decision History</h2>
          <p>Loading previous decisions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="decision-history">
        <div className="history-header">
          <h2>📋 Decision History</h2>
        </div>

        <div className="history-error">
          <div className="error-icon">⚠️</div>

          <p>{error}</p>

          <button onClick={fetchDecisions}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="decision-history">
      <div className="history-header">
        <div>
          <h2>📋 Decision History</h2>
          <p>
            Track predictions, recommendations, and actions taken.
          </p>
        </div>

        <div className="decision-count">
          {decisions.length} Decisions
        </div>
      </div>

      {decisions.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon">📭</div>
          <h3>No Decision History</h3>
          <p>
            Your prediction decisions will appear here.
          </p>
        </div>
      ) : (
        <div className="decision-list">
          {decisions.map((decision) => {
            const isDelayed =
              decision.prediction?.toLowerCase() === "delayed";

            const actionTaken =
              decision.action_taken || "Not selected";

            return (
              <div
                className="decision-card"
                key={decision.decision_id}
              >
                {/* Card Header */}
                <div className="decision-card-header">
                  <div>
                    <span className="decision-label">
                      Decision
                    </span>

                    <h3>
                      #{decision.decision_id}
                    </h3>
                  </div>

                  <span
                    className={`prediction-badge ${
                      isDelayed
                        ? "prediction-delayed"
                        : "prediction-ontime"
                    }`}
                  >
                    {isDelayed ? "⚠️ Delayed" : "✅ On Time"}
                  </span>
                </div>

                {/* Main Information */}
                <div className="decision-info-grid">

                  <div className="info-item">
                    <span className="info-label">
                      Prediction
                    </span>

                    <span className="info-value">
                      {decision.prediction || "-"}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">
                      Recommended Action
                    </span>

                    <span className="info-value action-value">
                      {decision.recommended_action || "-"}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">
                      Delay Probability
                    </span>

                    <span className="info-value">
                      {(
                        Number(
                          decision.delay_probability || 0
                        ) * 100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">
                      Confidence
                    </span>

                    <span className="info-value">
                      {Number(
                        decision.confidence || 0
                      ).toFixed(1)}
                      %
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">
                      Estimated Saving
                    </span>

                    <span className="info-value saving-value">
                      ₹
                      {Number(
                        decision.estimated_saving || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">
                      Created
                    </span>

                    <span className="info-value">
                      {decision.created_at
                        ? new Date(
                            decision.created_at
                          ).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                </div>

                {/* Action Taken */}
                <div className="action-taken-section">
                  <span className="info-label">
                    Action Taken
                  </span>

                  <span
                    className={
                      actionTaken === "Not selected"
                        ? "action-badge pending"
                        : "action-badge completed"
                    }
                  >
                    {actionTaken === "Not selected"
                      ? "⏳ Not selected"
                      : `✅ ${actionTaken}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DecisionHistory;