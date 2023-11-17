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
} from 'recharts'
import { COLORS } from 'constants/index'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-gray-500 p-2">
                <div className="text-sky-200">{label}</div>
                <p className="text-sm">
                    Potential: €
                    {new Intl.NumberFormat('nl-NL').format(
                        payload[0].payload['potentialRealised']
                    )}{' '}
                    / €
                    {new Intl.NumberFormat('nl-NL').format(
                        payload[0].payload['potentialTarget']
                    )}{' '}
                    <span className="text-xs">
                        (
                        {payload[0].payload['potentialTarget'] !== 0
                            ? Math.round(
                                  (payload[0].payload['potentialRealised'] /
                                      payload[0].payload['potentialTarget']) *
                                      100
                              )
                            : 0}
                        %)
                    </span>
                </p>
                <p className="text-sm">
                    Realised: €
                    {new Intl.NumberFormat('nl-NL').format(
                        payload[0].payload['revenueRealised']
                    )}{' '}
                    / €
                    {new Intl.NumberFormat('nl-NL').format(
                        payload[0].payload['revenueTarget']
                    )}{' '}
                    <span className="text-xs">
                        (
                        {payload[0].payload['revenueTarget'] !== 0
                            ? Math.round(
                                  (payload[0].payload['revenueRealised'] /
                                      payload[0].payload['revenueTarget']) *
                                      100
                              )
                            : 0}
                        % )
                    </span>
                </p>
            </div>
        )
    }

    return null
}

const RevenueChart = ({ data }) => (
    <div className="h-96 my-8">
        <ResponsiveContainer>
            <ComposedChart barGap={-20} data={data} margin={{ left: 20 }}>
                <Legend verticalAlign="top" />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                    dataKey="name"
                    stroke={COLORS.GRAY}
                    tick={{ fontSize: '.825rem' }}
                />
                <YAxis
                    stroke={COLORS.GRAY}
                    tickFormatter={(v) =>
                        `€${new Intl.NumberFormat('nl-NL').format(v)}`
                    }
                    tick={{ fontSize: '.825rem' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    dataKey="potentialTarget"
                    fill={COLORS.PRIMARY}
                    stroke={COLORS.PRIMARY}
                    dot={false}
                    activeDot={{ strokeWidth: 0 }}
                    strokeDasharray="5 5"
                    name="Potential (target)"
                />
                <Bar
                    dataKey="potentialRealised"
                    barSize={20}
                    fill={COLORS.PRIMARY}
                    fillOpacity={0.5}
                    name="Potential (realised)"
                />
                <Line
                    dataKey="revenueTarget"
                    fill={COLORS.SECONDARY}
                    stroke={COLORS.SECONDARY}
                    dot={false}
                    activeDot={{ strokeWidth: 0 }}
                    strokeDasharray="5 5"
                    name="Revenue (target)"
                />
                <Bar
                    dataKey="revenueRealised"
                    barSize={20}
                    fill={COLORS.SECONDARY}
                    name="Revenue (realised)"
                />
            </ComposedChart>
        </ResponsiveContainer>
    </div>
)

export default RevenueChart
