// Get references to the input and output elements
let mainInput = document.querySelector("#input");
let mainOutput = document.querySelector("#output-1");
let complement = document.querySelector("#textarea-1");

// Get references to the select elements
let fromOptionEl = document.getElementById("from");
let toOptionEl = document.getElementById("option-to");

// Get initial values from select elements
let fromValue = parseInt(fromOptionEl.value);
let toValue = parseInt(toOptionEl.value);

// Get references to buttons
const swapBtn = document.querySelector("#conv-swap");
const resetBtn = document.querySelector("#conv-reset");
const convertBtn = document.querySelector("#conv-convert");

let outputDisplay = document.getElementById("text-1")
let bits = document.getElementById("text-2")
let radixDisplay = document.getElementById("radix-el")
let radixDisplay2 = document.getElementById("radix-el2")
radixDisplay.innerHTML= fromValue;
radixDisplay2.innerHTML = toValue
outputDisplay.innerHTML = toOptionEl.options[toOptionEl.selectedIndex].textContent;

// Function to check if a number is binary
function isBin(num) {
    let bin = num.toString().split("").map(Number);
    for (let i = 0; i < bin.length; i++) {
        if (bin[i] !== 0 && bin[i] !== 1) { 
            return false;
        }
    }
    return true;
}

// Functions to convert numbers to different radix
function toBin(num){
    return (num >>> 0).toString(2);   
}

function toHex(num){
    return (num >>> 0).toString(16);
}

function toDec(num, radix){
    return parseInt(num, radix);
}

function toOct(num){
    return (num >>> 0).toString(8);
}

// Function to perform conversion based on radix
function converter(num, fRadix, tRadix) {
    let value = toDec(num, fRadix);
    
    switch (fRadix) {
        case 2:
            if(isBin(num)){
                switch (tRadix) {
                    case 8:
                        return toOct(value);
                    case 10:
                        return value;
                    case 16:
                        return toHex(value);
                    default:
                        return num;
                }
            }else{
                return null
            }
            break;
        case 8:
            switch (tRadix) {
                case 2:
                    return toBin(num);
                case 10:
                    return value;
                case 16:
                    return toHex(value);
                default:
                    return num;
            }
            break;
        case 10:
            switch (tRadix) {
                case 2:
                    return toBin(num);
                case 8:
                    return toOct(num);
                case 16:
                    return toHex(num);
                default:
                    return num;
            }
            break;
        case 16:
            switch (tRadix) {
                case 2:
                    return toBin(value);
                case 8:
                    return toOct(value);
                case 10:
                    return value;
                default:
                    return value;
            }
            break;
        default:
            return num;
    }
}

function bitcounter(){
    let counter = complement.value.length;
    return counter;
}

// Function to update the complement output
function complementUpdate(input){
    if (input < 0) {
        complement.value = (input >>> 0).toString(2);
    } else {
        complement.value = (-input >>> 0).toString(2);
    }
}

// Event listener for "change" event on "from" select element
fromOptionEl.addEventListener("change", function() {
    fromValue = parseInt(fromOptionEl.value);
    radixUpdate(fromValue, toValue)
});

// Event listener for "change" event on "to" select element
toOptionEl.addEventListener("change", function() {
    toValue = parseInt(toOptionEl.value);
    radixUpdate(fromValue, toValue)
    outputDisplay.innerHTML = toOptionEl.options[toOptionEl.selectedIndex].textContent;
});

// Event listener for "input" event on input element
mainInput.addEventListener("input", function(){
    // Update numInput value
    let numInput = parseInt(mainInput.value);
    // Convert input to desired radix and display
    mainOutput.value = converter(numInput, fromValue, toValue);
    // Update complement
    complementUpdate(numInput);
    bits.innerHTML = `Signed 2's Complement (${bitcounter()}-bits)`
});

// Event listener for "click" event on "convert" button
convertBtn.addEventListener("click", function(){
    // Get input value
    let numInput = parseInt(mainInput.value);
    // Convert input to desired radix and display
    mainOutput.value = converter(numInput, fromValue, toValue);
    // Update complement
    complementUpdate(numInput);
    bits.innerHTML = `Signed 2's Complement (${bitcounter()}-bits)`
    
});

// Event listener for "click" event on "swap" button
swapBtn.addEventListener("click", function(){
    // Swap the values of "from" and "to" select elements
    let temp = fromOptionEl.value;
    fromOptionEl.value = toOptionEl.value;
    toOptionEl.value = temp;
    // Trigger change event to update fromValue and toValue
    fromOptionEl.dispatchEvent(new Event("change"));
    toOptionEl.dispatchEvent(new Event("change"));
});

// Event listener for "click" event on "reset" button
resetBtn.addEventListener("click", function(){
    // Clear input and output fields
    mainInput.value = "";
    mainOutput.value = "";
    complement.value = "";
});


function radixUpdate(fromValue, toValue){
    radixDisplay.innerHTML = fromValue;
    radixDisplay2.innerHTML = toValue;
}

// let outputDisplay = document.getElementById("text-1")
// let bits = document.getElementById("text-2")
// let radixDisplay = document.getElementById("radix-el")
// let radixDisplay2 = document.getElementById("radix-el2")