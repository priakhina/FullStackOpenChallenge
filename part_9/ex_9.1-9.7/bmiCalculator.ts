interface BmiValues {
  heightInCm: number;
  weightInKg: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  args.splice(0, 2);

  if (args.length !== 2)
    throw new Error('Exactly 2 numeric arguments must be provided.');

  const heightInCm = Number(args[0]);
  const weightInKg = Number(args[1]);

  if (!isNaN(heightInCm) && !isNaN(weightInKg)) {
    if (heightInCm <= 0 || weightInKg <= 0)
      throw new Error('The provided values must be greater than zero.');

    return { heightInCm, weightInKg };
  }

  throw new Error('All arguments must be numeric values.');
};

const calculateBmi = (heightInCm: number, weightInKg: number): number => {
  const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
  return Math.round(bmi * 10) / 10; // rounding to one decimal place
};

const defineBmiCategory = (bmi: number): string => {
  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi < 17:
      return 'Underweight (Moderate thinness)';
    case bmi < 18.5:
      return 'Underweight (Mild thinness)';
    case bmi < 25:
      return 'Normal (Healthy weight)';
    case bmi < 30:
      return 'Overweight (Pre-obese)';
    case bmi < 35:
      return 'Obese (Class I)';
    case bmi < 40:
      return 'Obese (Class II)';
    default:
      return 'Obese (Class III)';
  }
};

try {
  const { heightInCm, weightInKg } = parseBmiArguments(process.argv);
  console.log(defineBmiCategory(calculateBmi(heightInCm, weightInKg)));
} catch (error: unknown) {
  console.log(
    'Failed to calculate BMI:',
    error instanceof Error ? error.message : 'Unknown error.'
  );
}
