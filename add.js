export function add(numbersString) {
  if (numbersString === "") {
    return 0;
  }

  let delimiter = /[\n,]/;
  let numbersToAdd = numbersString;

  if (numbersString.startsWith("//")) {
    const delimiterEndIndex = numbersString.indexOf("\n");
    delimiter = new RegExp(numbersString.substring(2, delimiterEndIndex));
    numbersToAdd = numbersString.substring(delimiterEndIndex + 1);
  }

  const numbersArray = numbersToAdd
    .split(delimiter)
    .map(Number)
    .filter((num) => num <= 1000);
  const negativeNumbers = numbersArray.filter((num) => num < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed: ${negativeNumbers.join(",")}`
    );
  }

  return numbersArray.reduce((sum, num) => sum + num, 0);
}
