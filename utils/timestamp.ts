function getTimestampMsNDaysFromNow(n: number): string {
  // Get current timestamp in milliseconds
  const currentTimestamp = new Date().getTime();

  // Calculate timestamp n days from now
  const futureTimestamp = currentTimestamp + n * 24 * 60 * 60 * 1000;

  return new Date(futureTimestamp).toLocaleDateString("en-GB");
}

//date format: dd/mm/yyyy
function getDaysLeft(date: string): string {
  const [day, month, year] = date.split("/").map(Number);

  const formattedDate = new Date(year, month - 1, day);

  const currentDate = new Date();

  const diffTime = formattedDate.getTime() - currentDate.getTime();

  const diffDays = Math.abs(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  if (diffDays < 1) {
    return "Today";
  }
  return `in ${diffDays} days`;
}

export { getTimestampMsNDaysFromNow, getDaysLeft };
