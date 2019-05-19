// const mySet = new Set();
// mySet.add('stability');

// console.log(mySet)

const trainingPhase = ["stability", "strength", "hypertrophy", "power"];

const reducedTrainingPhase = trainingPhase.reduce(
  (accum, current) => {
    console.log(accum, current)
    return {
      ...accum,
      [current]: false
    };
  },{}
);

console.log(reducedTrainingPhase)