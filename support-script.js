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
                if (event.key === "Backspace") {
                    keyDisplay.textContent = keyDisplay.textContent.slice(0,-1);
                    console.log(keyDisplay);
                } else if (event.key === "Escape") {
                    keyDisplay.classList.toggle("keySupportUsage");
                    console.log(keyDisplay);
                } else {
                    parseAndEvaluate(event,validNums,validOperators);
                    break;
                }
        }    
    console.log("end");
    }
})

//function to evaluate and return the expression given by the keyboard
function parseAndEvaluate(event,validNums,validOperators) {
    console.log(event.key);
    const expression = keyDisplay.textContent;
    console.log(expression);
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
        if (keyAnswer === "Error") {
            keyDisplay.textContent = keyAnswer;
        } else{
            keyDisplay.textContent = limit8Dec(keyAnswer);
        }
        
        console.log(keyAnswer);
    }
}


//add calculator log support on calculator
//calculator log support logic for calculator
let logLines = 0;
function calculatorLog(){
    console.log("yellow");
    let logEquation = `${firstNum} ${operator} ${secondNum}   =   ${answer}\n`;
    if (logEquation.length > 25) {
        logEquation = `${firstNum} ${operator} ${secondNum} \n= ${answer}\n`;
        logLines += 1;
    }
    logDisplay.textContent += logEquation;
    logLines += 1;
    console.log(logLines);
    limit16Lines();
}

//calculator log support logic for key support
function keyCalculatorLog(parsedExpression, keyAnswer){
    console.log("yellow")
    let logKeyEquation = `${parsedExpression[0]} ${parsedExpression[1]} ${parsedExpression[2]}  =  ${keyAnswer}\n`;
    if (logKeyEquation.length > 25) {
        logKeyEquation = `${parsedExpression[0]} ${parsedExpression[1]} ${parsedExpression[2]} \n= ${keyAnswer}\n`;
        logLines += 1;
    }
    logDisplay.textContent += logKeyEquation;
    logLines += 1;
    console.log(logLines);
    limit16Lines();
}

//clear calculator log - only called when clear is pressed on calculator
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
