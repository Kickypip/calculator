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
    let result;

    // converts operands to floating-point
    a = parseFloat(a);
    b = parseFloat(b);

    // clears operator
    if (input.currentOperator) {
        input.currentOperator = null;
    }

    if (operator === '+') {
        result = add(a, b);
    } else if (operator === '-') {
        result = subtract(a, b);
    } else if (operator === '\u{D7}') {
        result = multiply(a, b);
    } else if (operator === '\u{F7}') {
        result = divide(a, b);
    }

    // rounds to 11 decimal places (unary plus prevents unnecessary conversion)
    return +result.toFixed(11);
}

let display = document.querySelector('#display')
let decimalPoint = document.querySelector('#decimal-point');
let plusMinus = document.querySelector('#plus-minus');

// adds event listeners to each item, based on their respective html class
let btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btnBorderSelect(btn);
    btn.addEventListener('click', function() {
        btnFilter(btn);
    });
});

function btnFilter(btn) {
    if (btn.classList.contains('number')) {
        numberPress(btn);
    } else if (btn.classList.contains('operator')) {
        operatorPress(btn);
    } else if (btn.id === 'equals') {
        equalsPress();
    } else if (btn.id === 'clear') {
        clearPress();
    } else if (btn.id === 'percentage-equivalent') {
        percentageEquivalentPress();
    }
}

// animation whenever a button is clicked
function btnBorderSelect(btn) {
    btn.addEventListener('mousedown', function () {
        btn.classList.add('selected');
    })
    btn.addEventListener('mouseup', function () {
        btn.classList.remove('selected');
    })
}

// visually identifies the current operator
let operatorHighlight = {
    create(operator) {
        operator.classList.add('highlighted');
    },
    remove(operator) {
        operator.classList.remove('highlighted');
    }
};

function numberPress(btn) {
    // formatting for second operand
    if (input.currentOperator && !input.b) {
        display.innerText = '';
        operatorHighlight.remove(input.currentOperator);
    }

    // special rules for when decimal point or plus-minus is pressed
    if (btn === decimalPoint && display.innerText.includes('.')) {
        return;
    } else if (btn === plusMinus) {
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
        display.innerText = btn.innerText;
        calculation.result = null;
    } else {
        display.innerText += btn.innerText;
    }

    // stores second operand, only after operator has been chosen
    if (input.currentOperator) {
        input.b = display.innerText;
    }
}

function operatorPress(btn) {
    // ensures first operand is stored in "a"
    if (!input.currentOperator) {
        input.a = display.innerText;
    }

    // prevents multiple operators from being highlighted
    if (input.currentOperator && btn !== input.currentOperator) {
        operatorHighlight.remove(input.currentOperator);
    }

    // forces each operand pair to be evaluated
    if (input.currentOperator && input.b) {            
        calculation.result = operate(input.currentOperator.innerText, input.a, input.b);
        display.innerText = calculation.result;
        input.a = calculation.result;
        input.b = null;
    }

    input.currentOperator = btn;
    operatorHighlight.create(input.currentOperator);
}

function percentageEquivalentPress() {
    display.innerText = operate('\u{F7}', display.innerText, 100);
}

function equalsPress() {
    // checks for any last minute changes to the second operand (plusMinus/Backspace)
    if (input.b && input.b !== display.innerText) {
        input.b = display.innerText
    }

    if (calculation.result === input.a || !input.currentOperator) {
        return; // prevents a calculation immediately after one was made
    } else if (input.a && input.b) { // ensures two inputs
        calculation.result = operate(input.currentOperator.innerText, input.a, input.b);
        display.innerText = calculation.result;
        input.a = calculation.result;
        input.b = null;
    }
}

function clearPress() {
    if (input.currentOperator) {
        operatorHighlight.remove(input.currentOperator);
    }
    clearData();
}

function clearData () {
    display.innerText = 0;
    input = {};
    calculation = {};
}

// keyboard support
window.addEventListener('keydown', function(event) {
    input.selectedKey = document.querySelector(`.btn[data-key="${event.key}"]`);
    if (event.key === 'Backspace') {
        display.innerText = display.innerText.slice(0, -1);
        return;
    } else if (event.key === 'Enter') {
        input.selectedKey = document.querySelector('#equals');
    } else if (!input.selectedKey) {
        return;
    };
    btnFilter(input.selectedKey);
});