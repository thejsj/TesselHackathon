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

  self.takePhoto = function (paramData) {
    if (__self.ready) {
      __self.notificationLED.high();
      // Take the picture
      __self.camera.takePicture(function (err, image) {
        console.log('TAKE PIC!!!');
        if (err) {
          console.log('error taking image', err);
        } else {
          __self.notificationLED.low();
          // Name the image
          var timeStamp = paramData.time;
          var name = './images/picture-' + timeStamp + '.jpg';
          var json_Name = './json/picture-' + timeStamp + '.json';
          // Save the image
          console.log('Picture saving as', name, '...');
          console.log('done.');
          process.sendfile(json_Name, JSON.stringify(paramData));
          process.sendfile(name, image);
          console.log(paramData);
          // Turn the camera off to end the script
          //__self.camera.disable();
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