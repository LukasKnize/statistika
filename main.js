//import ADVRT from "./math.js"

let arrayOfNumbers = []
let arrayOfSingleValues = []

//41,41,41,42,42,41,39,41,40,39,39,42,42,41,40,42,43,42,42,41,45,42,43,43

function addNumsFromInput() {
    let numFromInput = document.getElementById("numInput").value

    if (numFromInput.includes(",")) {
        let splitedArray = numFromInput.split(",");
        splitedArray.forEach(element => {
            if (!isNaN(element)) {
                arrayOfNumbers.push(element)
                let isIn = false
                for (let i = 0; i < arrayOfSingleValues.length; i++) {
                    if (element == arrayOfSingleValues[i][0]) {
                        arrayOfSingleValues[i][1]++
                        isIn = true
                        break
                    }
                }
                if (isIn == false) {
                    arrayOfSingleValues.push([element, 1])
                }
            }
        });
    } else if (numFromInput.includes(" ")) {
        let splitedArray = numFromInput.split(" ");
        splitedArray.forEach(element => {
            if (!isNaN(element)) {
                arrayOfNumbers.push(element)
                let isIn = false
                for (let i = 0; i < arrayOfSingleValues.length; i++) {
                    if (element == arrayOfSingleValues[i][0]) {
                        arrayOfSingleValues[i][1]++
                        isIn = true
                        break
                    }
                }
                if (isIn == false) {
                    arrayOfSingleValues.push([element, 1])
                }
            }
        });
    } else if (!isNaN(numFromInput)) {
        arrayOfNumbers.push(numFromInput)
        let isIn = false
        for (let i = 0; i < arrayOfSingleValues.length; i++) {
            if (numFromInput == arrayOfSingleValues[i][0]) {
                arrayOfSingleValues[i][1]++
                isIn = true
                break
            }
        }
        if (isIn == false) {
            arrayOfSingleValues.push([numFromInput, 1])
        }
    }
    updateTable()
    relativeCount()
    aritmeticAvg()
    harmonicAvg()
    geometricAvg()
    variation()
    modus()
    median()
    avgDifference()
    spread()
    difference()
    varCoeficient()
}

function updateTable(){
    arrayOfSingleValues.sort();
    let xrow = document.getElementById("Xrow")
    let yrow = document.getElementById("Nrow")
    let th = document.querySelectorAll("th")
    th.forEach(element => {
        element.remove()
    });
    let xThB = document.createElement("th")
    xThB.innerHTML = "X<sub>i</sub>"
    xrow.appendChild(xThB)
    for (let i = 0; i < arrayOfSingleValues.length; i++) {
        let xTh = document.createElement("th")
        xTh.innerText = arrayOfSingleValues[i][0]
        xrow.appendChild(xTh);
    }
    let yThB = document.createElement("th")
    yThB.innerHTML = "N<sub>i</sub>" 
    yrow.appendChild(yThB)
    for (let i = 0; i < arrayOfSingleValues.length; i++) {
        let yTh = document.createElement("th")
        yTh.innerText = arrayOfSingleValues[i][1]
        yrow.appendChild(yTh)
    }
}

function relativeCount() {
    let outputString = "";
    arrayOfSingleValues.forEach(element => {
        outputString += "V<sub>" + element[0] + "</sub> = " + (element[1] / arrayOfNumbers.length) * 100 + "% <br>" 
    });
    document.getElementById("relativeCount").innerHTML = outputString
}

function aritmeticAvg() {
    let avg = 0;
    arrayOfNumbers.forEach(element => {
        avg += parseFloat(element)
    });
    document.getElementById("aritmeticAvg").innerHTML = "X = " + avg/arrayOfNumbers.length
}

function harmonicAvg(){
    let x = 0;
    arrayOfSingleValues.forEach(element => {
        x += parseFloat(element[1]) / parseFloat(element[0])
    });
    document.getElementById("harmonicAvg").innerHTML = "X<sub>H</sub> = " + arrayOfNumbers.length / x
}

function geometricAvg(){
    let x = 1;
    arrayOfNumbers.forEach(element => {
        x *= parseFloat(element)
    });

    document.getElementById("geometricAvg").innerHTML = "X<sub>G</sub> = " + ADVRT(x, arrayOfNumbers.length)
}

function variation(){
    document.getElementById("variation").innerHTML = "R = " + arrayOfSingleValues.length;
}

function modus(){
    let modusCount = 0;
    let modus = 0;
    arrayOfSingleValues.forEach(element => {
        if (element[1] > modusCount) {
            modusCount = element[1]
            modus = element[0]
        }
    });
    document.getElementById("Modus").innerHTML = "Modus = " + modus;
}

function median(){
    let median = 0;
    arrayOfNumbers.sort()
    if (arrayOfNumbers.length % 2 == 0) {
        let num1 = arrayOfNumbers.length / 2
        let num2 = arrayOfNumbers.length / 2 + 1
        median = (parseFloat(arrayOfNumbers[num1 - 1]) + parseFloat(arrayOfNumbers[num2 - 1])) / 2
    }else{
        median = arrayOfNumbers[arrayOfNumbers.length / 2 - 0.5]
    }
    document.getElementById("Median").innerHTML = "Medián = " + median;
}

function avgDifference(){
    let x = 0;
    let avg = document.getElementById("aritmeticAvg").innerHTML;
    avg = avg.split(" = ");
    avg = parseFloat(avg[1]);
    arrayOfSingleValues.forEach(element => {
       x += element[1] * Math.abs(element[0] - avg)
    });
    document.getElementById("avgDifference").innerHTML = "d = " + x / arrayOfNumbers.length
}

function spread(){
    let x = 0;
    let avg = document.getElementById("aritmeticAvg").innerHTML;
    avg = avg.split(" = ");
    avg = parseFloat(avg[1]);
    arrayOfSingleValues.forEach(element => {
       x += element[1] * Math.pow((element[0] - avg), 2)
    });
    document.getElementById("spread").innerHTML = "s = " + x / arrayOfNumbers.length
}

function difference(){
    let sp = document.getElementById("spread").innerHTML;
    sp = sp.split(" = ");
    sp = parseFloat(sp[1]);
    document.getElementById("difference").innerHTML = "s<sub>x</sub> = " + Math.sqrt(sp)
}

function varCoeficient(){
    let dif = document.getElementById("difference").innerHTML;
    dif = dif.split(" = ");
    dif = parseFloat(dif[1]);
    let avg = document.getElementById("aritmeticAvg").innerHTML;
    avg = avg.split(" = ");
    avg = parseFloat(avg[1]);
    document.getElementById("varCoeficient").innerHTML = "v<sub>x</sub> = " + (parseFloat(dif) / parseFloat(avg)) * 100 + "%"
}

function ADVRT(base, param){
    let returnNum = null;
    if (!isNaN(base) && !isNaN(param)) {
        returnNum = Math.pow(parseFloat(base), 1/parseFloat(param))
        if (returnNum.toString().includes(".999999999999999")) {
            returnNum = Math.ceil(parseFloat(returnNum));
        }
    }else{
        throw new Error("parameters for ADVRT should be numbers")
    }
    return returnNum
}