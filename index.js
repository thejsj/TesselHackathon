var tessel = require('tessel');
var Camera = require('./modules/camera');

// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
var camera = new Camera('A', 1);

setInterval(function () {
    // get data
    data = getData();
    // Yuri decieds if we are going to take a photo or not
    if (false === true) {
        takePhoto();
    }
}, 100);

// Yuri calls this function
function takePhoto() {

    // Get Data
    data = getData();

    processImage(data, original_image);
}

// Ryan writes this function
function getData() {

    return {
        'temperature': 80,
        'volume': 0.5,
        'humidity': 50, //percentage
        'light': 0.5
    }; // {}
}

// Jorge Does stuff in this function
function processImage(data, image) {

    return {
        data: data,
        image: imagge, //string
        new_image: new_image // string
    };
}