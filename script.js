let input = {};
let calculation = {};

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (isNaN(a / b)) {
        return; // prevents "NaN"
    }
    return a / b;
}

function operate(operator, a, b) {
    // converts operands to floating-point
    a = parseFloat(a);
    b = parseFloat(b);

    // clears operator
    if (input.currentOperator) {
        operatorHighlight.remove(input.currentOperator);
        input.secondOperandExists = false;
        input.currentOperator = null;
    }

    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '\u{D7}') {
        return multiply(a, b);
    } else if (operator === '\u{F7}') {
        return divide(a, b);
    }
}

let display = document.querySelector('#display')
let decimalPoint = document.querySelector('#decimal-point');
let plusMinus = document.querySelector('#plus-minus');
let percentageEquivalent = document.querySelector('#percentage-equivalent');

// adds event listeners to each item, based on their respective html class
let btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btnBorderHighlight(btn);
    if (btn.classList.contains('number')) {
        btnNumberPress(btn);
    } else if (btn.classList.contains('operator')) {
        btnOperatorPress(btn);
    }
})

function btnBorderHighlight(btn) {
    btn.addEventListener('mousedown', function () {
        this.style.borderColor = 'hsl(0, 0%, 50%)';
    })
    btn.addEventListener('mouseup', function () {
        this.style.borderColor = 'transparent';
    })
}

let operatorHighlight = {
    create(operator) {
        operator.classList.add('highlighted');
    },
    remove(operator) {
        operator.classList.remove('highlighted');
    }
};

function btnNumberPress(number) {
    number.addEventListener('click', function() {

        // formatting for second operand
        if (input.currentOperator && !input.secondOperandExists) {
            display.innerText = '';
            operatorHighlight.remove(input.currentOperator);
            input.secondOperandExists = true;
        }

        // special rules for when decimal point or plus-minus is pressed
        if (this === decimalPoint && display.innerText.includes('.')) {
            return;
        } else if (this === plusMinus) {
            if (display.innerText.includes('-')) {
                display.innerText = display.innerText.replace('-', '');
            } else {
                display.innerText = '-' + display.innerText;
            }
            return;
        }

        // prevents a case of "01"
        if (display.innerText == 0) {
            display.innerText = display.innerText.replace('0', '');
        }

        // clears display if something was just calculated
        if (calculation.result) {
            display.innerText = this.innerText;
            calculation.result = null;
        } else {
            display.innerText += this.innerText;
        }

        // ensures first input is stored in "a"
        if (input.a && input.currentOperator) {
            input.b = display.innerText;
        } else {
            input.a = display.innerText
        }
    })
}

function btnOperatorPress(operator) {
    operator.addEventListener('click', function() {

        // forces each operand pair to be evaluated
        if (input.currentOperator) {
            input.b = display.innerText;
            calculation.result = operate(input.currentOperator.innerText, input.a, input.b);
            display.innerText = calculation.result;
            input.a = calculation.result;
        }

        input.currentOperator = this;
        operatorHighlight.create(input.currentOperator);
        input.secondOperandExists = false;
    })
}

percentageEquivalent.addEventListener('click', function() {
    display.innerText = operate('\u{F7}', display.innerText, 100);
})

equals.addEventListener('click', function() {
    if (calculation.result === input.a || !input.currentOperator) {
        return; // prevents a calculation immediately after one was made
    } else if (input.a && input.b) { // ensures two inputs
        calculation.result = operate(input.currentOperator.innerText, input.a, input.b);
        display.innerText = calculation.result;
        input.a = calculation.result;
    }
});

clear.addEventListener('click', function () {
    if (input.currentOperator) {
        operatorHighlight.remove(input.currentOperator);
    }
    clearData();
});

function clearData () {
    display.innerText = 0;
    input = {};
    calculation = {};
}

