import Head from 'next/head'

import { REVENUE_TARGET, YEAR, CONVERSION_PERCENTAGE } from '../constants'
import { RevenueChart, BillableChart } from 'components/Charts'
import { Heading, Paragraph, Table } from 'components'
import { revenue, billability } from 'data'

export default function Home({
    revenueGraphData,
    billabillityGraphData,
    lastUpdate,
}) {
    return (
        <div className="w-full p-4 pt-12 md:p-16 text-white bg-slate-900 min-h-screen">
            <Head>
                <title>Goals dashboard</title>
            </Head>
            <div className="container mx-auto">
                <h1 className="text-4xl text-center mb-4 font-bold">
                    Goals dashboard
                </h1>
                <div className="text-center mb-16 text-gray-500">
                    <i>Last update: </i>
                    {lastUpdate}
                </div>
                <Heading>Goal #1: Revenue {YEAR}</Heading>
                <Paragraph>
                    Main target is to have{' '}
                    <strong>&euro;{REVENUE_TARGET.toLocaleString()}</strong> in{' '}
                    <strong>newly won</strong> revenue by the end of {YEAR}. The
                    way this is calculated in the graph below is by summing up
                    the values of all tasks created after week 34 in Asana which
                    are currently in the{' '}
                    <span className="underline">Closed Won</span> section of the
                    Sales pipeline.
                    <br />
                    <br />
                    The graph below shows the potential value generated, as well
                    as the realised value. The potential value is calculated by
                    looking at the <i>Discovery</i> and <i>Negotiation</i>{' '}
                    section in the Sales pipeline and taking into consideration
                    the conversion rate ({CONVERSION_PERCENTAGE}%) of potential
                    projects into won projects. It also includes the value
                    generated in the <i>Closed Won</i> section, considering it
                    was potential value before it became realised value.
                </Paragraph>
                <RevenueChart data={revenueGraphData} />
                <Table
                    data={revenueGraphData}
                    title="Supporting data"
                    text="The data below shows which entries represent a certain value for a given
      week number"
                />

                <Heading className="text-2xl mb-8 font-bold mt-16">
                    Goal #2: Getting to 5 billable hours per team member per
                    day.
                </Heading>
                <Paragraph>
                    For every staff member that is billable we agreed on the
                    ambition of achieving a minimum of 5 billable hours per day.
                    The chart below shows data for the progress so far.
                </Paragraph>
                <BillableChart data={billabillityGraphData} />
            </div>
            <div className="my-4 text-center text-sm">
                Made with ❤️ by{' '}
                <a
                    href="https://github.com/robbertvancaem"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-sky-200 hover:text-orange-400 underline"
                >
                    Robbert van Caem
                </a>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const [revenueGraphData, billabillityGraphData] = await Promise.all([
        revenue(),
        billability(),
    ])

    const lastUpdate = new Date().toLocaleString()

    return {
        props: {
            revenueGraphData,
            billabillityGraphData,
            lastUpdate,
        },
        revalidate: 1,
    }
}
