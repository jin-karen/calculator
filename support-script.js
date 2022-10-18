//add calculator log, keyboard, and help support display on calculator
const supportBtns = document.querySelectorAll(".supportBtn");
const logDisplay = document.getElementById("logDisplay");
const keyDisplay = document.getElementById("keyDisplay");
const helpDisplay = document.getElementById("helpDisplay");
supportBtns.forEach((button) => {
    button.addEventListener("click", ()=> {
        console.log("hi");
        console.log(button.id);
        switch(true) {
            case (button.id === "logBtn"):
                logDisplay.classList.toggle("hidden");
                break;
            case (button.id === "keyBtn"):
                keyDisplay.classList.toggle("hidden");
                if (keyDisplay.classList.contains("keySupportUsage")) {
                    keyDisplay.classList.toggle("keySupportUsage");
                }
                break;
            case (button.id === "helpBtn"):
                helpDisplay.classList.toggle("hidden");
                break;
        }
    })
})

//add keyboard support on calculator
//keyboard support setup
let keyAnswer;
keyDisplay.addEventListener("click", () => {
    keyDisplay.classList.toggle("keySupportUsage");
})

//adding keyboard event listeners for keyboard calculator logic
document.addEventListener("keydown", (event) => {
    const validNums = ["0","1","2","3","4","5","6","7","8","9","."];
    const validOperators = ["+","-","*","/","%",];
    const validFunctions = ["Backspace","Escape","=","Enter"];
    if (keyDisplay.classList.contains("keySupportUsage")) {
        switch (true) {
            case(validNums.includes(event.key)):
                console.log(keyAnswer);
                if (keyAnswer) {
                    //clear previous answer and screen if starting a new expression
                    keyAnswer = null;
                    keyDisplay.textContent = "";
                }
                keyDisplay.textContent += event.key;
                break;
            case(validOperators.includes(event.key)):
                console.log(event.key);
                keyDisplay.textContent += event.key;
                keyAnswer = null;
                break;
            case(validFunctions.includes(event.key)):
                parseAndEvaluate(event,validNums,validOperators,validFunctions);
                break;
        }
    }    
    console.log("end");
})

//function to evaluate and return the expression given by the keyboard
function parseAndEvaluate(event,validNums,validOperators,validFunctions) {
    console.log(event.key);
    if (event.key === "Backspace") {
        keyDisplay.textContent = keyDisplay.textContent.slice(0,-1);
        console.log(keyDisplay);
    } else if (event.key === "Escape") {
        keyDisplay.classList.toggle("keySupportUsage");
        console.log(keyDisplay);
    } else {
        const expression = keyDisplay.textContent;
        console.log(expression);
        let parsedExpression = "";
        for (const char of expression) {
            if (validNums.includes(char)) {
                parsedExpression += char;
            } else if (validOperators.includes(char)) {
                parsedExpression += ",";
                parsedExpression += char;
                parsedExpression += ",";
            }
        }
        parsedExpression = parsedExpression.split(",");
        while (parsedExpression.length > 1) {
            console.log(parsedExpression);
            keyAnswer = operate(parsedExpression[1], Number(parsedExpression[0]), Number(parsedExpression[2]));
            keyCalculatorLog(parsedExpression,keyAnswer);
            parsedExpression.shift();
            parsedExpression.shift();
            parsedExpression.shift();
            parsedExpression.unshift(keyAnswer)
            console.log(parsedExpression);
            
        }
        console.log(parsedExpression);
        console.log(keyAnswer);
        keyDisplay.textContent = limit10Dec(keyAnswer);
        
    }
}

//add calculator log support on calculator
//calculator log support logic for calculator
function calculatorLog(){
    console.log("yellow")
    logEquation = `${firstNum} ${operator} ${secondNum}   =   ${answer}\n`;
    logDisplay.textContent += logEquation;
}

//calculator log support logic for key support
function keyCalculatorLog(parsedExpression, keyAnswer){
    console.log("yellow")
    logEquation = `${parsedExpression[0]} ${parsedExpression[1]} ${parsedExpression[2]}   =   ${keyAnswer}\n`;
    logDisplay.textContent += logEquation;
}

//clear calculator log - only called when clear is pressed on calculator
function clearCalculatorLog() {
    logDisplay.textContent = "";
}

