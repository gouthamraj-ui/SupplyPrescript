import React, { useEffect, useState } from "react";
import axios from "axios";

function OutcomeForm({ decisionId,onOutcomeSaved }) {

  const [formData, setFormData] = useState({
    decision_id: decisionId || "",
    outcome_status: "",
    actual_cost: "",
    actual_delay: "",
    comments: ""
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      decision_id: decisionId || ""
    }));
  }, [decisionId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.decision_id) {
      alert("Please enter a Decision ID.");
      return;
    }

    if (!formData.outcome_status) {
      alert("Please select an Outcome Status.");
      return;
    }

    try {

      setSaving(true);

      await axios.post(
        "http://127.0.0.1:8000/outcomes",
        {
          decision_id: Number(formData.decision_id),
          outcome_status: formData.outcome_status,
          actual_cost: Number(formData.actual_cost),
          actual_delay: Number(formData.actual_delay),
          comments: formData.comments
        }
      );

      alert("✅ Outcome recorded successfully!");

      if(onOutcomeSaved){
        onOutcomeSaved();
      }

      setFormData({
      decision_id: decisionId || "",
      outcome_status: "",
      actual_cost: "",
      actual_delay: "",
      comments: ""
       });

    } catch (error) {

      console.error(
        "Outcome error:",
        error
      );

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

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="outcome-header">

        <div>

          <h2>
            📊 Record Actual Outcome
          </h2>

          <p>
            Compare the AI prediction with the real-world result.
          </p>

        </div>


        <div className="outcome-decision">

          Decision #{formData.decision_id || "—"}

        </div>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <form onSubmit={handleSubmit}>

        <div className="outcome-grid">


          {/* =================================================
              DECISION ID
          ================================================= */}

          <div className="outcome-field">

            <label>
              Decision ID
            </label>

            <input
              type="number"
              name="decision_id"
              min="1"
              placeholder="e.g. 8"
              value={formData.decision_id}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================================
              OUTCOME STATUS
          ================================================= */}

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

              <option value="Failure">
                ❌ Failure
              </option>

            </select>

          </div>


          {/* =================================================
              ACTUAL COST
          ================================================= */}

          <div className="outcome-field">

            <label>
              Actual Cost (₹)
            </label>

            <input
              type="number"
              name="actual_cost"
              min="0"
              step="0.01"
              placeholder="e.g. 18000"
              value={formData.actual_cost}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================================
              ACTUAL DELAY
          ================================================= */}

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


          {/* =================================================
              COMMENTS
          ================================================= */}

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


        {/* ===================================================
            SUBMIT BUTTON
        =================================================== */}

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