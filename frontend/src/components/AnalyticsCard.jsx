import { useEffect, useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import axios from "axios";

function AnalyticsCard() {
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failure: 0,
    successRate: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/outcomes"
      );

      const data = response.data;

      const total = data.length;
      const success = data.filter(
        (item) => item.outcome_status === "Success"
      ).length;

      const failure = total - success;

      const successRate =
        total > 0
          ? ((success / total) * 100).toFixed(1)
          : 0;

      setStats({
        total,
        success,
        failure,
        successRate,
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="analytics-grid">

      <div className="analytics-card">
        <h3>Total Decisions</h3>
        <h1>{stats.total}</h1>
      </div>

      <div className="analytics-card">
        <h3>Successful</h3>
        <h1>{stats.success}</h1>
      </div>

      <div className="analytics-card">
        <h3>Failed</h3>
        <h1>{stats.failure}</h1>
      </div>

      <div className="analytics-card">
        <h3>Success Rate</h3>
        <h1>{stats.successRate}%</h1>
      </div>

    </div>
  );
}

export default AnalyticsCard;