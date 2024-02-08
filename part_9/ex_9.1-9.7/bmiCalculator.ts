const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
  const roundedBmi = Math.round(bmi * 10) / 10; // rounding to one decimal place

  switch (true) {
    case roundedBmi < 16:
      return 'Underweight (Severe thinness)';
    case roundedBmi <= 16.9:
      return 'Underweight (Moderate thinness)';
    case roundedBmi <= 18.4:
      return 'Underweight (Mild thinness)';
    case roundedBmi <= 24.9:
      return 'Normal (Healthy weight)';
    case roundedBmi <= 29.9:
      return 'Overweight (Pre-obese)';
    case roundedBmi <= 34.9:
      return 'Obese (Class I)';
    case roundedBmi <= 39.9:
      return 'Obese (Class II)';
    case roundedBmi >= 40:
      return 'Obese (Class III)';
    default:
      break;
  }
};

console.log(calculateBmi(180, 74));
