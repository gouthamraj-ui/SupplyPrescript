import { useState } from "react";
import axios from "axios";

function OutcomeForm() {
  const [formData, setFormData] = useState({
    decision_id: "",
    outcome_status: "Success",
    actual_delay: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/outcomes", formData);

      alert("Outcome saved successfully!");

      setFormData({
        decision_id: "",
        outcome_status: "Success",
        actual_delay: "",
        comments: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error saving outcome");
    }
  };

  return (
    <div className="history-card">
      <h2>Record Outcome</h2>

      <form onSubmit={handleSubmit}>
        <label>Decision ID</label>
        <input
          type="number"
          name="decision_id"
          value={formData.decision_id}
          onChange={handleChange}
          required
        />

        <label>Outcome Status</label>
        <select
          name="outcome_status"
          value={formData.outcome_status}
          onChange={handleChange}
        >
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>

        <label>Actual Delay (Days)</label>
        <input
          type="number"
          step="0.1"
          name="actual_delay"
          value={formData.actual_delay}
          onChange={handleChange}
        />

        <label>Comments</label>
        <textarea
          name="comments"
          rows="3"
          value={formData.comments}
          onChange={handleChange}
        />

        <button type="submit">Save Outcome</button>
      </form>
    </div>
  );
}

export default OutcomeForm;