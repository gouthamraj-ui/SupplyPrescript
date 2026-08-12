import ProgressBar from "./ProgressBar";

function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="result-card">

      {/* Prediction */}
      <h2>Prediction Result</h2>

      <h3
        className={
          result.prediction === "Delayed"
            ? "status delayed"
            : "status ontime"
        }
      >
        {result.prediction}
      </h3>

      <p>
        <strong>Delay Probability:</strong>{" "}
        {(result.delay_probability * 100).toFixed(1)}%
      </p>

      <p>
        <strong>Confidence</strong>
      </p>

      <ProgressBar value={result.confidence} />

      <p>{result.confidence}%</p>


      {/* AI Recommendation */}
      <div className="recommendation-section">
        <h3>🤖 AI Recommendation</h3>

        <p>
          <strong>Recommended Action:</strong>{" "}
          {result.recommended_action}
        </p>

        <p>
          <strong>Estimated Saving:</strong> ₹
          {result.estimated_saving}
        </p>
      </div>


      {/* Optimization */}
      {result.optimized_action && (
        <div className="optimization-section">

          <h3>⚙️ Optimization Recommendation</h3>

          <div className="optimized-card">

            <h4>{result.optimized_action}</h4>

            <p>
              <strong>Cost:</strong> ₹{result.optimized_cost}
            </p>

            <p>
              <strong>Expected Delay:</strong>{" "}
              {result.optimized_delay_days} days
            </p>

            <p>
              <strong>Risk:</strong>{" "}
              {result.optimized_risk}
            </p>

          </div>

        </div>
      )}


      {/* Alternative Actions */}
      {result.alternatives && result.alternatives.length > 0 && (
        <div className="alternatives-section">

          <h3>📊 Alternative Actions</h3>

          {result.alternatives.map((option, index) => (

            <div
              className="alternative-card"
              key={index}
            >

              <h4>
                Option {index + 1}: {option.action}
              </h4>

              <p>
                <strong>Cost:</strong> ₹{option.cost}
              </p>

              <p>
                <strong>Expected Delay:</strong>{" "}
                {option.delay_days} days
              </p>

              <p>
                <strong>Risk:</strong>{" "}
                {option.risk}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default ResultCard;