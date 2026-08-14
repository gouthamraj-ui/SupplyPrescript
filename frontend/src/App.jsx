import { useState } from "react";

import PredictionForm from "./components/PredictionForm";
import DecisionHistory from "./components/DecisionHistory";
import AnalyticsCard from "./components/AnalyticsCard";
import AnalyticsChart from "./components/AnalyticsChart";
import OutcomeForm from "./components/OutcomeForm";
import OutcomeHistory from "./components/OutcomeHistory";
import DecisionROI from "./components/DecisionROI";
import OptimizationPanel from "./components/OptimizationPanel";

import "./App.css";

function App() {

  const [shipmentData, setShipmentData] = useState(null);

  return (
    <div className="App">
      <div className="dashboard">

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1>🚚 SupplyPrescript</h1>
          <p>Closed-Loop Prescriptive Analytics Dashboard</p>
        </div>

        {/* Analytics */}
        <AnalyticsCard />

        {/* Prediction */}
        <PredictionForm
          onPredictionData={setShipmentData}
        />

        {/* Optimization */}
        <OptimizationPanel
          shipmentData={shipmentData}
        />

        {/* Analytics Chart */}
        <AnalyticsChart
          success={8}
          failure={2}
        />

        {/* Decision History */}
        <DecisionHistory />

        {/* Outcome Form */}
        <OutcomeForm
          decisionId={7}
          onSaved={() => {
            console.log("Outcome saved");
          }}
        />

        {/* Outcome History */}
        <OutcomeHistory />

        {/* Decision ROI */}
        <DecisionROI />

      </div>
    </div>
  );
}

export default App;