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
    button.addEventListener('click',() => {
        useCalculator(button);
    });
})

//calculator logic
function useCalculator(button){
    if (button.classList.contains("num")) {
        console.log("num");
        if (!operator) { //inputting first value
            if (button.value === "." && firstNum.includes(".")) return; 
            firstNum += button.value;
            answer = ""
            console.log(firstNum)
            display.textContent = firstNum;
        } else if (answer && firstNum === "") { //inputting second value (to operate on the last answer)
            if (button.value === "." && secondNum.includes(".")) return;
            firstNum = String(answer);
            answer = "";
            secondNum += button.value;
            display.textContent = secondNum;
            console.log(firstNum, answer, operator, secondNum);
        } else { //inputting second value (to operate on the first value)
            if (button.value === "." && secondNum.includes(".")) return;
            if (firstNum === "") firstNum = "0";
            secondNum += button.value;
            display.textContent = secondNum;
            console.log(secondNum)
        }
    } else if (button.classList.contains("operator")) {
        console.log("operator");
        if (!secondNum){//to add or change the operator before inputting second value
            operator = button.value;
            display.textContent = operator;
            unhighlight();
            button.classList.toggle("highlight");
        } else{//to add a second operator to the existing two-term expression
            evaluate()
            clear()
            operator = button.value;
            display.textContent = operator;
        }
        console.log(operator);
    } else if (button.classList.contains("equal")) {
        console.log("equal");
        evaluate();
        display.textContent = answer;
        console.log(answer, firstNum, operator, secondNum);
        clear()
        console.log(answer, firstNum, operator, secondNum);
    } else if (button.classList.contains("clear")) {
        console.log("clear");
        clear();
        display.textContent = "";
        answer = "";
        console.log("hi",answer, firstNum, operator, secondNum);
    } else if (button.classList.contains("sign")) {
        negate();
    } 
}

//clear all values except answer
function clear() { 
    firstNum = "";
    operator = "";
    secondNum = "";
}

//evaluate the mathematical expression
function evaluate() {
    if (firstNum === "-") {
        firstNum = "";
    } else if (secondNum === "-") {
        secondNum ="";
    } 
    if (!firstNum && !secondNum) { //if no new values, return last available answer 
        answer = answer;
    } else if (!secondNum) { //if no second values inputted, return first value
        answer = firstNum;
    } else if (firstNum === "Error") {
        answer = "Error";
    } else{
        answer = (operate(operator,Number(firstNum),Number(secondNum)));
    }
    unhighlight()
}

//unhighlighting any highlighted buttons by toggling class off
function unhighlight() {
    const highlighted = document.querySelectorAll(".highlight");
    for (const buttons of highlighted) {
        buttons.classList.toggle("highlight");
    }
}

//turn positive numbers into negative numbers and vice versa
function negate() {
    console.log("sign"); 
    if (answer && !operator) { //negating answer
        if (answer === "Error") {
            return;
        }
        answer = String(-answer);
        console.log(answer);
        display.textContent = answer;
    } else if (!firstNum && !operator) { //negating first value before numbers inputted
        firstNum = "-";
        display.textContent = firstNum;
        console.log(firstNum, answer, operator, secondNum); 
    } else if (!operator) { //negating first value
        if (firstNum === "-") {
            firstNum = "";
        } else {
            firstNum = String(-firstNum);
        }
        display.textContent = firstNum;
        console.log(firstNum, answer, operator, secondNum);
    } else if (!secondNum) { //negating second value before numbers for second value inputted
        secondNum = "-";
        display.textContent = secondNum;
        console.log(secondNum)
    } else { //negating second value
        if (secondNum === "-") {
            secondNum = "";
        } else {
            secondNum = String(-secondNum);
        }
        display.textContent = secondNum;
        console.log(secondNum)
    }
}

