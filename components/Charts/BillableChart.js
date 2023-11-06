import {
  CartesianGrid,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  ComposedChart,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { billable, target, total, capacity } = payload[0].payload;
    return (
      <div className="bg-black border border-gray-500 p-4">
        <strong>{label}</strong>
        <p>
          Total: {total} / {capacity}{" "}
          <span className="text-sm">
            ({capacity !== 0 ? Math.round((total / capacity) * 100) : 0}
            %)
          </span>
        </p>
        <p>
          Billable: {billable} / {target}{" "}
          <span className="text-sm">
            ({target !== 0 ? Math.round((billable / target) * 100) : 0}
            %)
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const BillableChart = ({ data }) => (
  <div className="h-96 mt-16 mb-8">
    <ResponsiveContainer>
      <ComposedChart
        barGap={-20}
        width={750}
        height={500}
        margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
        data={data}
      >
        <Legend verticalAlign="top" />
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#a7a7a7" />
        <YAxis stroke="#a7a7a7" mirror />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="capacity"
          fill="#A78BFA"
          stroke="#A78BFA"
          dot={false}
          strokeDasharray="5 5"
          name="Total team capacity"
        />
        <Bar
          dataKey="total"
          barSize={20}
          fill="#A78BFA"
          fillOpacity={0.5}
          name="Hours logged"
        />
        <Line
          dataKey="target"
          fill="#EF4444"
          stroke="#EF4444"
          dot={false}
          strokeDasharray="5 5"
          name="Billable (target)"
        />
        <Bar
          dataKey="billable"
          barSize={20}
          fill="#EF4444"
          name="Billable (logged)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default BillableChart;
