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

let display = document.querySelector('#display');

// adds event listeners to each items
let btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btnBorderHighlight(btn);
    if (btn.contains('number')){
        btnNumberPress(btn);
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

function btnPress(btn) {
    btn.addEventListener('click', function() {
        if (display.innerText === '0') {
            display.innerText = '';
        }
        let currentButton = this.innerText;
        display.innerText += currentButton;
    })
}


/* places all buttons into object
let btnsObject = {};
btns.forEach(item => (btnsObject[item.id] = item.textContent));

console.dir(btnsObject);
*/