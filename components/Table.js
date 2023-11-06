import React, { useState } from "react";

const Table = ({ data, title, text }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-4 w-full rounded-lg p-4 border border-opacity-50 hover:border-opacity-100">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-l">{title}</span>
        <span
          className={`transform origin-center ${expanded ? "-rotate-180" : ""}`}
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
        <>
          <p className="mb-6 mt-4 text-sm">{text}</p>
          <div className="flex mb-4 px-2 font-bold">
            <div className="w-2/12">Date</div>
            <div className="w-5/12 text-left">Name</div>
            <div className="w-2/12 text-left">Client</div>
            <div className="w-2/12 text-left">Value</div>
            <div className="w-1/12 text-left">Type</div>
          </div>
          <div className="divide-y divide-gray-700">
            {data.map(({ name: week, entries }, i) => {
              if (!entries.length) {
                return null;
              }

              const total = entries.reduce(
                (agg, { value }) => agg + parseInt(value, 10),
                0
              );

              return (
                <React.Fragment key={week}>
                  <div className="w-12/12 py-6 text-center">{week}</div>
                  {entries.map(
                    ({ name: eName, value, type, client, date }, j) => (
                      <div
                        key={eName}
                        className="flex items-center py-4 px-2 even:bg-gray-900 text-sm"
                      >
                        <div className="w-2/12">{date}</div>
                        <div className="w-5/12">{eName}</div>
                        <div className="w-2/12">{client}</div>
                        <div className="w-2/12">
                          €{new Intl.NumberFormat("nl-NL").format(value)},-
                        </div>
                        <div className="w-1/12">{type}</div>
                      </div>
                    )
                  )}
                  <div className="flex items-center py-4 px-2 even:bg-gray-900 text-sm">
                    <div className="w-2/12"></div>
                    <div className="w-5/12"></div>
                    <div className="w-2/12"></div>
                    <div className="w-2/12">
                      €{new Intl.NumberFormat("nl-NL").format(total)},-
                    </div>
                    <div className="w-1/12"></div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
