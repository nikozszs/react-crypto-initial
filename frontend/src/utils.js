export function percentDifference(a, b) { //функция, которая считает разницу
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export function capitalize(str) { //функция, которая делает первые буквы в строчке с заглавной буквы
    return str.charAt(0).toUpperCase() + str.substr(1)
}