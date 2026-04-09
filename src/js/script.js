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

// Функция вычисления результата
function calculate(){
    let displayValue = display.value;

    // Здесь будем считать результат
    let result = 0;
    // Массив для хранения чисел в операции
    let numberArray = [];
    // Массив для хранения операторов в операции
    let operatorArray = [];
    
    // Переменная, в которой будем считать число, до встретившегося оператора
    let numberBeforeOperator = 0;
    // Переменная, в которой будем считать позицию начала числа в строке операции. 
    // Первое число на нулевой позиции (помним, что индексация массивов начинается с 0)
    let numberStartPosition = 0;

    // Запускаем цикл, который пройдется по всем символам выражения на дисплее
    for (let i = 0; i < displayValue.length; i++){
        // Если нам встретился оператор - получаем число, которое стояло него
        if (displayValue[i] === '+' || displayValue[i] === '-' || displayValue[i] === '*' || displayValue[i] === '/'){
            // Функция slice (от англ. резать) принимает два аргумента
            // Первый - позиция символа (элемента) в строке (массиве), с которого мы "режем" строку
            // Второй - до которого мы "режем" строку (невключительно)
            // В нашем случае первый аргумент - значение переменной стартовой позиции текущего числа,
            // Второй - позиция встретившегося оператора (так как "режем" невключительно)
            // Помним, что мы работаем со строками, поэтому приведем ее к числу с помощью parseInt
            numberBeforeOperator = parseInt(displayValue.slice(numberStartPosition, i))
            // Следующее число начнется с позиции, последующей за позицей встретившегося оператора
            numberStartPosition = i + 1;
            // Добавим в массивы полученные число и оператор
            numberArray.push(numberBeforeOperator);
            operatorArray.push(displayValue[i]);
        }
    }

    // Последнее число не обрабатывается в цикле, так как после него не стоит оператор, мы не попадаем в условие
    // Добавим его отдельно - "режем" с запомненной позиции до конца строки
    numberBeforeOperator = parseInt(displayValue.slice(numberStartPosition, displayValue.length))
    if (!isNaN(numberBeforeOperator)) {
        numberArray.push(numberBeforeOperator);
    } else {
        // Удаляем последний оператор - он бесполезный
        operatorArray.pop()
    }

     // В браузере можем посмотреть значения массивов
    console.log(numberArray);
    console.log(operatorArray);
    
     // Начнем работать с полученными массивами
    // Начнем с первого числа
    result += numberArray[0]
    
    // Проходимся в цикле по всем операторам
    for (let i = 0; i < operatorArray.length; i++) {
        // Получаем число, которое стояло после оператора
        let nextNumber = numberArray[i + 1];
        let operator = operatorArray[i];
        
        // В зависимости от оператора выполняем соответствующую операцию
        if (operator === '+') {
            result = result + nextNumber;
        } else if (operator === '-') {
            result = result - nextNumber;
        } else if (operator === '*') {
            result = result * nextNumber;
        } else if (operator === '/') {
            result = result / nextNumber;
        }
    }
    display.value = result;
    
   
}

// Привязываем кнопку "Равно"
buttonEquals.addEventListener('click', calculate);

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
