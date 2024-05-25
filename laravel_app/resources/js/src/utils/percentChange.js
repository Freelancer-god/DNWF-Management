export function percentChange(array) {
  const lastElement = array[array.length - 1];
  const secondLastElement = array[array.length - 2];
  const difference = lastElement - secondLastElement;
  const percentage = difference / (secondLastElement === 0 ? 1 : secondLastElement);
  return percentage * 100;
}
