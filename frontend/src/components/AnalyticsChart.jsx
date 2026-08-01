import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ success, failure }) {

  const data = [
    {
      name: "Success",
      value: success,
    },
    {
      name: "Failure",
      value: failure,
    },
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="history-card">
      <h2>Outcome Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;