var tessel = require('tessel');

var Camera = function (port, led_port) {

  var self = {},
    __self = {};

  self.init = function (port, led_port) {
    __self.camera = require('camera-vc0706').use(tessel.port[port]);
    __self.notificationLED = tessel.led[led_port]; // Set up an LED to notify when we're taking a picture
    __self.ready = false;
    __self.camera.on('ready', function () {
      __self.ready = true;
    });
    __self.camera.on('error', __self.errorHandler);
  };

  self.takePhoto = function () {
    console.log('Camera: takePhoto');
    if (__self.ready) {
      console.log('1');
      __self.notificationLED.high();
      // Take the picture
      console.log('2');
      __self.camera.takePicture(function (err, image) {
        if (err) {
          console.log('error taking image', err);
        } else {
          __self.notificationLED.low();
          // Name the image
          var name = 'picture-' + Math.floor(Date.now() * 1000) + '.jpg';
          // Save the image
          console.log('Picture saving as', name, '...');
          process.sendfile(name, image);
          console.log('done.');
          // Turn the camera off to end the script
          __self.camera.disable();
        }
      });
    } else {
      console.log('Camera Not Ready!');
    }
  };

  __self.errorHandler = function (err) {
    console.log('ERROR!!!');
    console.error(err);
  };

  self.init(port, led_port);
  return self;
};

module.exports = Camera;