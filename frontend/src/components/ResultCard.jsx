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


    </div>
  );
}

export default ResultCard;