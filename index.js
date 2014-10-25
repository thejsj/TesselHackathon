var tessel = require('tessel');
var Camera = require('./modules/camera');

// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
var camera = new Camera('A', 1);

tessel.button.on('press', function (time) {
    console.log('Button Press');
    camera.takePhoto();
});