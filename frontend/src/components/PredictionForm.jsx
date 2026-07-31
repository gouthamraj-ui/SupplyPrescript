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

        <button type="submit">
          Predict
        </button>

      </form>

      <ResultCard result={result} />
    </>
  );
}

export default PredictionForm;