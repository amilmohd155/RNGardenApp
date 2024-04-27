function getTimestampMsNDaysFromNow(n: number): Date {
  const currentDate = new Date();

  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + n,
  );
  newDate.setHours(9, 30, 0, 0);

  return newDate;
}

function getDaysLeft(date: Date): number {
  const currentDate = new Date();

  const diffTime = date.getTime() - currentDate.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getDaysLeftAsString(date: Date): string {
  const currentDate = new Date();

  const diffTime = date.getTime() - currentDate.getTime();

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Overdue, delayed by " + Math.abs(diffDays) + " days";
  }
  if (diffDays === 0) {
    return "Today";
  }
  return `in ${diffDays} days`;
}

export { getTimestampMsNDaysFromNow, getDaysLeftAsString, getDaysLeft };
