import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ success = 0, failure = 0 }) {

  const data = [
    {
      name: "Success",
      value: Number(success) || 0,
    },
    {
      name: "Failure",
      value: Number(failure) || 0,
    },
  ];

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const successRate =
    total > 0
      ? ((data[0].value / total) * 100).toFixed(0)
      : 0;

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="analytics-chart-card">

      {/* Header */}

      <div className="analytics-chart-header">

        <div className="analytics-chart-title">

          <div className="analytics-chart-icon">
            📈
          </div>

          <div>

            <h2>Outcome Analytics</h2>

            <p>
              Decision success and failure overview
            </p>

          </div>

        </div>

        <div className="success-rate-badge">
          {successRate}% Success
        </div>

      </div>


      {/* Chart */}

      <div className="analytics-chart-container">

        <ResponsiveContainer
          width="100%"
          height={230}
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />

              ))}

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


        {/* Center value */}

        <div className="chart-center-value">

          <strong>
            {total}
          </strong>

          <span>
            Total
          </span>

        </div>

      </div>


      {/* Bottom stats */}

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
  );
}

export default AnalyticsChart;