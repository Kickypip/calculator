let a;
let b;
let currentOperator;
let result;
let t = 0;

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
    a = parseFloat(a);
    b = parseFloat(b);

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

function btnNumberPress(number) {
    number.addEventListener('click', function() {
        if (display.innerText == result) {
            a = display.innerText;
            display.innerText = this.innerText;
            return;
        } else if (display.innerText === '0') {
            display.innerText = '';
        }
        if (currentOperator && t < 1) {
            display.innerText = '';
            t++;
        }
        display.innerText += this.innerText;
    })
}

function btnOperatorPress(operator) {
    operator.addEventListener('click', function() {
        if (currentOperator) {
            b = display.innerText;
            result = operate(currentOperator, a, b);
            display.innerText = result;
        }

        currentOperator = this.innerText;
        a = display.innerText;
    })
}

decimalPoint.addEventListener('click', function() {
    if (display.innerText.includes('.')) {
        return;
    } else {
        display.innerText += this.innerText;
    }
})

equals.addEventListener('click', function() {
    b = display.innerText;
    if (result === a) {
        return;
    } else if (!currentOperator) {
        return;
    } else if (a && b) {
        result = operate(currentOperator, a, b);
        display.innerText = result;
        a = result;
        currentOperator = null;
    }
})

clear.addEventListener('click', function () {
    clearData();
})

function clearData () {
    a = 0;
    b = 0;
    t = 0;
    result = 0;
    currentOperator = null;
    display.innerText = 0;
}