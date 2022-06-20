// buttons (DOM)
const generateRGBbtn = document.querySelector('#generate-rgb')
const invertRGBbtn = document.querySelector('#invert-rgb')
const generateHEXbtn = document.querySelector('#generate-hex')
const invertHEXbtn = document.querySelector('#invert-hex')
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

//-------

// generated RGB colors -> red: 0, green: 0, blue: 0
let red = ""
let green = ""
let blue = ""

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
let toHEX = ""
let toRGB = ""


// Generate Colors (RGB)
const generateRGB = () => {
    red = Math.floor(Math.random() * 255)
    green = Math.floor(Math.random() * 255)
    blue = Math.floor(Math.random() * 255)
    
    rgbValue = `rgb(${red},${green},${blue})`
}

const generateInvertedRGB = () => {
    invertedRed = 255 - red
    invertedGreen = 255 - green
    invertedBlue = 255 - blue

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
    let currentBackgroundColor = window.getComputedStyle(sectionRGB).getPropertyValue('background-color')
    
    // switch circle and background colors
    circle.style.backgroundColor = currentBackgroundColor
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
    let convertedRed = parseInt(hexValue[1]+hexValue[2],16);
    let convertedGreen = parseInt(hexValue[3]+hexValue[4],16);
    let convertedBlue = parseInt(hexValue[5]+hexValue[6],16);
    
    toRGB = `rgb(${convertedRed},${convertedGreen},${convertedBlue})`

    let convertedInvertedRed = 255 - convertedRed
    let convertedInvertedGreen = 255 - convertedGreen
    let convertedInvertedBlue = 255 - convertedBlue

    invertedHEXvalue = `rgb(${convertedInvertedRed},${convertedInvertedGreen},${convertedInvertedBlue})`

    // convert back to hex in order to have a variable to use on line 150
    toHEX = "#" + ColorToHex(convertedInvertedRed) + ColorToHex(convertedInvertedGreen) + ColorToHex(convertedInvertedBlue)

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

    square.style.backgroundColor = hexValue
    hexPlaceholder.innerHTML = hexValue
    sectionHEX.style.backgroundColor = invertedHEXvalue
}

const invertHEXcolor = () => {
    generateInvertedHEX()

    let currentHEXvalue = window.getComputedStyle(square).getPropertyValue('background-color')
    let currentInvertedHEXvalue = window.getComputedStyle(sectionHEX).getPropertyValue('background-color')

    square.style.backgroundColor = currentInvertedHEXvalue
    sectionHEX.style.backgroundColor = currentHEXvalue

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
    hexPlaceholder.innerHTML = '000000'

    circle.style.backgroundColor = 'white'
    sectionRGB.style.backgroundColor = 'black'
    redRGB.innerHTML = '0'
    greenRGB.innerHTML = '0'
    blueRGB.innerHTML = '0'
}

// Event Listener (Reset)
resetBtn.addEventListener('click', resetColors)