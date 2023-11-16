// Pass in a date in the future
// this function will return the difference in number of days from the current date to the future date
const calculateDaysUntil = (futureDate) => {
  const differenceUsingDays = new Date(futureDate) - new Date();
  let daysUntil = new Date(differenceUsingDays) / (24 * 3600 * 1000);
  daysUntil = Number(Math.round(daysUntil));
  return daysUntil;
};

export { calculateDaysUntil };
