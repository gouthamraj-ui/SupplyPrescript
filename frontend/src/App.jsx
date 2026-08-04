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

        <div className="dashboard-header">
          <h1>🚚 SupplyPrescript</h1>
          <p>Closed-Loop Prescriptive Analytics Dashboard</p>
        </div>

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