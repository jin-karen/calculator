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

let expression = [];
// const buttons = document.querySelectorAll("button");
const display = document.querySelector("th");

// buttons.forEach((button) => {
//     button.addEventListener('click',() => {
//         console.log("hi")
//         console.log(button.alt);
//         const selection = button.alt;
//         expression.push(selection);
//         display.textContent = selection;
//     });
// })

const buttons = document.querySelectorAll("input");

buttons.forEach((button) => {
    button.addEventListener('click',() => {
        const selection = button.value;
        expression.push(selection);
        console.log(selection);
        console.log(expression);
        display.textContent = selection;
    });
})
