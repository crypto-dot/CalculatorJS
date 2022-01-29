let buttonNums = document.querySelectorAll(".buttonNum");
let buttonOperators = document.querySelectorAll(".buttonOperator");
let equal = document.querySelector(".buttonEquals");
let backSpace = document.querySelector(".buttonBackSpace");
let displayOperands = document.querySelector(".operands");
let displayResults = document.querySelector(".results");

let numbers = [];
let stopIndex = -1;
let defaultZero = true;
let displayOperandsNoSpaces = displayOperands.textContent;
let atLeastOneOperator = false;
let precedessorIsOperator = false;
let decimalPoint = false;
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
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ",'');
    }
    else if(displayOperandsNoSpaces.length >= MAX_CHARSPACE - 2 && !atLeastOneOperator){
        return;
    }
    else if(displayOperandsNoSpaces.length == MAX_CHARSPACE) {
        return;
    }
    else {
        displayOperands.textContent += number;
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
    }
    precedessorIsOperator = false;
}

const buttonOperatorClicked = function(e) {
    if(!precedessorIsOperator && !(displayOperandsNoSpaces.length == MAX_CHARSPACE)) {
        numbers.push(displayOperandsNoSpaces.slice(stopIndex + 1, displayOperandsNoSpaces.length));
        stopIndex += displayOperandsNoSpaces.length;
        displayOperands.textContent += this.textContent;
        displayOperandsNoSpaces = displayOperands.textContent.replace(" ", "    ");
        stopIndex++;
        precedessorIsOperator = true;
    }
    else {
        return;
    }
}

const buttonEqualClicked = function(e) {
    //trim the expression
    numbers.push(stopIndex + 1, displayOperandsNoSpaces.length);
    const evaluationExpression = displayOperands.textContent.split("x");
    const evaluationExpression2 = displayOperands.textContent.split("-");
    const evaluationExpression3 = displayOperands.textContent.split("+");
    const evaluationExpression4 = displayOperands.textContent.split("/");
    if(evaluationExpression.length - 1 === 0 && evaluationExpression2.length - 1 === 0 && evaluationExpression3.length - 1 === 0 && evaluationExpression4.length - 1 === 0){
        displayResults.textContent = displayOperands.textContent;
    }

    if(!(evaluationExpression.length === 0) && !(evaluationExpression4.length ===0))
    console.log(evaluationExpression);
    console.log(evaluationExpression2);
    console.log(evaluationExpression3);
    console.log(evaluationExpression4);
}

const addition = function(...args) {

}
const subtraction = function(...args) {

}
const multplication = function(...args) {

}
const division = function(...args) {

}







const backSpaceClicked = function(e) {
    let endingChar = displayOperands.textContent.charAt(displayOperands.length-1);
    if(endingChar === "x" || endingChar === "+" || endingChar === "-" || endingChar === "/" ){
        precedessorIsOperator = false;
    }
    displayOperands.textContent = displayOperands.textContent.slice(0, displayOperands.textContent.length - 1);
    displayOperandsNoSpaces = displayOperands.textContent.replace(" ","");
    if(displayOperands.textContent.length === 0){
        defaultZero = true;
        displayOperands.textContent = 0;
    }
}
equal.addEventListener("click", buttonEqualClicked);
buttonOperators.forEach(button => button.addEventListener("click",buttonOperatorClicked));
buttonNums.forEach(button => button.addEventListener("click", buttonNumClicked));
backSpace.addEventListener("click", backSpaceClicked);
