//basic mathematical functions
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0) {
        return "Error";
    }
    return a / b;
}

function modulo(a,b) {
    if (b === 0) {
        return "Error";
    }
    return a % b;
}

function operate(operator,a,b) {
    if (operator === "+") {
        return add(a,b);
    } else if (operator === "-") {
        return subtract(a,b);
    } else if (operator === "*") {
        return multiply(a,b);
    } else if (operator === "/") {
        return divide(a,b);
    } else if (operator === "%") {
        return modulo(a,b);
    }
}

//set up for display and calculator logic
const buttons = document.querySelectorAll("input");
const display = document.querySelector("th");
let firstNum = "";
let secondNum = "";
let operator = "";
let answer = "";

//add event listener for all buttons for calculator to run
buttons.forEach((button) => {
    button.addEventListener("click",() => {
        useCalculator(button);
    });
})

//calculator logic
function useCalculator(button){
    switch(true) {
        case (button.classList.contains("num")):
            if (!operator) { //inputting first value
                if (button.value === "." && firstNum.includes(".")) return; 
                firstNum += button.value;
                answer = "";
                display.textContent = firstNum;
            } else if (answer && firstNum === "") { //inputting second value (to operate on the last answer)
                if (button.value === "." && secondNum.includes(".")) return;
                firstNum = String(answer);
                answer = "";
                secondNum += button.value;
                display.textContent = secondNum;
            } else { //inputting second value (to operate on the first value)
                if (button.value === "." && secondNum.includes(".")) return;
                if (firstNum === "") firstNum = "0";
                secondNum += button.value;
                display.textContent = secondNum;
            }
            break;
        case (button.classList.contains("operator")):
            if (!secondNum){//to add or change the operator before inputting second value
                operator = button.value;
                unhighlight();
                button.classList.toggle("highlight");
            } else{//to add a second operator to the existing two-term expression
                evaluate()
                clear()
                operator = button.value;
                button.classList.toggle("highlight");
            }
            break;
        case (button.classList.contains("equal")):
            if (firstNum === "-") firstNum = "";
            if (secondNum === "-") secondNum ="";
            evaluate();
            display.textContent = answer;
            clear()
            break;
        case (button.classList.contains("clear")):
            clear();
            display.textContent = "";
            answer = "";
            clearCalculatorLog();
            break;
        case (button.classList.contains("sign")):
            negate();
            break;
        case (button.classList.contains("back")):
            backspace();
            break;
    }
}

//evaluate the mathematical expression
function evaluate() {
    if (!firstNum && !secondNum) { //if no new values, return last available answer 
        answer = answer;
    } else if (!secondNum) { //if no second values inputted, return first value
        answer = firstNum;
    } else if (firstNum === "Error") {
        answer = "Error";
    } else{
        answer = limit8Dec(operate(operator,Number(firstNum),Number(secondNum)));
        calculatorLog();
    }
    unhighlight();
}

//Limit the answer to 8 decimal places if applicable
function limit8Dec(num){
    return Math.round(num * 100000000) / 100000000;
}

//unhighlighting any highlighted buttons by toggling class off
function unhighlight() {
    const highlighted = document.querySelectorAll(".highlight");
    for (const buttons of highlighted) {
        buttons.classList.toggle("highlight");
    }
}

//clear all values except answer
function clear() { 
    firstNum = "";
    operator = "";
    secondNum = "";
}

//turn positive numbers into negative numbers and vice versa
function negate() {
    if (answer && !operator) { //negating answer
        if (answer === "Error") {
            return;
        }
        answer = String(-answer);
        display.textContent = answer;
    } else if (!firstNum && !operator) { //negating first value before numbers inputted
        firstNum = "-";
        display.textContent = firstNum;
    } else if (!operator) { //negating first value
        if (firstNum === "-") {
            firstNum = "";
        } else {
            firstNum = String(-firstNum);
        }
        display.textContent = firstNum;
    } else if (!secondNum) { //negating second value before numbers for second value inputted
        secondNum = "-";
        display.textContent = secondNum;
    } else { //negating second value
        if (secondNum === "-") {
            secondNum = "";
        } else {
            secondNum = String(-secondNum);
        }
        display.textContent = secondNum;
    }
}

//deleting values in the first or second Num
function backspace() {
    if (!operator && firstNum) { //backspacing values in the firstNum
        firstNum = firstNum.slice(0,-1); 
        display.textContent = firstNum;
    } else if (secondNum) { //backspacing values in the secondNum
        secondNum = secondNum.slice(0,-1); 
        display.textContent = secondNum;
    }
}

