import ProgressBar from "./ProgressBar";

function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="result-card result-empty">
        <div className="result-empty-icon">📊</div>

        <h2>Prediction Result</h2>

        <p>
          Submit shipment details to see the prediction.
        </p>
      </div>
    );
  }

  const delayProbability =
    typeof result.delay_probability === "number"
      ? (result.delay_probability * 100).toFixed(1)
      : "0.0";

  const confidence =
    typeof result.confidence === "number"
      ? result.confidence
      : 0;

  const isDelayed = result.prediction === "Delayed";

  return (
    <div className="result-card">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="result-header">

        <div className="result-icon">
          📊
        </div>

        <div>
          <h2>Prediction Result</h2>

          <p>
            AI-powered shipment risk assessment
          </p>
        </div>

      </div>


      {/* =====================================
          PREDICTION STATUS
      ====================================== */}

      <div
        className={`prediction-status ${
          isDelayed ? "high-risk" : "low-risk"
        }`}
      >

        <span className="prediction-status-icon">
          {isDelayed ? "⚠️" : "✅"}
        </span>

        <div>

          <span className="prediction-status-label">
            Shipment Status
          </span>

          <strong>
            {isDelayed ? "HIGH DELAY RISK" : "LOW DELAY RISK"}
          </strong>

        </div>

      </div>


      {/* =====================================
          PROBABILITY + CONFIDENCE
      ====================================== */}

      <div className="result-metrics">

        {/* Delay Probability */}

        <div className="result-metric">

          <div className="metric-top">

            <span>
              Delay Probability
            </span>

            <strong>
              {delayProbability}%
            </strong>

          </div>

          <div className="result-progress">

            <div
              className={`result-progress-fill ${
                isDelayed ? "danger" : "safe"
              }`}
              style={{
                width: `${delayProbability}%`
              }}
            />

          </div>

        </div>


        {/* Confidence */}

        <div className="result-metric">

          <div className="metric-top">

            <span>
              Confidence
            </span>

            <strong>
              {confidence}%
            </strong>

          </div>

          <ProgressBar value={confidence} />

        </div>

      </div>


      {/* =====================================
          AI RECOMMENDATION
      ====================================== */}

      <div className="recommendation-section">

        <div className="section-small-title">
          🤖 AI Recommendation
        </div>

        <div className="recommendation-main">

          <div>

            <span>
              Recommended Action
            </span>

            <strong>
              {result.recommended_action || "Monitor Shipment"}
            </strong>

          </div>

          <div className="saving-box">

            <span>
              Estimated Saving
            </span>

            <strong>
              ₹{result.estimated_saving ?? 0}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================
          OPTIMIZATION
      ====================================== */}

      {result.optimized_action && (

        <div className="optimization-section">

          <div className="section-small-title">
            ⚙️ Optimization Recommendation
          </div>

          <div className="optimized-card">

            <h4>
              {result.optimized_action}
            </h4>

            <div className="optimized-metrics">

              <div>
                <span>Cost</span>
                <strong>
                  ₹{result.optimized_cost ?? 0}
                </strong>
              </div>

              <div>
                <span>Expected Delay</span>
                <strong>
                  {result.optimized_delay_days ?? 0} days
                </strong>
              </div>

              <div>
                <span>Risk</span>
                <strong>
                  {result.optimized_risk ?? "N/A"}
                </strong>
              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          ALTERNATIVE ACTIONS
      ====================================== */}

      {result.alternatives &&
        result.alternatives.length > 0 && (

          <div className="alternatives-section">

            <div className="section-small-title">
              📊 Alternative Actions
            </div>

            <div className="alternatives-grid">

              {result.alternatives.map(
                (option, index) => (

                  <div
                    className="alternative-card"
                    key={index}
                  >

                    <div className="alternative-number">
                      {index + 1}
                    </div>

                    <div className="alternative-content">

                      <h4>
                        {option.action}
                      </h4>

                      <div className="alternative-details">

                        <span>
                          Cost: ₹{option.cost}
                        </span>

                        <span>
                          Delay: {option.delay_days} days
                        </span>

                        <span>
                          Risk: {option.risk}
                        </span>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

    </div>
  );
}

export default ResultCard;