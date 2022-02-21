// this function expects array of object like expenses from database
// the output is to calculate and return the whole amount keys
export function sumArrayAmounts(arrOfObjects) {
  const numbers = arrOfObjects.map((obj) => obj.amount);
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum;
}
