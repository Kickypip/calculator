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
        return;
    }
    return a / b;
}

function operate(operator, a, b) {
    console.log(a);
    a = Number(a);
    b = parseFloat(b);
    console.log(a);
    operatorHighlight.remove(input.currentOperator);
    input.secondOperandExists = false;
    input.currentOperator = null;

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

// adds event listeners to each item
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
        operator.style.backgroundColor = 'hsl(0, 0%, 60%)';
    },
    remove(operator) {
        operator.style.backgroundColor = 'hsl(0, 0%, 70%)';
    }
};

function btnNumberPress(number) {
    number.addEventListener('click', function() {
        if (input.currentOperator && !input.secondOperandExists) {
            display.innerText = '';
            operatorHighlight.remove(input.currentOperator);
            input.secondOperandExists = true;
        }

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

        if (display.innerText == 0) {
            display.innerText = display.innerText.replace('0', '');
        }

        if (calculation.result) {
            display.innerText = this.innerText;
            calculation.result = null;
        } else {
            display.innerText += this.innerText;
        }
    })
}

function btnOperatorPress(operator) {
    operator.addEventListener('click', function() {
        if (input.currentOperator) {
            input.b = display.innerText;
            calculation.result = operate(input.currentOperator.innerText, input.a, input.b);
            display.innerText = calculation.result;
            input.a = calculation.result;
        } else {
            input.a = display.innerText;
        }
        input.currentOperator = this;
        operatorHighlight.create(input.currentOperator);
        input.secondOperandExists = false;
    })
}

equals.addEventListener('click', function() {
    input.b = display.innerText;
    if (calculation.result === input.a || !input.currentOperator) {
        return;
    } else if (input.a && input.b) {
        console.log(input.a);
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
