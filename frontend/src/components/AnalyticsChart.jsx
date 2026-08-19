import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";


function AnalyticsChart({ refreshTrigger = 0 }) {

  const [analytics, setAnalytics] = useState({
    total_outcomes: 0,
    successful_decisions: 0,
    failed_decisions: 0,
    success_rate: 0,

    total_expected_cost: 0,
    total_actual_cost: 0,
    total_savings: 0,

    average_expected_delay: 0,
    average_actual_delay_from_completed: 0,
  });

  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);


  // =========================================================
  // FETCH ANALYTICS
  // =========================================================

  const fetchAnalytics = async () => {

    try {

      if (!hasLoaded) {
  setLoading(true);
}

      const response = await axios.get(
        "http://127.0.0.1:8000/analytics/summary"
      );

      

      setAnalytics(response.data);
       setHasLoaded(true);

    } catch (error) {

      console.error(
        "Analytics chart error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // LOAD ANALYTICS
  // =========================================================

  useEffect(() => {

    fetchAnalytics();

  }, [refreshTrigger]);


  // =========================================================
  // VALUES
  // =========================================================

  const success =
    Number(
      analytics.successful_decisions || 0
    );

  const failure =
    Number(
      analytics.failed_decisions || 0
    );

  const total =
    Number(
      analytics.total_outcomes || 0
    );

  const successRate =
    Number(
      analytics.success_rate || 0
    );


  const expectedCost =
    Number(
      analytics.total_expected_cost || 0
    );

  const actualCost =
    Number(
      analytics.total_actual_cost || 0
    );

  const totalSavings =
    Number(
      analytics.total_savings || 0
    );


  const expectedDelay =
    Number(
      analytics.average_expected_delay || 0
    );

  const actualDelay =
    Number(
      analytics.average_actual_delay_from_completed || 0
    );


  // =========================================================
  // OUTCOME CHART DATA
  // =========================================================

  const outcomeData = [

    {
      name: "Success",
      value: success,
    },

    {
      name: "Failure",
      value: failure,
    },

  ];


  // =========================================================
  // COST CHART DATA
  // =========================================================

  const costData = [

    {
      name: "Expected",
      value: expectedCost,
    },

    {
      name: "Actual",
      value: actualCost,
    },

  ];


  // =========================================================
  // DELAY CHART DATA
  // =========================================================

  const delayData = [

    {
      name: "Expected",
      value: expectedDelay,
    },

    {
      name: "Actual",
      value: actualDelay,
    },

  ];


  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="analytics-chart-card">

        <div className="analytics-chart-header">

          <div className="analytics-chart-title">

            <div className="analytics-chart-icon">
              📊
            </div>

            <div>

              <h2>
                Analytics
              </h2>

              <p>
                Loading analytics...
              </p>

            </div>

          </div>

        </div>

      </div>

    );

  }


  // =========================================================
  // COMPONENT
  // =========================================================

  return (

    <div className="analytics-dashboard">


      {/* =====================================================
          OUTCOME ANALYTICS
      ===================================================== */}

      <div className="analytics-chart-card">


        <div className="analytics-chart-header">

          <div className="analytics-chart-title">

            <div className="analytics-chart-icon">
              📈
            </div>

            <div>

              <h2>
                Outcome Analytics
              </h2>

              <p>
                Decision success and failure overview
              </p>

            </div>

          </div>


          <div className="success-rate-badge">

            {successRate.toFixed(1)}% Success

          </div>

        </div>


        <div className="analytics-chart-container">

          {total === 0 ? (

            <div className="chart-empty">

              <div>
                📊
              </div>

              <p>
                No outcomes recorded yet.
              </p>

            </div>

          ) : (

            <>

              <ResponsiveContainer
                width="100%"
                height={230}
              >

                <PieChart>

                  <Pie
                    data={outcomeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >

                    {outcomeData.map(
                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                        />

                      )
                    )}

                  </Pie>


                  <Tooltip
                    formatter={(value, name) => [
                      value,
                      name,
                    ]}
                  />


                  <Legend
                    verticalAlign="bottom"
                    height={30}
                    iconType="circle"
                  />

                </PieChart>

              </ResponsiveContainer>


              <div className="chart-center-value">

                <strong>
                  {total}
                </strong>

                <span>
                  Total
                </span>

              </div>

            </>

          )}

        </div>


        <div className="chart-stats">


          <div className="chart-stat success">

            <span className="stat-dot"></span>

            <div>

              <span>
                Successful
              </span>

              <strong>
                {success}
              </strong>

            </div>

          </div>


          <div className="chart-stat failure">

            <span className="stat-dot"></span>

            <div>

              <span>
                Failed
              </span>

              <strong>
                {failure}
              </strong>

            </div>

          </div>


        </div>

      </div>


      {/* =====================================================
          COST PERFORMANCE
      ===================================================== */}

      <div className="analytics-chart-card">


        <div className="analytics-chart-header">

          <div className="analytics-chart-title">

            <div className="analytics-chart-icon">
              💰
            </div>

            <div>

              <h2>
                Cost Performance
              </h2>

              <p>
                Expected cost compared with actual cost
              </p>

            </div>

          </div>

        </div>


        <div className="analytics-chart-container">


          <ResponsiveContainer
            width="100%"
            height={250}
          >

            <BarChart
              data={costData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString()}`
                }
              />

              <Bar
                dataKey="value"
                name="Cost"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        <div className="chart-stats">


          <div className="chart-stat">

            <div>

              <span>
                Expected Cost
              </span>

              <strong>
                ₹{expectedCost.toLocaleString()}
              </strong>

            </div>

          </div>


          <div className="chart-stat">

            <div>

              <span>
                Actual Cost
              </span>

              <strong>
                ₹{actualCost.toLocaleString()}
              </strong>

            </div>

          </div>


        </div>

      </div>


      {/* =====================================================
          SAVINGS
      ===================================================== */}

      <div className="analytics-financial-card">


        <div>

          <span>
            💰 Total Savings
          </span>

          <strong>
            ₹{totalSavings.toLocaleString()}
          </strong>

        </div>


        <small>
          Expected cost − actual cost
        </small>

      </div>


      {/* =====================================================
          DELAY PERFORMANCE
      ===================================================== */}

      <div className="analytics-chart-card">


        <div className="analytics-chart-header">

          <div className="analytics-chart-title">

            <div className="analytics-chart-icon">
              ⏱️
            </div>

            <div>

              <h2>
                Delay Performance
              </h2>

              <p>
                Expected delay compared with actual delay
              </p>

            </div>

          </div>

        </div>


        <div className="analytics-chart-container">


          <ResponsiveContainer
            width="100%"
            height={250}
          >

            <BarChart
              data={delayData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `${Number(
                    value
                  ).toFixed(2)} days`
                }
              />

              <Bar
                dataKey="value"
                name="Delay"
                fill="#f59e0b"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        <div className="chart-stats">


          <div className="chart-stat">

            <div>

              <span>
                Expected Delay
              </span>

              <strong>
                {expectedDelay.toFixed(2)} days
              </strong>

            </div>

          </div>


          <div className="chart-stat">

            <div>

              <span>
                Actual Delay
              </span>

              <strong>
                {actualDelay.toFixed(2)} days
              </strong>

            </div>

          </div>


        </div>

      </div>


    </div>

  );

}


export default AnalyticsChart;