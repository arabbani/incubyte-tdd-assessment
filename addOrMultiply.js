export function addOrMultiply(numbersString) {
  if (numbersString === "") {
    return 0;
  }

  const metadata = getMetadata(numbersString);
  const numbersArray = getNumbersForOperation(
    numbersString,
    metadata.delimiter
  );
  disallowNegativeNumbers(numbersArray);

  return performOperationAndReturnResult(numbersArray, metadata.operation);
}

function getMetadata(numbersString) {
  const metadata = {
    delimiter: /[\n,]/,
    operation: "ADDITION",
  };
  const customDelimiters = getCustomDelimiters(numbersString);

  if (customDelimiters) {
    metadata.delimiter = new RegExp(`[\n,${customDelimiters.join("")}]`, "g");

    if (customDelimiters.length === 1 && customDelimiters[0] === "*") {
      metadata.operation = "MULTIPLICATION";
    }
  }

  return metadata;
}

function getCustomDelimiters(numbersString) {
  const delimiterEndIndex = getCustomDelimeterEndIndex(numbersString);

  if (delimiterEndIndex) {
    return numbersString
      .substring(2, delimiterEndIndex)
      .split(/[\[\]]/)
      .filter(Boolean);
  }

  return undefined;
}

function getCustomDelimeterEndIndex(numbersString) {
  if (numbersString.startsWith("//")) {
    return numbersString.indexOf("\n");
  }

  return undefined;
}

function getNumbersForOperation(numbersString, delimiter) {
  let numbers = numbersString;

  const delimiterEndIndex = getCustomDelimeterEndIndex(numbersString);

  if (delimiterEndIndex) {
    numbers = numbersString.substring(delimiterEndIndex + 1);
  }

  return numbers
    .split(delimiter)
    .map(Number)
    .filter((num) => num <= 1000);
}

function disallowNegativeNumbers(numbersArray) {
  const negativeNumbers = numbersArray.filter((num) => num < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed: ${negativeNumbers.join(",")}`
    );
  }
}

function performOperationAndReturnResult(numbersArray, operation) {
  if (operation === "MULTIPLICATION") {
    return numbersArray.reduce((mul, num) => mul * num, 1);
  }

  return numbersArray.reduce((acc, num) => acc + num, 0);
}
