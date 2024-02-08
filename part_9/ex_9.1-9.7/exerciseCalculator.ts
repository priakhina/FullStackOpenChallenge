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
      : averageInPercent >= 50
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
