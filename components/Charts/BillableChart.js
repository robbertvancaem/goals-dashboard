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
} from 'recharts'
import { COLORS } from 'constants/index'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { billable, target, total, capacity } = payload[0].payload
        return (
            <div className="bg-slate-900 border border-gray-500 p-2">
                <div className="text-sky-200">{label}</div>
                <p className="text-sm">
                    Total: {total}hrs / {capacity}
                    {'hrs '}
                    <span className="text-xs">
                        (
                        {capacity !== 0
                            ? Math.round((total / capacity) * 100)
                            : 0}
                        %)
                    </span>
                </p>
                <p className="text-sm">
                    Billable: {billable}hrs / {target}
                    {'hrs '}
                    <span className="text-xs">
                        (
                        {target !== 0
                            ? Math.round((billable / target) * 100)
                            : 0}
                        %)
                    </span>
                </p>
            </div>
        )
    }

    return null
}

const BillableChart = ({ data }) => (
    <div className="h-96 mt-16 mb-8 overflow-x-scroll">
        <ResponsiveContainer minWidth={500}>
            <ComposedChart barGap={-20} margin={{ left: 20 }} data={data}>
                <Legend verticalAlign="top" />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                    dataKey="name"
                    stroke={COLORS.GRAY}
                    tick={{ fontSize: '.825rem' }}
                />
                <YAxis
                    stroke={COLORS.GRAY}
                    tick={{ fontSize: '.825rem' }}
                    tickFormatter={(v) => `${v}hrs`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    dataKey="capacity"
                    fill={COLORS.PRIMARY}
                    stroke={COLORS.PRIMARY}
                    dot={false}
                    activeDot={{ strokeWidth: 0 }}
                    strokeDasharray="5 5"
                    name="Total team capacity"
                />
                <Bar
                    dataKey="total"
                    barSize={20}
                    fill={COLORS.PRIMARY}
                    fillOpacity={0.5}
                    name="Hours logged"
                />
                <Line
                    dataKey="target"
                    fill={COLORS.SECONDARY}
                    stroke={COLORS.SECONDARY}
                    dot={false}
                    activeDot={{ strokeWidth: 0 }}
                    strokeDasharray="5 5"
                    name="Billable (target)"
                />
                <Bar
                    dataKey="billable"
                    barSize={20}
                    fill={COLORS.SECONDARY}
                    name="Billable (logged)"
                />
            </ComposedChart>
        </ResponsiveContainer>
    </div>
)

export default BillableChart
