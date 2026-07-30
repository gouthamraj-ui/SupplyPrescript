import { useState } from "react";
import axios from "axios";

function PredictionForm() {

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      formData
    );

    setResult(response.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

        <input
          name="shipment_quantity"
          placeholder="Shipment Quantity"
          onChange={handleChange}
        />

        <input
          name="unit_price"
          placeholder="Unit Price"
          onChange={handleChange}
        />

        <input
          name="lead_time"
          placeholder="Lead Time"
          onChange={handleChange}
        />

        <input
          name="stock_quantity"
          placeholder="Stock Quantity"
          onChange={handleChange}
        />

        <input
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
        />

        <input
          name="shipment_value"
          placeholder="Shipment Value"
          onChange={handleChange}
        />

        <input
          name="supplier_avg_delay"
          placeholder="Supplier Avg Delay"
          onChange={handleChange}
        />

        <button type="submit">
          Predict
        </button>

      </form>

      {result && (
        <div>

          <h2>Prediction Result</h2>

          <p>
            Prediction: {result.prediction}
          </p>

          <p>
            Delay Probability: {result.delay_probability}
          </p>

          <p>
            Confidence: {result.confidence}%
          </p>

          <p>
            Recommendation: {result.recommended_action}
          </p>

          <p>
            Estimated Saving: ₹{result.estimated_saving}
          </p>

        </div>
      )}

    </>
  );
}

export default PredictionForm;