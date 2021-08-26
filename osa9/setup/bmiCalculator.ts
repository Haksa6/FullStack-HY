export interface bmiValues {
  height: number;
  weight: number;
}
export const parseArguments = (height: number, weight: number): bmiValues => {
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height: height,
      weight: weight
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


export const calculateBmi = (height: number, weight: number) : string => {
  const bmi = Number(weight/(height/100*height/100));
  console.log(bmi);
  if(bmi > 40){
    return 'Morbidly Obese';
  }else if(bmi > 35 && bmi < 39.9){
    return 'Severely Obese';
  }else if(bmi > 30 && bmi < 34.9){
    return 'Obese';
  }else if(bmi > 25 && bmi < 29.9){
    return 'Overweight';
  }else if(bmi > 18.5 && bmi < 24.9){
    return 'Healthy weight';
  }else if(bmi < 18.5){
    return 'Underweight';
  }else{
    return 'Error';
  }
};
