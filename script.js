// global variable
let operator = "";
let previousValue = "";
let currentValue = "";

// select button using DOM
const clear = document.querySelector("#clear-btn");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const previousScreen = document.querySelector(".previous");
const currentScreen = document.querySelector(".current");

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    currentScreen.textContent = currentValue;
  })
);

operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
    previousScreen.textContent = `${previousValue} ${operator}`;
    currentScreen.textContent = currentValue;
  })
);

// clear button click
clear.addEventListener("click", () => {
  previousValue = "";
  currentValue = "";
  operator = "";
  previousScreen.textContent = currentValue;
  currentScreen.textContent = currentValue;
});

// when equal button click
equal.addEventListener("click", () => {
  if (currentValue !== "" && previousValue !== "") {
    calculate();
    previousScreen.textContent = "";
    if (previousValue.length <= 5) {
      currentScreen.textContent = previousValue;
    } else {
      currentScreen.textContent = previousValue.slice(0, 5) + "...";
    }
  }
});

function handleNumber(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}
