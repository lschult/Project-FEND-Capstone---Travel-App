// Pass in a date in the future
// this function will return the difference in number of days from the current date to the future date
function calculateDaysUntil(date) {
  const currentDate = new Date();
  const tripDate = new Date(date);
  const timeDifference = tripDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}

export { calculateDaysUntil };
