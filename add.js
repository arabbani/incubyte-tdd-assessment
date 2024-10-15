export function add(numbersString) {
  if (numbersString === "") {
    return 0;
  }

  const numbersArray = numbersString.split(",").map(Number);

  return numbersArray.reduce((sum, num) => sum + num, 0);
}
