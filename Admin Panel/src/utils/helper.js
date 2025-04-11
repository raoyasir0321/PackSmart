const netIncomeCalculator = (revData) => {
  if (
    revData &&
    revData.datasets &&
    revData.datasets.length > 0 &&
    revData.datasets[0].data.length >= 2
  ) {
    const dataArray = revData.datasets[0].data;
    const currentRev = dataArray[dataArray.length - 1];
    const prevRev = dataArray[dataArray.length - 2];
    const difference = currentRev - prevRev;
    const percentageChange = (difference / prevRev) * 100;
    const total = dataArray.reduce((acc, curr) => acc + curr, 0);
    return {
      netAmount: total,
      netPercentage: percentageChange.toFixed(2),
    };
  }
  return null;
};

const totalReturnCalculator = (revData) => {
  if (
    revData &&
    revData.datasets &&
    revData.datasets.length > 0 &&
    revData.datasets[0].data.length >= 2
  ) {
    const dataArray = revData.datasets[0].data;
    const firstRev = dataArray[0];
    const lastRev = dataArray[dataArray.length - 1];
    const difference = lastRev - firstRev;
    const percentageReturn = (difference / firstRev) * 100;
    return { absolute: difference, percentage: percentageReturn.toFixed(2) };
  }
  return { absolute: 0, percentage: 0 };
};

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};
export { netIncomeCalculator, totalReturnCalculator, monthOrder };
