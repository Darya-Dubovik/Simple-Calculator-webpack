import "./style.css";

const display = document.querySelector(".display");
const ac = document.querySelector(".ac");
const buttons = document.querySelector(".buttons");
const toggle = document.querySelector(".toggle");
const icon = document.querySelector("i");

let firstOperand = "";
let secondOperand = "";
let operator = "";
let finish = false;

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];
const symbols = ["÷", "×", "−", "+"];

function clearAll() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  finish = false;
  display.textContent = "0";
}

function pushPlusMinus() {
  if (!operator) {
    if (firstOperand) {
      firstOperand = firstOperand.startsWith("-")
        ? firstOperand.slice(1)
        : "-" + firstOperand;
      display.textContent = firstOperand.slice(0, 9);
    }
  } else {
    if (secondOperand) {
      secondOperand = secondOperand.startsWith("-")
        ? secondOperand.slice(1)
        : "-" + secondOperand;
      display.textContent = secondOperand.slice(0, 9);
    }
  }
}

function pushPercent() {
  if (firstOperand === "") return;

  let a = parseFloat(firstOperand.replace(",", ".")) || 0;
  let b = parseFloat(secondOperand.replace(",", ".")) || 0;

  if (operator === "") {
    firstOperand = String(a / 100).replace(".", ",");
    display.textContent = firstOperand.slice(0, 9);
    return;
  }

  let firstOperandPercent = 0;

  switch (operator) {
    case "+":
    case "−":
      firstOperandPercent = (a * b) / 100;
      break;
    case "×":
    case "÷":
      firstOperandPercent = b / 100;
      break;
  }

  secondOperand = String(firstOperandPercent).replace(".", ",");
  display.textContent = secondOperand.slice(0, 9);
}

function pushNumber(value) {
  if (finish) {
    finish = false;
  }

  if (operator === "") {
    if (value === "," && firstOperand.includes(",")) return;

    if (value === "," && firstOperand === "") {
      firstOperand = "0,";
    } else if (firstOperand === "") {
      firstOperand = value;
    } else if (firstOperand === "0" && value !== ",") {
      firstOperand = value;
    } else {
      firstOperand += value;
    }
    display.textContent = firstOperand.slice(0, 9);
  } else {
    if (value === "," && secondOperand.includes(",")) return;

    if (value === "," && secondOperand === "") {
      secondOperand = "0,";
    } else if (secondOperand === "") {
      secondOperand = value;
    } else if (secondOperand === "0" && value !== ",") {
      secondOperand = value;
    } else {
      secondOperand += value;
    }
    display.textContent = secondOperand.slice(0, 9);
  }

  return;
}

buttons.addEventListener("click", function (event) {
  const value = event.target.textContent;

  if (event.target.classList.contains("ac")) {
    return;
  } else {
    ac.onclick = clearAll;
  }

  if (event.target.classList.contains("plusMinus")) {
    pushPlusMinus();
    return;
  }

  if (event.target.classList.contains("percent")) {
    pushPercent();
    return;
  }

  if (numbers.includes(value)) {
    pushNumber(value);
  }

  if (symbols.includes(value)) {
    operator = value;
    display.textContent = operator;
    return;
  }

  if (value === "=") {
    if (!firstOperand) return;
    if (secondOperand === "") {
      secondOperand = firstOperand;
    }

    const a = parseFloat(firstOperand.replace(",", "."));
    const b = parseFloat(secondOperand.replace(",", "."));
    let result = 0;

    switch (operator) {
      case "÷":
        if (b === 0) {
          display.textContent = "Error";
          firstOperand = "";
          secondOperand = "";
          operator = "";
          return;
        } else {
          result = a / b;
        }
        break;
      case "×":
        result = a * b;
        break;
      case "−":
        result = a - b;
        break;
      case "+":
        result = a + b;
        break;
      default:
        result = b;
    }

    result = parseFloat(result.toFixed(9));
    const resultStr = String(result).replace(".", ",");

    if (resultStr.length >= 9) {
      display.textContent = resultStr.slice(0, 9);
    } else {
      display.textContent = resultStr;
    }

    firstOperand = resultStr;
    secondOperand = "";
    operator = "";
    finish = true;
  }
});

toggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (icon.classList.contains("fa-toggle-off")) {
    icon.classList.remove("fa-toggle-off");
    icon.classList.add("fa-toggle-on");
  } else {
    icon.classList.remove("fa-toggle-on");
    icon.classList.add("fa-toggle-off");
  }
});
