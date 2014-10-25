var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var climatelib = require('climate-si7005');

var Camera = require('./camera')

var camera = new Camera('B', 2);
var climate = climatelib.use(tessel.port['C']);
var climateR = 0;


// require ('take-photo.js');

var ambient = ambientlib.use(tessel.port['A']);

var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

var photoListener = function () {

    return true;
};

/*
function
//*/
module.exports = photoListener;

ambient.on('ready', function () {
    // Get points of light and sound data.
    var averageLevel = 0;
    var count = 0;

    /*setInterval( function () {
    ambient.getLightLevel( function(err, ldata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sdata) {
        if (err) throw err;

		//count++;
		//averageLevel += sdata.toFixed(8);
		// console.log(sdata + " <- sdata");
        //console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
    });
  })}, 500); // The readings will happen every .5 seconds unless the trigger is hit*/

    // ambient.setLightTrigger(0.5);

    // Set a light level trigger
    // The trigger is a float between 0 and 1
    /*ambient.on('light-trigger', function(data) {
    console.log("Our light trigger was hit:", data);

    // Clear the trigger so it stops firing
    ambient.clearLightTrigger();
    //After 1.5 seconds reset light trigger
    setTimeout(function () {

        ambient.setLightTrigger(0.5);

    },1500);
  });*/

    // Set a sound level trigger
    // The trigger is a float between 0 and 1

    ambient.setSoundTrigger(0.2);
    ambient.on('sound-trigger', function (data) {
        /*
	 ambient.getLightLevel(function (err, ldata) {
		  console.log("first ldata: ");
		  if (err) throw err;
		  return ldata;
	  });//*/
        /*	  //var theData;
	  ambient.getLightLevel(function (err, ldata) {

		  if (err) throw err;

		  var theData = {light:"no light", sound:"no sound"};

		  theData.light = ldata;
		  console.log("Taking photo");

		  camera.takePicture(function(err, image) {
		      if (err) {
		        console.log('error taking image', err);
		      } else {
		        notificationLED.low();
		        // Name the image
		        var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
		        // Save the image
		        console.log('Picture saving as', name, '...');
		        //process.sendfile(name, image);
		        console.log('done.');
		        // Turn the camera off to end the script
		        camera.disable();
		      }
		    });//*/

        //var theData;
        ambient.getLightLevel(function (err, ldata) {
            if (err) throw err;
            var theData = {
                light: ldata,
                volume: 0,
            };
            console.log("Taking photo");
            ambient.getSoundLevel(function (err, sdata) {
                theData.volume = sdata;
                climate.readTemperature('f', function (err, temp) {
                    theData.temperature = temp;
                    climate.readHumidity(function (err, humid) {
                        theData.humidity = humid;
                        var date = new Date();
                        theData.time = '' + Math.floor(date.getTime());
                        camera.takePhoto(theData);
                    });
                });

            });
        });

        // Clear it
        ambient.clearSoundTrigger();

        //After 1.5 seconds reset sound trigger
        setTimeout(function () {
            console.log('TRIEGGER');
            ambient.setSoundTrigger(0.2);
        }, 1500);

    });
});

ambient.on('error', function (err) {
    console.log('ERROR1!!');
    console.log(err)
});