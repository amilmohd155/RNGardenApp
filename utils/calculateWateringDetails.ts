type Range = {
  max: number;
  min: number;
};

export const calculateWateringPortion = (preference: Range): number => {
  const min = preference.min;
  const max = preference.max;

  const out: Range = { max: 500, min: 50 };

  const minMapped = map(min, out);
  const maxMapped = map(max, out);

  const avg = (minMapped + maxMapped) / 2;

  const wateringPortion = Math.floor(avg / 50) * 50;

  return wateringPortion;
};

export const calculateWateringPeriod = (preference: Range) => {
  const out: Range = { max: 15, min: 1 };

  const minMapped = map(preference.min, out);
  const maxMapped = map(preference.max, out);

  const avg = (minMapped + maxMapped) / 2;

  const wateringPeriod = Math.floor(avg);
  console.log(
    "🚀 ~ file: calculateWateringDetails.ts:31 ~ calculateWateringPeriod ~ wateringPeriod:",
    wateringPeriod,
  );

  return wateringPeriod;
};

/* Note, "slope" below is a constant for given numbers, so if you are calculating
   a lot of output values, it makes sense to calculate it once.  It also makes
   understanding the code easier 
   * slope = (outMax - outMin) / (inMax - inMin) --> slope = 225 = (500 - 50) / (3 - 1)
   * output = outMin + slope * (value - inMin) --> output = 50 + 225 * (value - 1)
   */
function map(value: number, out: Range): number {
  const inMax = 3;
  const inMin = 1;

  const outMax = out.max;
  const outMin = out.min;

  const slope = (outMax - outMin) / (inMax - inMin);

  return outMin + slope * (value - inMin);
}
