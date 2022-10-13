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
    return a / b;
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
    }
}

const buttons = document.querySelectorAll("input");
const display = document.querySelector("th");
let firstNum = "";
let secondNum = "";
let operator = "";
let answer = "";

/**console.log(selection);
        console.log(expression);= button.value;
       
**/

buttons.forEach((button) => {
    button.addEventListener('click',() => {
        if (button.classList.contains("num")) {
            console.log("num");
            if (!operator) { //inputting first value
                firstNum += button.value;
                console.log(firstNum)
            } else if (answer && firstNum === "") { //inputting second value to add to the last answer
                firstNum = answer;
                answer = "";
                secondNum += button.value;
                console.log(firstNum, answer, operator, secondNum);
            } else { //inputting second value to add to the first value
                secondNum += button.value;
                console.log(secondNum)
            }
        } else if (button.classList.contains("operator")) {
            console.log("operator");
            if (!secondNum){//to add or change the operator before inputting second value
                operator = button.value;
            } else{//to add a second operator to the existing expression
                evaluate()
                clear()
                operator = button.value;
            }
            console.log(operator);
        } else if (button.classList.contains("equal")) {
            console.log("equal");
            evaluate();
            console.log(answer, firstNum, operator, secondNum);
            clear()
            console.log(answer, firstNum, operator, secondNum);
        } else if (button.classList.contains("clear")) {
            console.log("clear");
            clear();
            answer = "";
            console.log("hi",answer, firstNum, operator, secondNum);
        } else if (button.classList.contains("sign")) {
            console.log("sign"); 
        } else if (button.classList.contains("decimal")) {
            console.log("decimal"); 
        }
        expression.push(selection);
        display.textContent = selection;
    });
})

//clear all values except answer
function clear() { 
    firstNum = "";
    operator = "";
    secondNum = "";
}

//evaluate the mathematical expression
function evaluate() {
    answer = operate(operator,Number(firstNum),Number(secondNum));
}
