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
        add(a, b);
    } else if (operator === '-') {
        subtract(a, b);
    } else if (operator === '*') {
        multiply(a, b);
    } else if (operator === '/') {
        divide(a, b);
    }
}


let buttons = document.querySelectorAll('.btn');
buttons.forEach(item => btnBorderSelect(item));

function btnBorderSelect(btn) {
    btn.addEventListener('mousedown', function (e) {
        this.style.borderColor = 'hsl(0, 0%, 50%)';
    })
    btn.addEventListener('mouseup', function (e) {
        this.style.borderColor = 'transparent';
    })
}

