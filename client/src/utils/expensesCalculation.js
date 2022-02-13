// this function expects array of object like expenses from database
// the output is to calculate and return the whole amount keys
export function sumArrayValues(arrOfObjects) {
  const numbers = arrOfObjects.map((obj) => obj.amount);
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum;
}

// this function expects the following
//1- arr = the array of objects for any kind of expenses
//2- from and to = dates to filter the data and calculate the amount keys inside it
//3- set state function from the component to change it with new calculation
export function resultByDateRange(arr, from, to, setValueFn) {
  const wantedDatesArr = arr.filter(
    (obj) => obj.date >= from && obj.date <= to
  );
  setValueFn(sumArrayValues(wantedDatesArr));
}
