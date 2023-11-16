import Head from "next/head";

import { RevenueChart, BillableChart } from "components/Charts";
import { Table } from "components";
import { revenue, billability } from "data";

export default function Home({
  revenueGraphData,
  billabillityGraphData,
  lastUpdate,
}) {
  return (
    <div className="w-full p-16 text-white bg-black min-h-screen leading-6">
      <Head>
        <title>Goals dashboard</title>
      </Head>
      <h1 className="text-4xl text-center mb-8 font-bold">Goals dashboard</h1>
      <div className="text-center mb-16 text-gray-500">
        <i>Last update: </i>
        {lastUpdate}
      </div>
      <h2 className="text-xl mb-8 font-bold">Goal #1: Revenue 2023</h2>
      <p className="text-sm">
        Main target is to have <strong>&euro;150.000</strong> in{" "}
        <strong>new</strong> revenue by the end of 2023. The way this is
        calculated in the graph below is by summing up the values of all tasks
        created after week 34 in Asana which are currently in the{" "}
        <i>Closed Won</i> section of the Sales pipeline.
        <br />
        <br />
        The graph below shows the potential value generated, as well as the
        realised value. The potential value is calculated by looking at the{" "}
        <i>Discovery</i> and <i>Negotiation</i> section in the Sales pipeline.
        It also includes the value generated in the <i>Closed Won</i> section,
        considering it was potential value before it became realised value.
      </p>
      <RevenueChart data={revenueGraphData} />
      <Table
        data={revenueGraphData}
        title="Supporting data"
        text="The data below shows which entries represent a certain value for a given
      week number"
      />

      <h2 className="text-xl mb-8 font-bold mt-16">
        Goal #2: Getting to 5 billable hours per team member per day.
      </h2>
      <p className="text-sm">
        For every staff member that is billable (being Jane Doe, Brent Rogers, Harvey Dent,
        Batman (half of his time) and The Joker), we agreed on the ambition of
        achieving a minimum of 5 billable hours per day. (red bar).
      </p>
      <BillableChart data={billabillityGraphData} />
    </div>
  );
}

export async function getStaticProps() {
  const [revenueGraphData, billabillityGraphData] = await Promise.all([
    revenue(),
    billability(),
  ]);

  const lastUpdate = new Date().toLocaleString();

  return {
    props: {
      revenueGraphData,
      billabillityGraphData,
      lastUpdate,
    },
    revalidate: 1,
  };
}
