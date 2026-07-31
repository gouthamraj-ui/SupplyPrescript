
import ProgressBar from "./ProgressBar";

function ResultCard({ result }) {

  if (!result) return null;

  return (
    <div className="result-card">

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
        {result.delay_probability}
      </p>

      <p><strong>Confidence</strong></p>

      <ProgressBar value={result.confidence} />

      <p>{result.confidence}%</p>

      <p>
        <strong>Recommendation:</strong>{" "}
        {result.recommended_action}
      </p>

      <p>
        <strong>Estimated Saving:</strong> ₹
        {result.estimated_saving}
      </p>

    </div>
  );
}

export default ResultCard;
