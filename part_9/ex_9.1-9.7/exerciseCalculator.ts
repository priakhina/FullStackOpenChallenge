interface ExerciseCalculatorResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

enum ExerciseRating {
  Bad = 1,
  Good,
  Excellent,
}

enum ExerciseRatingDescription {
  Bad = "Your progress doesn't look so good :( You can definitely do better!",
  Good = "Your progress looks good! :) You're almost there!",
  Excellent = "You've reached your target! :D",
}

interface ExerciseValues {
  targetAmount: number;
  dailyExerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  args.splice(0, 2);

  const numericArgs = args
    .map((arg) => parseFloat(arg))
    .filter((arg) => !isNaN(arg));

  if (numericArgs.length < args.length)
    throw new Error('All arguments must be numberic values.');
  if (numericArgs.length < 2)
    throw new Error('At least 2 numeric arguments must be provided.');

  const [targetAmount, ...dailyExerciseHours] = numericArgs;

  return { targetAmount, dailyExerciseHours };
};

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): ExerciseCalculatorResult => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(
    (exerciseHours) => exerciseHours !== 0
  ).length;
  const average: number =
    dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success: boolean = average >= targetAmount;

  const averageInPercent: number = (average / targetAmount) * 100;
  const rating: number =
    averageInPercent >= 100
      ? ExerciseRating.Excellent
      : averageInPercent >= 70
      ? ExerciseRating.Good
      : ExerciseRating.Bad;
  const ratingKey: string = ExerciseRating[rating];
  /*
   * Source: https://stackoverflow.com/questions/50417254/dynamically-access-enum-in-typescript-by-key
   */
  const ratingDescription: string =
    ExerciseRatingDescription[ratingKey as keyof typeof ExerciseRating];

  return {
    periodLength,
    trainingDays,
    target: targetAmount,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { targetAmount, dailyExerciseHours } = parseExerciseArguments(
    process.argv
  );
  console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch (error: unknown) {
  console.log(
    'Failed to calculate exercises:',
    error instanceof Error ? error.message : 'Unknown error.'
  );
}
