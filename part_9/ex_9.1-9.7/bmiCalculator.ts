const calculateBmi = (heightInCm: number, weightInKg: number): number => {
  const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
  return Math.round(bmi * 10) / 10; // rounding to one decimal place
};

const defineBmiCategory = (bmi: number): string => {
  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi <= 16.9:
      return 'Underweight (Moderate thinness)';
    case bmi <= 18.4:
      return 'Underweight (Mild thinness)';
    case bmi <= 24.9:
      return 'Normal (Healthy weight)';
    case bmi <= 29.9:
      return 'Overweight (Pre-obese)';
    case bmi <= 34.9:
      return 'Obese (Class I)';
    case bmi <= 39.9:
      return 'Obese (Class II)';
    case bmi >= 40:
      return 'Obese (Class III)';
    default:
      break;
  }
};

console.log(defineBmiCategory(calculateBmi(180, 74)));
