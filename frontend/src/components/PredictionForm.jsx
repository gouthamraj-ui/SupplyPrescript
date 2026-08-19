import { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";

function PredictionForm({ onPredictionData }) {

  const [formData, setFormData] = useState({
    shipment_quantity: "",
    unit_price: "",
    lead_time: "",
    stock_quantity: "",
    rating: "",
    shipment_value: "",
    supplier_avg_delay: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value === "" ? "" : Number(value)
    }));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    // Required validation
    const requiredFields = [
      ["shipment_quantity", "Shipment Quantity"],
      ["unit_price", "Unit Price"],
      ["lead_time", "Lead Time"],
      ["stock_quantity", "Stock Quantity"],
      ["rating", "Rating"],
      ["shipment_value", "Shipment Value"],
      ["supplier_avg_delay", "Supplier Average Delay"]
    ];

    for (const [field, label] of requiredFields) {

      if (
        formData[field] === "" ||
        formData[field] === null ||
        formData[field] === undefined
      ) {
        alert(`${label} is required`);
        return;
      }
    }


    // Negative validation
    if (formData.shipment_quantity < 0) {
      alert("Shipment Quantity cannot be negative");
      return;
    }

    if (formData.unit_price < 0) {
      alert("Unit Price cannot be negative");
      return;
    }

    if (formData.lead_time < 0) {
      alert("Lead Time cannot be negative");
      return;
    }

    if (formData.stock_quantity < 0) {
      alert("Stock Quantity cannot be negative");
      return;
    }

    if (formData.shipment_value < 0) {
      alert("Shipment Value cannot be negative");
      return;
    }

    if (formData.supplier_avg_delay < 0) {
      alert("Supplier Average Delay cannot be negative");
      return;
    }


    // Rating validation
    if (formData.rating < 0 || formData.rating > 5) {
      alert("Rating must be between 0 and 5");
      return;
    }


    // API
    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

  

      setResult(response.data);


      // Send shipment data to OptimizationPanel
      if (onPredictionData) {

        onPredictionData({
          shipment_quantity: Number(formData.shipment_quantity),
          unit_price: Number(formData.unit_price),
          lead_time: Number(formData.lead_time),
          stock_quantity: Number(formData.stock_quantity),
          rating: Number(formData.rating),
          shipment_value: Number(formData.shipment_value),
          supplier_avg_delay: Number(formData.supplier_avg_delay)
        });

      }

    } catch (error) {

      console.error("Prediction Error:", error);

      alert("Prediction failed. Please try again.");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="prediction-section">

      {/* =====================================
          LEFT - SHIPMENT RISK PREDICTION
      ====================================== */}

      <div className="prediction-card">

        <div className="prediction-card-header">

          <div className="prediction-card-icon">
            📦
          </div>

          <div>

            <h2>Shipment Risk Prediction</h2>

            <p>
              Enter shipment details to predict delay risk
            </p>

          </div>

        </div>


        <form
          className="prediction-form"
          onSubmit={handleSubmit}
        >

          <div className="prediction-fields">


            {/* Shipment Quantity */}

            <div className="prediction-field">

              <label>
                Shipment Quantity
              </label>

              <input
                type="number"
                name="shipment_quantity"
                value={formData.shipment_quantity}
                onChange={handleChange}
                placeholder="e.g. 500"
              />

            </div>


            {/* Unit Price */}

            <div className="prediction-field">

              <label>
                Unit Price (₹)
              </label>

              <input
                type="number"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleChange}
                placeholder="e.g. 300"
              />

            </div>


            {/* Lead Time */}

            <div className="prediction-field">

              <label>
                Lead Time (days)
              </label>

              <input
                type="number"
                name="lead_time"
                value={formData.lead_time}
                onChange={handleChange}
                placeholder="e.g. 20"
              />

            </div>


            {/* Stock Quantity */}

            <div className="prediction-field">

              <label>
                Stock Quantity
              </label>

              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                placeholder="e.g. 800"
              />

            </div>


            {/* Rating */}

            <div className="prediction-field">

              <label>
                Rating (1-5)
              </label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="e.g. 4.2"
                step="0.1"
                min="0"
                max="5"
              />

            </div>


            {/* Supplier Delay */}

            <div className="prediction-field">

              <label>
                Supplier Avg Delay (days)
              </label>

              <input
                type="number"
                name="supplier_avg_delay"
                value={formData.supplier_avg_delay}
                onChange={handleChange}
                placeholder="e.g. 5.3"
              />

            </div>


            {/* Shipment Value */}

            <div className="prediction-field shipment-value-field">

              <label>
                Shipment Value (₹)
              </label>

              <input
                type="number"
                name="shipment_value"
                value={formData.shipment_value}
                onChange={handleChange}
                placeholder="e.g. 150000"
              />

            </div>

          </div>


          <button
            type="submit"
            className="predict-button"
            disabled={loading}
          >

            {loading
              ? "⏳ Predicting..."
              : "🔮 Predict Shipment Risk"
            }

          </button>

        </form>

      </div>


      {/* =====================================
          RIGHT - PREDICTION RESULT
      ====================================== */}

      <div className="prediction-result-wrapper">

        <ResultCard result={result} />

      </div>

    </div>

  );
}

export default PredictionForm;