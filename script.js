const generateRGBbtn = document.querySelector('#generate-rgb')
const invertRGBbtn = document.querySelector('#invert-rgb')
const generateHEXbtn = document.querySelector('#generate-hex')
const invertHEXbtn = document.querySelector('#invert-hex')
const resetBtn = document.querySelector('#reset')
const circle = document.querySelector('.circle')
const square = document.querySelector('.square')

const sectionRGB = document.querySelector('#rgb')
const sectionHEX = document.querySelector('#hex')

const valueOfHEX = document.querySelector('.hex-value')
const redRGB = document.querySelector('.rgb-red')
const greenRGB = document.querySelector('.rgb-green')
const blueRGB = document.querySelector('.rgb-blue')

let red = ""
let green = ""
let blue = ""

let newRGBvalue = ""
let newInvertedRGBvalue = ""
let newHEXvalue = ""
let newInvertedHEXvalue = ""
let invertedHEXvalue = ""

let fromHEXtoRGB = ""

let invertedRed = ""
let invertedGreen = ""
let invertedBlue = ""

// Grab Colors
// const grabColor = (element) => {
//     alert(window.getComputedStyle(element).getPropertyValue('background-color'))
// }

// Generate Colors (RGB)
const generateRGB = () => {
    red = Math.floor(Math.random() * 255)
    green = Math.floor(Math.random() * 255)
    blue = Math.floor(Math.random() * 255)
    
    newRGBvalue = `rgb(${red}, ${green}, ${blue})`
}

const generateInvertedRGB = () => {
    invertedRed = 255 - red
    invertedGreen = 255 - green
    invertedBlue = 255 - blue

    newInvertedRGBvalue = `rgb(${invertedRed},${invertedGreen},${invertedBlue})`
}

// Click callbacks (RGB)
const changeRGBcolor = () => {
    invertRGBbtn.style.display = 'inline-block'
    resetBtn.style.display = 'inline-block'
    generateRGB()
    generateInvertedRGB()

    circle.style.backgroundColor = newRGBvalue

    redRGB.innerHTML = `R: ${red}`
    greenRGB.innerHTML = `G: ${green}`
    blueRGB.innerHTML = `B: ${blue}`

    sectionRGB.style.backgroundColor = newInvertedRGBvalue

}

const invertRGBcolor = () => {
    generateInvertedRGB()

    let currentRGBvalue = window.getComputedStyle(circle).getPropertyValue('background-color')
    let currentInvertedRGBvalue = window.getComputedStyle(sectionRGB).getPropertyValue('background-color')
    
    circle.style.backgroundColor = currentInvertedRGBvalue
    sectionRGB.style.backgroundColor = currentRGBvalue

    if (redRGB.innerHTML === `R: ${red}` && greenRGB.innerHTML === `G: ${green}` && blueRGB.innerHTML === `B: ${blue}`) {
        redRGB.innerHTML = `R: ${invertedRed}`
        greenRGB.innerHTML = `G: ${invertedGreen}`
        blueRGB.innerHTML = `B: ${invertedBlue}`
    } else {
        redRGB.innerHTML = `R: ${red}`
        greenRGB.innerHTML = `G: ${green}`
        blueRGB.innerHTML = `B: ${blue}`
    }
}

// Event Listeners (RGB)
generateRGBbtn.addEventListener('click', changeRGBcolor)
invertRGBbtn.addEventListener('click', invertRGBcolor)
// sectionRGB.addEventListener('click', function(){
//     grabColor(sectionRGB)
// })


// Generate Colors (HEX)
const generateHEX = () => {
    let decimals = []
    
    for (let i = 0; i < 6; i++) {
        let eachDecimal = Math.floor(Math.random() * 16)

        switch (eachDecimal) {
            case 10:
                eachDecimal = "A";
                break;
            case 11:
                eachDecimal = "B";
                break;
            case 12:
                eachDecimal = "C";
                break;
            case 13:
                eachDecimal = "D";
                break;
            case 14:
                eachDecimal = "E";
                break;
            case 15:
                eachDecimal = "F";
                break;
        }

        decimals.push(eachDecimal)
    }

    newHEXvalue = `#${decimals.join("")}`
}

const generateInvertedHEX = () => {
    let convertedRed = parseInt(newHEXvalue[1]+newHEXvalue[2],16);
    let convertedGreen = parseInt(newHEXvalue[3]+newHEXvalue[4],16);
    let convertedBlue = parseInt(newHEXvalue[5]+newHEXvalue[6],16);
    
    fromHEXtoRGB = `rgb(${convertedRed},${convertedGreen},${convertedBlue})`

    let convertedInvertedRed = 255 - convertedRed
    let convertedInvertedGreen = 255 - convertedGreen
    let convertedInvertedBlue = 255 - convertedBlue

    newInvertedHEXvalue = `rgb(${convertedInvertedRed},${convertedInvertedGreen},${convertedInvertedBlue})`

    // convert back to hex in order to have a variable to use on line 150
    invertedHEXvalue = "#" + ColorToHex(convertedInvertedRed) + ColorToHex(convertedInvertedGreen) + ColorToHex(convertedInvertedBlue)

    function ColorToHex(color) {
        let hexadecimal = color.toString(16);
        return hexadecimal
    }
}

// Click callbacks (HEX)
const changeHEXcolor = () => {
    invertHEXbtn.style.display = 'inline-block'
    resetBtn.style.display = 'inline-block'
    generateHEX()
    generateInvertedHEX()

    square.style.backgroundColor = newHEXvalue
    valueOfHEX.innerHTML = newHEXvalue
    sectionHEX.style.backgroundColor = newInvertedHEXvalue
}

const invertHEXcolor = () => {
    generateInvertedHEX()

    let currentHEXvalue = window.getComputedStyle(square).getPropertyValue('background-color')
    let currentInvertedHEXvalue = window.getComputedStyle(sectionHEX).getPropertyValue('background-color')

    square.style.backgroundColor = currentInvertedHEXvalue
    sectionHEX.style.backgroundColor = currentHEXvalue

    if (valueOfHEX.innerHTML === newHEXvalue) {
        valueOfHEX.innerHTML = invertedHEXvalue
    } else {
        valueOfHEX.innerHTML = newHEXvalue
    }
}

// Event Listeners (HEX)
generateHEXbtn.addEventListener('click', changeHEXcolor)
invertHEXbtn.addEventListener('click', invertHEXcolor)

// Reset
const resetColors = () => {
    resetBtn.style.display = 'none'
    invertHEXbtn.style.display = 'none'
    invertRGBbtn.style.display = 'none'

    square.style.backgroundColor = 'black'
    sectionHEX.style.backgroundColor = 'white'
    valueOfHEX.innerHTML = '000000'

    circle.style.backgroundColor = 'white'
    sectionRGB.style.backgroundColor = 'black'
    redRGB.innerHTML = '0'
    greenRGB.innerHTML = '0'
    blueRGB.innerHTML = '0'
}

// Event Listener (Reset)
resetBtn.addEventListener('click', resetColors)