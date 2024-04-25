function getTimestampMsNDaysFromNow(n: number): string {
  // Get current timestamp in milliseconds
  const currentTimestamp = new Date().getTime();

  // Calculate timestamp n days from now
  const futureTimestamp = currentTimestamp + n * 24 * 60 * 60 * 1000;

  return new Date(futureTimestamp).toLocaleDateString("en-GB");
}

export { getTimestampMsNDaysFromNow };
