import {
  HARVEST_BASE_URL,
  HARVEST_ACCESS_TOKEN,
  HARVEST_ACCOUNT_ID,
} from "../../constants";

const auth = {
  headers: {
    "Harvest-Account-Id": HARVEST_ACCOUNT_ID,
    Authorization: `Bearer ${HARVEST_ACCESS_TOKEN}`,
  },
};

const getEntries = async (from, to) => {
  if (!from || !to) {
    throw new Error("The parameters 'from' and 'to' need to be set");
  }

  const url = `${HARVEST_BASE_URL}/reports/time/team?from=${from}&to=${to}`;
  const res = await fetch(url, auth);
  const data = await res.json();
  return data.results;
};

export default getEntries;
