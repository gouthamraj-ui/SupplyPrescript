import PredictionForm from "./Components/PredictionForm";
import DecisionHistory from "./Components/DecisionHistory";
import AnalyticsCard from "./Components/AnalyticsCard";
import AnalyticsChart from "./Components/AnalyticsChart";
import OutcomeForm from "./Components/OutcomeForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="dashboard">
        <h1>SupplyPrescript Dashboard</h1>
        <p>Predict Supply Chain Shipment Delays</p>

        <AnalyticsCard />

        <PredictionForm />

        <AnalyticsChart
          success={8}
          failure={2}
        />

        <DecisionHistory />

        <OutcomeForm />
      </div>
    </div>
  );
}

export default App;