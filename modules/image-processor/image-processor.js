var fs = require('fs');
var _ = require('lodash');
var ImageConverter = require('./image-converter');

var imageConvertor = new ImageConverter();

var ImageProcessor = function () {
    var self = {},
        __self = {};

    self.process = function (tessel_data, original_image_name, directory, callback) {
        var new_filename = __self.getNewFilename(original_image_name);
        var new_image_location = directory + '/processed/' + new_filename;
        // Returns data, not file
        imageConvertor.convert(original_image_name, directory, tessel_data, function (converted_image_data) {
            // Write image file
            fs.writeFile(new_image_location, converted_image_data, function () {
                if (typeof callback === 'function') {
                    callback(new_image_location);
                }
            });
        });
    };

    __self.getNewFilename = function (filename) {
        var split_name = filename.split('/');
        return _.last(split_name);
    };

    return self;
};
module.exports = ImageProcessor;