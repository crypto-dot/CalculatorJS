let buttonNums = document.querySelectorAll(".buttonNum");
let buttonOperators = document.querySelectorAll(".buttonOperator");
let equal = document.querySelector(".buttonEquals");
let backSpace = document.querySelector(".buttonBackSpace");
let displayOperands = document.querySelector(".operands");
let displayResults = document.querySelector(".results");
let decimalPoint = document.querySelector(".buttonDot");

let defaultZero = true;
let displayOperandsNoSpaces = displayOperands.textContent;
let operatorCount= 0;
let precedessorIsOperator = false;
let canAddDecimalPoint = true;
const MAX_CHARSPACE = 44;

const buttonNumClicked = function(e) {
    let number = this.textContent;
    if(number === "0" && defaultZero){
        return; 
    }
    else if(defaultZero){
        displayOperands.textContent = number;
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
        defaultZero = false;
    }
    else if (displayOperandsNoSpaces.length === MAX_CHARSPACE/2){
        displayOperands.textContent += " ";
        displayOperands.textContent += number;
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
    }
    else if( (displayOperandsNoSpaces.length >= MAX_CHARSPACE - 2 && operatorCount != 0 ) || displayOperandsNoSpaces.length == MAX_CHARSPACE){
        return;
    }
    else {
        displayOperands.textContent += number;
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
    }
    precedessorIsOperator = false;
}

const buttonOperatorClicked = function(e) {
    if(!precedessorIsOperator && !(displayOperandsNoSpaces.length === MAX_CHARSPACE)) {
        canAddDecimalPoint = true;
        if (displayOperandsNoSpaces.length === MAX_CHARSPACE/2){
            displayOperands.textContent += " ";
            displayOperands.textContent += this.textContent;
            displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
            return;
        }
        displayOperands.textContent += this.textContent;
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ", "");
        precedessorIsOperator = true;
        operatorCount++;
    }
    else {
        return;
    }
}

const backSpaceClicked = function(e) {
    let endingChar = displayOperands.textContent.charAt(displayOperands.textContent.length-1);
    if(endingChar === "x" || endingChar === "+" || endingChar === "-" || endingChar === "/" ){
        if(displayOperandsNoSpaces.match(/\.*[0-9]+\.*[0-9]*\.*/g).length >= 1){
            let previousOperand = displayOperandsNoSpaces.match(/\.*[0-9]+\.*[0-9]*\.*/g)[displayOperandsNoSpaces.match(/\.*[0-9]+\.*[0-9]*\.*/g).length-1];
            if(previousOperand.includes(".")){
                canAddDecimalPoint = false;
            }
        }
        precedessorIsOperator = false;
        operatorCount--;
    }
    if(endingChar == '.'){
        canAddDecimalPoint = true;
    }
    displayOperands.textContent = displayOperands.textContent.slice(0, displayOperands.textContent.length - 1);
    displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
    if(displayOperands.textContent.length === 0){
        defaultZero = true;
        displayOperands.textContent = 0;
    }
}

const decimalPointClicked = function(e) {
    precedessorIsOperator = false;
    if(defaultZero){
        displayOperands.textContent = this.textContent;
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
        defaultZero = false;
        canAddDecimalPoint = false;
    }
    else if(canAddDecimalPoint) {
        displayOperands.textContent += this.textContent;
        canAddDecimalPoint = false;
    }
}
const buttonEqualClicked = function(e) {
    let temp = displayOperandsNoSpaces;
    try{
        result = evaluationExpression().toFixed(9);
    }
    catch(err){
        result = "Error: Divison by zero";
    }
    
    if(parseInt(result) - result === .000000000){
        result = parseInt(result);
    }
    if(isNaN(result)){
        displayResults.textContent = "ERROR";
    }
    displayResults.textContent = result;
    displayOperandsNoSpaces = temp;
}

const atomsParse = function () {
    if(!isNaN(Number(displayOperandsNoSpaces))){
        atom = displayOperandsNoSpaces;
        if(atom === ""){
            atom = NaN;
            return atom;
        }
        return atom;
    }
    try{
        atom = displayOperandsNoSpaces.match(/\.*[0-9]+\.*[0-9]*/)[0];
    }
    catch(err){
        return;
    }
    displayOperandsNoSpaces = displayOperandsNoSpaces.slice(atom.length);
    return atom;
}
const factorsParse = function () {
    let number1 = Number(atomsParse());
    for(;;){
        let operator = displayOperandsNoSpaces.charAt(0);
        if(operator !== '/' && operator !== 'x')
            return number1;
        displayOperandsNoSpaces = displayOperandsNoSpaces.slice(1);
        number2 = atomsParse(displayOperandsNoSpaces);
        if(operator == '/'){
            if(Number(number2)== 0){
                throw "Division By Zero";
            }
            number1/=Number(number2);
        }
        else 
            number1*=Number(number2);
    }
}

const summands = function () {
        let number1 = Number(factorsParse());
        for(;;){
            let operator = displayOperandsNoSpaces.charAt(0);
            if(operator !== '-' && operator !== '+'){
                return number1;
            }
            displayOperandsNoSpaces = displayOperandsNoSpaces.slice(1);
            number2 = factorsParse();
            if(operator === '-')
                number1 -= Number(number2);
            else 
                number1 += Number(number2);

        }
    
}

const evaluationExpression = function() {
    return summands();
}

decimalPoint.addEventListener("click", decimalPointClicked)
equal.addEventListener("click", buttonEqualClicked);
buttonOperators.forEach(button => button.addEventListener("click",buttonOperatorClicked));
buttonNums.forEach(button => button.addEventListener("click", buttonNumClicked));
backSpace.addEventListener("click", backSpaceClicked);

