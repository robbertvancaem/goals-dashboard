const mock = [{
  total_hours: 8,
  billable_hours: 4,
}]

const getEntries = async (from, to) => {
  if (!from || !to) {
    throw new Error("The parameters 'from' and 'to' need to be set");
  }

  return mock;
};

export default getEntries;
