var chokidar = require('chokidar');
var fs = require('fs');
var ImageProcessor = require('./modules/image-processor/image-processor');
var _ = require('lodash');

var image_processor = new ImageProcessor();
console.log(process.env.PWD + '/data');
var data_watcher = chokidar.watch(process.env.PWD + '/data', {
    ignored: /^\./,
    persistent: true
});

data_watcher
    .on('all', function (type, path, stats) {
        if ((_.last(path.split('.')) === 'jpg' || _.last(path.split('.')) === 'png') && path[9] !== 'processed') {
            var json_filename = getJsonName(path);
            getJSONFromFile(json_filename, function (json) {
                // Extend defaults
                var properties = _.extend({
                    'temperature': 80,
                    'volume': 0.5,
                    'humidity': 50, //percentage
                    'light': 0.5,
                    'time': getTimestamp(path)
                }, json);
                processImage(properties, path, process.env.PWD, function (new_filename) {
                    console.log('Image Added and Processed');
                });
            });
        }
    });

function getJsonName(path) {
    var json = path.split('.')[0] + '.json';
    return json;
}

function getTimestamp(path) {
    var __path = path.split('.');
    var timestamp = _.last(__path[0].split('-'));
    return __path;
}

function getJSONFromFile(filename, callback) {
    setTimeout(function () {
        fs.readFile(filename, function (err, data) {
            if (err) throw err;
            var json = JSON.parse(data.toString('utf-8'));
            if (typeof callback === 'function') {
                callback(json);
            }
        });
    }, 200);
}

// Jorge Does stuff in this function
function processImage(data, image_location, directory, callback) {
    var new_image = image_processor.process(data, image_location, directory, function (new_image_location) {
        if (typeof callback === 'function') {
            callback({
                data: data,
                image_location: image_location, //string
                new_image_location: new_image_location // string
            });
        }
    });
}