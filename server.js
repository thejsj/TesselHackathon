var chokidar = require('chokidar');
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
        if (_.last(path.split('.')) === 'jpg' || _.last(path.split('.')) === 'png') {
            processImage({
                'temperature': 80,
                'volume': 0.5,
                'humidity': 50, //percentage
                'light': 0.5
            }, path, process.env.PWD, function (new_filename) {
                console.log('Image Added and Processed');
            });
        }
    });

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