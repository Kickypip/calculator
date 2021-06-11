let a;
let b;
let currentOperator;

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
    return a / b;
}

function operate(operator, a, b) {
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

let display = document.querySelector('#display');
let decimalPoint = document.querySelector('#decimal-point');

// adds event listeners to each items
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
        if (display.innerText === '0') {
            display.innerText = '';
        }
        display.innerText += this.innerText;
    })
}

function btnOperatorPress(operator) {
    operator.addEventListener('click', function() {
        currentOperator = this.innerText;
        a = parseFloat(display.innerText);
        
        display.innerText = '';
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
    b = parseFloat(display.innerText);
    if (b === '') {
        console.log('test');
        return;
    } else if (a || b) {
        let result = operate(currentOperator, a, b);
        display.innerText = result;
    }
})

clear.addEventListener('click', function () {
    a = 0;
    b = 0;
    currentOperator = null;
    display.innerText = 0;
})