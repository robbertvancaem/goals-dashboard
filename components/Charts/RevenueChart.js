import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-gray-500 p-4">
        <strong>{label}</strong>
        <p>
          Potential: €
          {new Intl.NumberFormat("nl-NL").format(
            payload[0].payload["potentialRealised"]
          )}{" "}
          / €
          {new Intl.NumberFormat("nl-NL").format(
            payload[0].payload["potentialTarget"]
          )}{" "}
          <span className="text-sm">
            (
            {payload[0].payload["potentialTarget"] !== 0
              ? Math.round(
                  (payload[0].payload["potentialRealised"] /
                    payload[0].payload["potentialTarget"]) *
                    100
                )
              : 0}
            %)
          </span>
        </p>
        <p>
          Realised: €
          {new Intl.NumberFormat("nl-NL").format(
            payload[0].payload["revenueRealised"]
          )}{" "}
          / €
          {new Intl.NumberFormat("nl-NL").format(
            payload[0].payload["revenueTarget"]
          )}{" "}
          <span className="text-sm">
            (
            {payload[0].payload["revenueTarget"] !== 0
              ? Math.round(
                  (payload[0].payload["revenueRealised"] /
                    payload[0].payload["revenueTarget"]) *
                    100
                )
              : 0}
            % )
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const RevenueChart = ({ data }) => (
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
        <YAxis
          stroke="#a7a7a7"
          tickFormatter={(v) => `€${new Intl.NumberFormat("nl-NL").format(v)}`}
          mirror
        />
        <Tooltip content={<CustomTooltip />} />

        <Line
          dataKey="potentialTarget"
          fill="#A78BFA"
          stroke="#A78BFA"
          dot={false}
          strokeDasharray="5 5"
          name="Potential (target)"
        />

        <Bar
          dataKey="potentialRealised"
          barSize={20}
          fill="#A78BFA"
          fillOpacity={0.5}
          name="Potential (realised)"
        />
        <Line
          dataKey="revenueTarget"
          fill="#EF4444"
          stroke="#EF4444"
          dot={false}
          strokeDasharray="5 5"
          name="Revenue (target)"
        />
        <Bar
          dataKey="revenueRealised"
          barSize={20}
          fill="#EF4444"
          name="Revenue (realised)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default RevenueChart;
