import PredictionForm from "./components/PredictionForm";
import DecisionHistory from "./components/DecisionHistory";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="dashboard">
        <h1>SupplyPrescript Dashboard</h1>
        <p>Predict Supply Chain Shipment Delays</p>

        <PredictionForm />

        <DecisionHistory />
      </div>
    </div>
  );
}

export default App;