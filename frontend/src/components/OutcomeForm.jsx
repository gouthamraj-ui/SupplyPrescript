import React, { useState } from "react";
import axios from "axios";

function OutcomeForm({ decisionId, onSaved }) {

  const [formData, setFormData] = useState({
    outcome_status: "",
    actual_delay: "",
    comments: ""
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!decisionId) {
      alert("Please select a decision.");
      return;
    }

    try {

      setSaving(true);

      await axios.post(
        "http://127.0.0.1:8000/outcomes",
        {
          decision_id: Number(decisionId),
          outcome_status: formData.outcome_status,
          actual_delay: Number(formData.actual_delay),
          comments: formData.comments
        }
      );

      alert("✅ Outcome recorded successfully!");

      setFormData({
        outcome_status: "",
        actual_delay: "",
        comments: ""
      });

      if (onSaved) {
        onSaved();
      }

    } catch (error) {

      console.error("Outcome error:", error);

      alert(
        error.response?.data?.detail ||
        "Failed to save outcome."
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="outcome-form">

      <div className="outcome-header">

        <div>
          <h2>📊 Record Actual Outcome</h2>

          <p>
            Compare the AI prediction with the real-world result.
          </p>
        </div>

        <div className="outcome-decision">
          Decision #{decisionId}
        </div>

      </div>


      <form onSubmit={handleSubmit}>

        <div className="outcome-grid">

          {/* STATUS */}

          <div className="outcome-field">

            <label>
              Outcome Status
            </label>

            <select
              name="outcome_status"
              value={formData.outcome_status}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Outcome
              </option>

              <option value="Success">
                ✅ Success
              </option>

              <option value="Partial Success">
                🟡 Partial Success
              </option>

              <option value="Failed">
                ❌ Failed
              </option>

            </select>

          </div>


          {/* ACTUAL DELAY */}

          <div className="outcome-field">

            <label>
              Actual Delay (Days)
            </label>

            <input
              type="number"
              name="actual_delay"
              min="0"
              step="0.1"
              placeholder="e.g. 5"
              value={formData.actual_delay}
              onChange={handleChange}
              required
            />

          </div>


          {/* COMMENTS */}

          <div className="outcome-field full-width">

            <label>
              Comments
            </label>

            <textarea
              name="comments"
              rows="3"
              placeholder="Describe what actually happened..."
              value={formData.comments}
              onChange={handleChange}
            />

          </div>

        </div>


        <button
          type="submit"
          className="outcome-submit"
          disabled={saving}
        >

          {saving
            ? "⏳ Saving Outcome..."
            : "💾 Record Outcome"
          }

        </button>

      </form>

    </div>
  );
}

export default OutcomeForm;