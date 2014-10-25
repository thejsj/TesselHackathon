var fs = require('fs');
var _ = require('lodash');
var dataMapper = require('./data-mapper');
var exec = require('child_process').exec;

var ImageConverter = function () {

    var self = {},
        __self = {};

    self.init = function () {

    };

    self.convert = function (original_image_name, direcotry, tessel_data, callback) {
        // Get Image Parameters
        var image_parameters = dataMapper(tessel_data);
        var command_string = __self.getCommandString(original_image_name, direcotry, image_parameters);
        var __filename = __self.getTempFilename(direcotry, original_image_name);
        exec(command_string, function () {
            fs.readFile(__filename, function (err, image_data) {
                if (err) throw err;
                if (typeof callback === 'function') {
                    callback(image_data);
                }
            });
        });
    };

    __self.getCommandString = function (original_image_name, direcotry, image_parameters) {
        var p = image_parameters;
        var command = 'convert ';
        command += '\"' + original_image_name + '\"';
        command += ' -noise ' + p.noise;
        command += ' ' + '-set option:modulate:colorspace hsb';
        command += ' -modulate ' + p.hue + ',' + p.saturation + ',' + p.brightness;
        command += ' \"' + __self.getTempFilename(direcotry, original_image_name) + '\"';
        return command;
    };

    __self.getTempFilename = function (direcotry, filename) {
        var filetype = filename.split('.');
        return direcotry + '/__temp__.' + _.last(filetype);
    };

    self.init();
    return self;
};

module.exports = ImageConverter;