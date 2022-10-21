//add calculator log, keyboard, and help support display on calculator
const supportBtns = document.querySelectorAll(".supportBtn");
const logDisplay = document.getElementById("logDisplay");
const keyDisplay = document.getElementById("keyDisplay");
const helpDisplay = document.getElementById("helpDisplay");
const keyClear = document.getElementById("keyClear");

//add event listeners on support buttons
supportBtns.forEach((button) => {
    button.addEventListener("click", ()=> {
        switch(true) {
            case (button.id === "logBtn"):
                logDisplay.classList.toggle("hidden");
                break;
            case (button.id === "keyBtn"):
                keyDisplay.classList.toggle("hidden");
                keyClear.classList.toggle("hidden");
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

//add keyboard support on calculator:
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
                if (keyAnswer) {
                    //clear previous answer and screen if starting a new expression
                    keyAnswer = null;
                    keyDisplay.textContent = "";
                }
                keyDisplay.textContent += event.key;
                break;
            case(validOperators.includes(event.key)):
                keyDisplay.textContent += event.key;
                keyAnswer = null;
                break;
            case(validFunctions.includes(event.key)):
                if (event.key === "Backspace") {
                    keyDisplay.textContent = keyDisplay.textContent.slice(0,-1);
                } else if (event.key === "Escape") {
                    keyDisplay.classList.toggle("keySupportUsage");
                } else {
                    parseAndEvaluate(event,validNums,validOperators);
                    break;
                }
        }    
    }
})

//function to evaluate and return the expression given by the keyboard
function parseAndEvaluate(event,validNums,validOperators) {
    const expression = keyDisplay.textContent;
    if (expression.includes("Error")) {
        keyAnswer  = "Error";
        keyDisplay.textContent = keyAnswer;
    } else{
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
            keyAnswer = operate(parsedExpression[1], Number(parsedExpression[0]), Number(parsedExpression[2]));
            keyCalculatorLog(parsedExpression,keyAnswer);
            parsedExpression.shift();
            parsedExpression.shift();
            parsedExpression.shift();
            parsedExpression.unshift(keyAnswer);
        }
        if (keyAnswer === "Error") {
            keyDisplay.textContent = keyAnswer;
        } else{
            keyDisplay.textContent = limit8Dec(keyAnswer);
        }
    }
}

//clear keyboard display when 'clear' button pressed
keyClear.addEventListener("click",()=> {
    keyDisplay.textContent = "";
})

//add calculator log support on calculator:
//calculator log support logic for calculator
let logLines = 0;
function calculatorLog(){
    let logEquation = `${firstNum} ${operator} ${secondNum}   =   ${answer}\n`;
    if (logEquation.length > 25) {
        logEquation = `${firstNum} ${operator} ${secondNum} \n= ${answer}\n`;
        logLines += 1;
    }
    logDisplay.textContent += logEquation;
    logLines += 1;
    limit16Lines();
}

//calculator log support logic for key support
function keyCalculatorLog(parsedExpression, keyAnswer){
    let logKeyEquation = `${parsedExpression[0]} ${parsedExpression[1]} ${parsedExpression[2]}  =  ${keyAnswer}\n`;
    if (logKeyEquation.length > 25) {
        logKeyEquation = `${parsedExpression[0]} ${parsedExpression[1]} ${parsedExpression[2]} \n= ${keyAnswer}\n`;
        logLines += 1;
    }
    logDisplay.textContent += logKeyEquation;
    logLines += 1;
    limit16Lines();
}

//clear calculator log - only called when 'C' is pressed on calculator
function clearCalculatorLog() {
    logDisplay.textContent = "";
    logLines = 0;
}

//limits the calculator log display to 16 lines, removing earlier ones
function limit16Lines() {
    while (logLines > 16) {
        let lines = logDisplay.textContent.split("\n");
        lines.shift();
        logDisplay.textContent = lines.join("\n");
        logLines -= 1;
    }
}
