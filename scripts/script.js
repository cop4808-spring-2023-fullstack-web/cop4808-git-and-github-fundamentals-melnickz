let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll("button");

window.addEventListener("keydown", function (e) {
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

function updateDisplay() {
    const display = document.getElementById("display");
    display.innerText = displayValue;
    if (displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}

updateDisplay();

function clickButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            if (buttons[i].classList.contains("operand")) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains("operator")) {
                inputOperator(buttons[i].value);
            } else if (buttons[i].classList.contains("equals")) {
                inputEquals();
                updateDisplay();
            } else if (buttons[i].classList.contains("decimal")) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains("percent")) {
                inputPercent(displayValue);
                updateDisplay();
            } else if (buttons[i].classList.contains("sign")) {
                inputSign(displayValue);
                updateDisplay();
            } else if (buttons[i].classList.contains("clear")) {
                clearDisplay();
                updateDisplay();
            } else if (buttons[i].classList.contains("ln")) { // natural log implementated
                naturalLog(displayValue); // calling natural log function on display value
                firstOperand = displayValue; // setting firstOperand to display value so future button presses work as expected
                updateDisplay(); // updating the display
            } else if (buttons[i].classList.contains("cos")) { // cosine implemented
                cos(displayValue);  // calling cosine function on display value
                firstOperand = displayValue; // setting firstOperand to display value so future button presses work as expected
                updateDisplay(); // updating the display
            } else if (buttons[i].classList.contains("sin")) { // sin implemented
                sin(displayValue); // calling sin function on display value
                firstOperand = displayValue; // setting firstOperand to display value so future button presses work as expected
                updateDisplay(); // updating the display
            } else if (buttons[i].classList.contains("tan")) { // tangent function implemented
                tan(displayValue); // calling tan function on display value
                firstOperand = displayValue; // setting firstOperand to display value so future button presses work as expected
                updateDisplay();
            }
        });
    }
}

clickButton();

function inputOperand(operand) {
    if (firstOperator === null) {
        if (displayValue === "0" || displayValue === 0) {
            //1st click - handles first operand input
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            //starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3rd/5th click - inputs to secondOperand
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            firstOperator
        );
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            secondOperator
        );
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            secondOperator
        );
        if (result === "lmao") {
            displayValue = "lmao";
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(
            Number(firstOperand),
            Number(secondOperand),
            firstOperator
        );
        if (result === "lmao") {
            displayValue = "lmao";
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = "0";
        displayValue += dot;
    } else if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function inputPercent(num) {
    displayValue = (num / 100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if (firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}

function operate(x, y, op) {
    if (op === "+") {
        return x + y;
    } else if (op === "-") {
        return x - y;
    } else if (op === "*") {
        return x * y;
    } else if (op === "/") {
        if (y === 0) {
            return "lmao";
        } else {
            return x / y;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}

function naturalLog(num) { // natural log function
    if (num > 0) { // if number is in domain of natural log 
        return (displayValue = Math.log(num).toFixed(9)); // returning natural log of display value rounded to 9 decimal places
    } else return (displayValue = "DOMAIN ERROR"); // returning "DOMAIN ERROR" if domain out of range
}

function cos(num) { // cosine function
    return (displayValue = Math.cos(num).toFixed(9)); // returning cosine of display value rounded to 9 decimal places
}

function sin(num) { // sin function
    return (displayValue = Math.sin(num).toFixed(9)); // returning sin of dipslay value rounded to 9 decimal places
}

function tan(num) { // tangent function
    return (displayValue = Math.tan(num).toFixed(9)); //returning tangent of display value rounded to 9 decimal places
}
