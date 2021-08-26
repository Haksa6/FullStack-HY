import express from 'express';
const app = express();
import { parseArguments, calculateBmi } from './bmiCalculator';
import { parseArgumentsResults, calculateExercises} from './exerciseCalculator'

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const reqWeight = Number(req.query.weight);
  const reqHeight = Number(req.query.height);

  try {
    const { height, weight } = parseArguments(reqHeight, reqWeight);
    const bmi = calculateBmi(height,weight);
    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }catch(e) {
    res.send({
      error: e.message
    });
  }
});

app.post('/exercises', (req, res) => {
  const reqResults = req.body.daily_exercises;
  const reqTarget = req.body.target;

  try {
    const { Results, target} = parseArgumentsResults(reqResults, reqTarget);
    const result = calculateExercises(Results, target);
    res.send(result);
  }catch(e) {
    res.send({
      error: e.message
    });
  }
  
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});