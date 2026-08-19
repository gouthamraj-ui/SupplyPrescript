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

  // =========================================================
  // SHIPMENT DATA
  // =========================================================

  const [shipmentData, setShipmentData] = useState(null);


  // =========================================================
  // SELECTED DECISION
  // =========================================================

  const [selectedDecisionId, setSelectedDecisionId] =
    useState(null);
   
    const [outcomeRefresh, setOutcomeRefresh] = useState(0);


  // =========================================================
  // APP
  // =========================================================

  return (

    <div className="App">

      <div className="dashboard">


        {/* =====================================================
            DASHBOARD HEADER
        ===================================================== */}

        <div className="dashboard-header">

          <h1>
            🚚 SupplyPrescript
          </h1>

          <p>
            Closed-Loop Prescriptive Analytics Dashboard
          </p>

        </div>


        {/* =====================================================
            ANALYTICS SUMMARY
        ===================================================== */}

        <AnalyticsCard refreshTrigger={outcomeRefresh} />


        {/* =====================================================
            PREDICTION
        ===================================================== */}

        <PredictionForm
          onPredictionData={
            setShipmentData
          }
        />


        {/* =====================================================
            OPTIMIZATION
        ===================================================== */}

        <OptimizationPanel
          shipmentData={
            shipmentData
          }
        />


        {/* =====================================================
            OUTCOME ANALYTICS CHART
        ===================================================== */}

        
        <AnalyticsChart refreshTrigger={outcomeRefresh}/>
        


        {/* =====================================================
            DECISION HISTORY
        ===================================================== */}

        <DecisionHistory
          onDecisionSelected={setSelectedDecisionId}
        />


        {/* =====================================================
            OUTCOME FORM
        ===================================================== */}

        <OutcomeForm
          decisionId={selectedDecisionId}
          onOutcomeSaved={() =>
            setOutcomeRefresh((value)=> value + 1)

          }
        />


        {/* =====================================================
            OUTCOME HISTORY
        ===================================================== */}

        <OutcomeHistory refreshTrigger={outcomeRefresh} />


        {/* =====================================================
            DECISION ROI
        ===================================================== */}

        <DecisionROI refreshTrigger={outcomeRefresh} />


      </div>

    </div>

  );

}


export default App;