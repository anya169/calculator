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
const buttonPoint = document.getElementById('button-point');             // .

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
    // Добавляем проверку условия об ошибке
    if (display.value === '0' || display.value === 'Ошибка: деление на 0') {
        // Заменяем ноль на введеный символ, только если это число - операция не может начинаться с оператора
        // Даем пользователю возможность начать операцию с десятичного числа 0.
        if (symbol === '.'){
            display.value += symbol;
            return;
        }
        // Проверяем, что вводимый символ - не оператор     
        else if (!operators.includes(symbol)) {
            display.value = symbol;
            return;
        }   
        
    } 
    // Проверка на множественные точки в одном числе
    if (symbol === '.') {
        // Находим позицию последнего оператора
        let lastOperatorPosition = -1;
        // Запускаем обратный цикл - пройдем с конца строки до ее начала
        for (let i = display.value.length - 1; i >= 0; i--) {
            // Если встречается оператор, запоминаем его позицию в строке - получаем последний оператор таким образом
            if (operators.includes(display.value[i])) {
                lastOperatorPosition = i;
                // Останавливаемся, как только нашли 
                break;
            }
        }
        
        // Берём часть строки после последнего оператора (текущее число) - "режем" от конца до полученной позиции символа
        let currentNumber = display.value.slice(lastOperatorPosition + 1);
        // Если в текущем числе уже есть точка — не добавляем
        // Также возможна ситуация, когда пользователь вводит точку после оператора (невозможно)
        // В таком случае нам вернется пустая строка - срез от конца до последнего символа
        if (currentNumber.includes('.') || currentNumber === "") {
            return;
        }
    }

    // Если мы не зашли в другие условия (не дошли до return, останавливающий цикл), добавляем символ к строке в дисплее
    // Помним, что мы работаем со строками, поэтому в нашем случае "2" + "3" = "23", а не "5"   

    // Проверяем, чему равен последний символ, чтобы не дать пользователю ввести несколько операторов подряд
    let lastSymbol = display.value[display.value.length - 1];
    // Проверяем, что последний и вводимый символы - не операторы
    if (operators.includes(lastSymbol) && operators.includes(symbol)){
        // Разрешаем вводить унарный минус
        if (symbol === '-') {
            // Не заменяем, а добавляем минус (будет знак числа)
            display.value += symbol;
        } else {
            // Для других операторов - заменяем последний
            display.value = display.value.slice(0, -1) + symbol;
        }
    } else {
        // Если нет, то добавляем цифру на дисплей
        display.value += symbol;
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

            // Проверяем, не является ли минус унарным
            // для числа в начале
            if (i === 0 && displayValue[i] == '-'){
                // Пропускаем итерацию
                continue;
            }
            // а также не является ли унарным после другого оператора
            if (displayValue[i] == '-' && (displayValue[i-1] === '+' || displayValue[i-1] === '-' || displayValue[i-1] === '*' || displayValue[i-1] === '/')){
                // Пропускаем итерацию
                continue;
            }

            // Помним, что мы работаем со строками, поэтому приведем ее к числу с помощью parseFloat
            numberBeforeOperator = parseFloat(displayValue.slice(numberStartPosition, i))
            // Следующее число начнется с позиции, последующей за позицей встретившегося оператора
            numberStartPosition = i + 1;
            // Добавим в массивы полученные число и оператор
            numberArray.push(numberBeforeOperator);
            operatorArray.push(displayValue[i]);
        }
    }

    // Последнее число не обрабатывается в цикле, так как после него не стоит оператор, мы не попадаем в условие
    // Добавим его отдельно - "режем" с запомненной позиции до конца строки
    numberBeforeOperator = parseFloat(displayValue.slice(numberStartPosition, displayValue.length))
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
            if (nextNumber === 0) {
                display.value = 'Ошибка: деление на 0';
                return;
            }
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
buttonPoint.addEventListener('click', function() { appendSymbol('.'); });
