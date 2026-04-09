// Находим элементы по айди

// Дисплей 
const display = document.getElementById('display');

// Кнопки цифр
const button0 = document.getElementById('button-0');
const button1 = document.getElementById('button-1');
const button2 = document.getElementById('button-2');
const button3 = document.getElementById('button-3');
const button4 = document.getElementById('button-4');
const button5 = document.getElementById('button-5');
const button6 = document.getElementById('button-6');
const button7 = document.getElementById('button-7');
const button8 = document.getElementById('button-8');
const button9 = document.getElementById('button-9');

// Кнопки операций
const buttonAddition = document.getElementById('button-addition');       // +
const buttonSubtraction = document.getElementById('button-subtraction'); // -
const buttonMultiplication = document.getElementById('button-multiplication'); // *
const buttonDivision = document.getElementById('button-division');       // /

// Кнопка "Равно"
const buttonEquals = document.getElementById('button-equals');

// Кнопка "Стереть"
const buttonDelete = document.getElementById('button-delete');


// Функция добавления символа
function appendSymbol(symbol) {
    //Определяем массив с операторами
    const operators = ['+', '-', '*', '/'];

    // Если на экране ноль - заменяем значение на число
    // Это работает в двух случаях:
    // На экране ноль, который отображается по умолчанию в начале
    // Пользователь вводит несколько нулей в начале, но мы помним, что числа с нуля не начинаются
    if (display.value === '0') {
        // Заменяем ноль на введеный символ, только если это число - операция не может начинаться с оператора
        // Проверяем, что вводимый символ - не оператор
        if (!operators.includes(symbol)) {
            display.value = symbol;
        }
    // Если уже что-то введено, добавляем символ к строке в дисплее
    // Помним, что мы работаем со строками, поэтому в нашем случае "2" + "3" = "23", а не "5"
    } else {
        // Проверяем, чему равен последний символ, чтобы не дать пользователю ввести несколько операторов подряд
        let lastSymbol = display.value[display.value.length - 1];
        // Проверяем, что последний и вводимый символы - не операторы
        if (operators.includes(lastSymbol) && operators.includes(symbol)){
            // Если так, то обрезаем последний введеный оператор и добавляем новый вводимый
            display.value = display.value.slice(0, -1) + symbol;
        } else {
            // Если нет, то добавляем цифру на дисплей
            display.value += symbol;
        }
    } 
}

// Привязываем кнопки цифр
button0.addEventListener('click', function() { appendSymbol('0'); });
button1.addEventListener('click', function() { appendSymbol('1'); });
button2.addEventListener('click', function() { appendSymbol('2'); });
button3.addEventListener('click', function() { appendSymbol('3'); });
button4.addEventListener('click', function() { appendSymbol('4'); });
button5.addEventListener('click', function() { appendSymbol('5'); });
button6.addEventListener('click', function() { appendSymbol('6'); });
button7.addEventListener('click', function() { appendSymbol('7'); });
button8.addEventListener('click', function() { appendSymbol('8'); });
button9.addEventListener('click', function() { appendSymbol('9'); });

// Привязываем кнопки операций
buttonAddition.addEventListener('click', function() { appendSymbol('+'); });
buttonSubtraction.addEventListener('click', function() { appendSymbol('-'); });
buttonMultiplication.addEventListener('click', function() { appendSymbol('*'); });
buttonDivision.addEventListener('click', function() { appendSymbol('/'); });
