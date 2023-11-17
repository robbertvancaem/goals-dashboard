import React, { useState } from 'react'

const Table = ({ data, title, text }) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="mb-4 w-full rounded-lg border border-gray-500 hover:border-white">
            <div
                className="flex justify-between items-center cursor-pointer px-4 py-2"
                onClick={() => setExpanded(!expanded)}
            >
                <span className="text-sm">{title}</span>
                <span
                    className={`transform origin-center ${
                        expanded ? '-rotate-180' : ''
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </div>
            {expanded && (
                <div className="px-4 py-2">
                    <p className="mb-6 mt-4 text-sm">{text}</p>
                    <div className="flex mb-4 px-2 font-semibold text-sm">
                        <div className="w-2/12">Date</div>
                        <div className="w-4/12 text-left">Name</div>
                        <div className="w-3/12 text-left">Client</div>
                        <div className="w-2/12 text-left">Value</div>
                        <div className="w-1/12 text-left">Type</div>
                    </div>
                    <div className="divide-y divide-gray-700">
                        {data.map(({ name: week, entries }, i) => {
                            if (!entries.length) {
                                return null
                            }

                            const total = entries.reduce(
                                (agg, { value }) => agg + parseInt(value, 10),
                                0
                            )

                            return (
                                <React.Fragment key={week}>
                                    <div className="w-12/12 pt-8 pb-4 px-2 text-sm text-sky-200">
                                        {week}
                                    </div>
                                    {entries.map(
                                        (
                                            {
                                                name: eName,
                                                value,
                                                type,
                                                client,
                                                date,
                                            },
                                            j
                                        ) => (
                                            <div
                                                key={eName}
                                                className="flex items-center p-2 even:bg-gray-900 text-xs hover:bg-slate-800"
                                            >
                                                <div className="w-2/12">
                                                    {date}
                                                </div>
                                                <div className="w-4/12">
                                                    {eName}
                                                </div>
                                                <div className="w-3/12">
                                                    {client}
                                                </div>
                                                <div className="w-2/12">
                                                    €
                                                    {new Intl.NumberFormat(
                                                        'nl-NL'
                                                    ).format(value)}
                                                    ,-
                                                </div>
                                                <div className="border border-orange-400 text-orange-400 inline-block p-1 text-xs rounded-lg">
                                                    {type}
                                                </div>
                                            </div>
                                        )
                                    )}
                                    <div className="flex items-center p-2 bg-slate-950 text-xs">
                                        <div className="w-2/12"></div>
                                        <div className="w-4/12"></div>
                                        <div className="w-3/12 text-right pr-2">
                                            TOTAL
                                        </div>
                                        <div className="w-2/12 font-bold">
                                            €
                                            {new Intl.NumberFormat(
                                                'nl-NL'
                                            ).format(total)}
                                            ,-
                                        </div>
                                        <div className="w-1/12"></div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Table
