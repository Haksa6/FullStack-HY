interface Arguments {
  Results: Array<number>;
  target: number;
}
export const parseArgumentsResults = (Results: Array<number>, target: number): Arguments => {

  if (!Results.some(isNaN) && !isNaN(target)) {
    return {
      Results: Results,
      target: target
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (Results: Array<number>, target: number): Results => {
  const periodLength = Results.length;
  const trainingDays = Results.filter(value => value > 0).length;
  const resultsSum = Results.reduce((a,b) => a + b, 0);
  const average = resultsSum / periodLength;
  const success = average > target ? true : false;
  let rating;
  let ratingDescription;

  if(resultsSum < 10){
    ratingDescription = 'bad';
    rating = 1;
  }else if(resultsSum>10 && resultsSum <20){
    ratingDescription = 'decent';
    rating = 2;
  }else{
    ratingDescription = 'great';
    rating = 3;
  }


  return{
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};


