var tessel = require('tessel');
var Camera = require('./modules/camera');
var ImageProcessor = require('./modules/image-processor');

// Instances
var camera = new Camera('A', 1);
var image_processor = new ImageProcessor();

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
    image_processor.process(data, image);
    return {
        data: data,
        image: imagge, //string
        new_image: new_image // string
    };
}
processImage({
    'temperature': 80,
    'volume': 0.5,
    'humidity': 50, //percentage
    'light': 0.5
}, '')