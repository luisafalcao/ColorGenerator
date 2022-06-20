// buttons (DOM)
const generateRGBbtn = document.querySelector('#generate-rgb')
const invertRGBbtn = document.querySelector('#invert-rgb')

const generateHEXbtn = document.querySelector('#generate-hex')
const invertHEXbtn = document.querySelector('#invert-hex')

const convertToRGBbtn = document.querySelector('#convert-to-rgb')
const resetBtn = document.querySelector('#reset')

// shapes (DOM)
const circle = document.querySelector('.circle')
const square = document.querySelector('.square')

// sections (DOM)
const sectionRGB = document.querySelector('#rgb')
const sectionHEX = document.querySelector('#hex')

// values (DOM)
const rgbPlaceholder = document.querySelector('.rgb-value')
const hexPlaceholder = document.querySelector('.hex-value')
const rgbConverted = document.querySelector('.rgb-converted')
const hexConverted = document.querySelector('.hex-converted')

//-------

// generated RGB colors -> red: 0, green: 0, blue: 0
let rgbRed = ""
let rgbGreen = ""
let rgbBlue = ""

// generated RGB value -> rgb(0,0,0)
let rgbValue = ""

// inverted RGB colors
let invertedRed = ""
let invertedGreen = ""
let invertedBlue = ""

// generated inverted RGB
let invertedRGBvalue = ""

//------

// generated HEX
let hexValue = ""

// generated inverted HEX
let invertedHEXvalue = ""

//-------

// conversions
let hexRed = ""
let hexGreen = ""
let hexBlue = ""

let toHEX = ""
let toRGB = ""


// Generate Colors (RGB)
const generateRGB = () => {
    rgbRed = Math.floor(Math.random() * 255)
    rgbGreen = Math.floor(Math.random() * 255)
    rgbBlue = Math.floor(Math.random() * 255)
    
    rgbValue = `rgb(${rgbRed},${rgbGreen},${rgbBlue})`
}

const generateInvertedRGB = () => {
    invertedRed = 255 - rgbRed
    invertedGreen = 255 - rgbGreen
    invertedBlue = 255 - rgbBlue

    invertedRGBvalue = `rgb(${invertedRed},${invertedGreen},${invertedBlue})`
}

// Click callbacks (RGB)
const changeRGBcolor = () => {
    invertRGBbtn.style.display = 'inline-block'
    resetBtn.style.display = 'inline-block'
    
    generateRGB()
    generateInvertedRGB()

    // change circle color
    circle.style.backgroundColor = rgbValue
    // change placeholder value
    rgbPlaceholder.innerHTML = rgbValue
    // change background color
    sectionRGB.style.backgroundColor = invertedRGBvalue

}

const invertRGBcolor = () => {
    generateInvertedRGB()

    // grab ccurrent circle and background colors
    let currentCircleColor = window.getComputedStyle(circle).getPropertyValue('background-color')
    let currentRGBbackgroundColor = window.getComputedStyle(sectionRGB).getPropertyValue('background-color')
    
    // switch circle and background colors
    circle.style.backgroundColor = currentRGBbackgroundColor
    sectionRGB.style.backgroundColor = currentCircleColor
    // switch placeholder value
    if (rgbPlaceholder.innerHTML === rgbValue) {
        rgbPlaceholder.innerHTML = invertedRGBvalue
    } else {
        rgbPlaceholder.innerHTML = rgbValue
    }
}

// Event Listeners (RGB)
generateRGBbtn.addEventListener('click', changeRGBcolor)
invertRGBbtn.addEventListener('click', invertRGBcolor)


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

    hexValue = `#${decimals.join("")}`
}

const generateInvertedHEX = () => {
    // convert from hex to rgb
    hexRed = parseInt(hexValue[1]+hexValue[2],16);
    hexGreen = parseInt(hexValue[3]+hexValue[4],16);
    hexBlue = parseInt(hexValue[5]+hexValue[6],16);
    
    toRGB = `rgb(${hexRed},${hexGreen},${hexBlue})`

    // invert rgb-turned hex
    let invertedHEXred = 255 - hexRed
    let invertedHEXgreen = 255 - hexGreen
    let invertedHEXblue = 255 - hexBlue

    invertedHEXvalue = `rgb(${invertedHEXred},${invertedHEXgreen},${invertedHEXblue})`

    // convert back to hex in order to have a variable to use on line 150
    toHEX = "#" + ColorToHex(invertedHEXred) + ColorToHex(invertedHEXgreen) + ColorToHex(invertedHEXblue)

    function ColorToHex(color) {
        let hexadecimal = color.toString(16);
        return hexadecimal
    }
}

// Click callbacks (HEX)
const changeHEXcolor = () => {
    invertHEXbtn.style.display = 'inline-block'
    resetBtn.style.display = 'inline-block'
    convertToRGBbtn.classList.remove('active')

    generateHEX()
    generateInvertedHEX()

    square.style.backgroundColor = hexValue
    hexPlaceholder.innerHTML = hexValue
    sectionHEX.style.backgroundColor = invertedHEXvalue
}

const invertHEXcolor = () => {
    convertToRGBbtn.classList.remove('active')

    generateInvertedHEX()

    let currentSquareColor = window.getComputedStyle(square).getPropertyValue('background-color')
    let currentHEXbackgroundColor = window.getComputedStyle(sectionHEX).getPropertyValue('background-color')

    square.style.backgroundColor = currentHEXbackgroundColor
    sectionHEX.style.backgroundColor = currentSquareColor

    if (hexPlaceholder.innerHTML === hexValue) {
        hexPlaceholder.innerHTML = toHEX
    } else {
        hexPlaceholder.innerHTML = hexValue
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
    hexPlaceholder.innerHTML = '#000000'

    circle.style.backgroundColor = 'white'
    sectionRGB.style.backgroundColor = 'black'
    rgbPlaceholder.innerHTML = 'rgb(255,255,255)'
}

// Event Listener (Reset)
resetBtn.addEventListener('click', resetColors)

// Get current RGB
const getCurrentRGB = () => {
    hexPlaceholder.innerHTML = window.getComputedStyle(square).getPropertyValue('background-color')

    convertToRGBbtn.classList.add('active')
}

// Event Listener (Convert to RGB)
convertToRGBbtn.addEventListener('click', getCurrentRGB)