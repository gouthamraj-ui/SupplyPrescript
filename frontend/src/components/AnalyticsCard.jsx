import { useEffect, useState } from "react";
import axios from "axios";

function AnalyticsCard({refreshTrigger = 0}) {

  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failure: 0,
    successRate: 0,
  });

  const fetchDecisions = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/analytics/summary"
      );

      const data = response.data;

      setStats({
        total: data.total_outcomes || 0,
        success: data.successful_decisions || 0,
        failure: data.failed_decisions || 0,
        successRate: data.success_rate || 0,
      });

    } catch (error) {

      console.error(
        "Analytics error:",
        error.response?.data || error.message
      );

    }
  };

  useEffect(() => {
  fetchDecisions();
}, [refreshTrigger]);

  return (
    <div className="analytics-grid">

      <div className="analytics-card">
        <h3>Total Outcomes</h3>
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