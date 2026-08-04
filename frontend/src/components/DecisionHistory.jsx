import { useEffect, useState } from "react";
import axios from "axios";

function DecisionHistory() {
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/decisions");
      setDecisions(response.data);
    } catch (error) {
      console.error("Error fetching decisions:", error);
    }
  };

   return (
    <div className="history-card">
      <h2>Decision History</h2>

      {decisions.length === 0 ? (
        <p>No decision history available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Prediction</th>
              <th>Recommendation</th>
              <th>Saving</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {decisions.map((item) => (
              <tr key={item.decision_id}>
                <td>{item.decision_id}</td>
                <td>{item.prediction}</td>
                <td>{item.recommended_action}</td>
                <td>₹{item.estimated_saving}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DecisionHistory;