import { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Required Field Validation
  if (!formData.shipment_quantity) {
    alert("Shipment Quantity is required");
    return;
  }

  if (!formData.unit_price) {
    alert("Unit Price is required");
    return;
  }

  if (!formData.lead_time) {
    alert("Lead Time is required");
    return;
  }

  if (!formData.stock_quantity) {
    alert("Stock Quantity is required");
    return;
  }

  if (!formData.rating) {
    alert("Rating is required");
    return;
  }

  if (!formData.shipment_value) {
    alert("Shipment Value is required");
    return;
  }

  if (!formData.supplier_avg_delay) {
    alert("Supplier Average Delay is required");
    return;
  }

  // Negative Value Validation
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

  // Rating Validation
  if (formData.rating < 0 || formData.rating > 5) {
    alert("Rating must be between 0 and 5");
    return;
  }

  // API Call
 try {
  setLoading(true);

  const response = await axios.post(
    "http://127.0.0.1:8000/predict",
    formData
  );

  setResult(response.data);

} catch (error) {
  console.error(error);
  alert("Prediction failed. Please try again.");
} finally {
  setLoading(false);
}
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

        <label>Shipment Quantity</label>
        <input
          type="number"
          name="shipment_quantity"
          value={formData.shipment_quantity}
          onChange={handleChange}
        />

        <label>Unit Price</label>
        <input
          type="number"
          name="unit_price"
          value={formData.unit_price}
          onChange={handleChange}
        />

        <label>Lead Time</label>
        <input
          type="number"
          name="lead_time"
          value={formData.lead_time}
          onChange={handleChange}
        />

        <label>Stock Quantity</label>
        <input
          type="number"
          name="stock_quantity"
          value={formData.stock_quantity}
          onChange={handleChange}
        />

        <label>Rating</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <label>Shipment Value</label>
        <input
          type="number"
          name="shipment_value"
          value={formData.shipment_value}
          onChange={handleChange}
        />

        <label>Supplier Average Delay</label>
        <input
          type="number"
          name="supplier_avg_delay"
          value={formData.supplier_avg_delay}
          onChange={handleChange}
        />

       <button type="submit" disabled={loading}>
  {loading ? "Predicting..." : "Predict"}
</button>

      </form>

      <ResultCard result={result} />
    </>
  );
}

export default PredictionForm;