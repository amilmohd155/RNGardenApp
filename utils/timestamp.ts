function getTimestampMsNDaysFromNow(n: number): number {
  const currentDate = new Date();

  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + n,
  );
  newDate.setHours(9, 30, 0, 0);

  return newDate.getTime();
}

//date format: dd/mm/yyyy
function getDaysLeft(date: Date): string {
  const currentDate = new Date();

  const diffTime = date.getTime() - currentDate.getTime();

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  console.log(diffDays);

  if (diffDays < 0) {
    return "Overdue, delayed by " + Math.abs(diffDays) + " days";
  }
  if (diffDays === 0) {
    return "Today";
  }
  return `in ${diffDays} days`;
}

export { getTimestampMsNDaysFromNow, getDaysLeft };
