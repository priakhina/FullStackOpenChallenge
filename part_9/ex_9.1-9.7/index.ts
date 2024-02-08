import express from 'express';
import {
  parseBmiArguments,
  calculateBmi,
  defineBmiCategory,
} from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (typeof height !== 'string' || typeof weight !== 'string')
      throw new Error(
        "Missing query parameters: The query must specify 'height' and 'weight'"
      );

    const { heightInCm, weightInKg } = parseBmiArguments([height, weight]);

    res.send({
      height: heightInCm,
      weight: weightInKg,
      bmi: defineBmiCategory(calculateBmi(heightInCm, weightInKg)),
    });
  } catch (error: unknown) {
    res.status(400).send({
      error: error instanceof Error ? error.message : 'Unknown error.',
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
