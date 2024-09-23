document.addEventListener('DOMContentLoaded', () => {
    let AC = document.getElementById('AC');
    let del = document.getElementById('Del'); 
    let mod = document.getElementById('modulus');
    let div = document.getElementById('divide');
    let mul = document.getElementById('multiply');
    let sub = document.getElementById('subtract');
    let add = document.getElementById('add');
    let eq = document.getElementById('equal');
    let dot = document.getElementById('dot');

    let one = document.getElementById('one');
    let two = document.getElementById('two');
    let three = document.getElementById('three');
    let four = document.getElementById('four');
    let five = document.getElementById('five');
    let six = document.getElementById('six');
    let seven = document.getElementById('seven');
    let eight = document.getElementById('eight');
    let nine = document.getElementById('nine');
    let zero = document.getElementById('zero');

    let display = document.getElementById('display');

    let current = '';
    let previous = '';
    let operation = undefined;

    const handleOnClick = (e) => {
        let id = e.target.id;
        switch(id) {
            case 'AC':
                clear();
                break;
            case 'Del': 
                deleteLastDigit();
                break;
            case 'modulus':
                handleOperation('modulus');
                break;
            case 'divide':
                handleOperation('divide');
                break;
            case 'multiply':
                handleOperation('multiply');
                break;
            case 'subtract':
                handleOperation('subtract');
                break;
            case 'add':
                handleOperation('add');
                break;
            case 'equal':
                compute();
                break;
            case 'dot':
                handleDot();
                break;
            default:
                appendNumber(e.target.innerHTML);
                break;
        }
    }

    const clear = () => {
        current = '';
        previous = '';
        operation = undefined;
        display.value = ''; 
    }

    const deleteLastDigit = () => {
        if (current !== '') {
            current = current.slice(0, -1);
            display.value = current;
        }
    }

    const appendNumber = (value) => {
        value = value.replace(/\s+/g, '');
        if (value === '.' && current.includes('.')) return;
        current += value;
        display.value = current;
    }

    const handleOperation = (op) => {
        if (current === '') return;
        if (previous !== '') {
            compute();
        }
        operation = op;
        previous = current;
        current = '';
    }

    const compute = () => {
        let computation;
        const prev = parseFloat(previous);
        const curr = parseFloat(current);
        if (isNaN(prev) || isNaN(curr)) return;

        switch(operation) {
            case 'add':
                computation = prev + curr;
                break;
            case 'subtract':
                computation = prev - curr;
                break;
            case 'multiply':
                computation = prev * curr;
                break;
            case 'divide':
                computation = prev / curr;
                break;
            case 'modulus':
                computation = prev % curr;
                break;
            default:
                return;
        }

        current = parseFloat(computation.toFixed(10)).toString();
        operation = undefined;
        previous = '';
        display.value = current;
    }

    const handleDot = () => {
        if (current === '') {
            current = '0.';
        } else if (!current.includes('.')) {
            current += '.';
        }
        display.value = current;
    }

    AC.addEventListener('click', handleOnClick);
    del.addEventListener('click', handleOnClick);
    mod.addEventListener('click', handleOnClick);
    mul.addEventListener('click', handleOnClick);
    sub.addEventListener('click', handleOnClick);
    add.addEventListener('click', handleOnClick);
    div.addEventListener('click', handleOnClick);
    eq.addEventListener('click', handleOnClick);
    dot.addEventListener('click', handleOnClick);

    one.addEventListener('click', handleOnClick);
    two.addEventListener('click', handleOnClick);
    three.addEventListener('click', handleOnClick);
    four.addEventListener('click', handleOnClick);
    five.addEventListener('click', handleOnClick);
    six.addEventListener('click', handleOnClick);
    seven.addEventListener('click', handleOnClick);
    eight.addEventListener('click', handleOnClick);
    nine.addEventListener('click', handleOnClick);
    zero.addEventListener('click', handleOnClick);

    document.addEventListener('keydown', (e) => {
        let value = e.key.replace(/\s+/g, ''); 
        switch(value) {
            case 'Escape':
                clear();
                break;
            case 'Backspace':
                deleteLastDigit();
                break;
            case 'Enter':
                compute();
                break;
            case '.':
                handleDot();
                break;
            case '+':
                handleOperation('add');
                break;
            case '-':
                handleOperation('subtract');
                break;
            case '*':
                handleOperation('multiply');
                break;
            case '/':
                handleOperation('divide');
                break;
            case '%':
                handleOperation('modulus');
                break;
            default:
                if (!isNaN(value)) {
                    appendNumber(value);
                }
                break;
        }
    });
});
