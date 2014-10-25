var dataMapper = function (data_object) {
    var temperature = data_object.temperature || 80;
    var volume = data_object.volume || 0.5;
    var humidity = data_object.humidity || 50;
    var lightness = data_object.light || 0.5;

    var hue = temperature * 2;
    var brightness = lightness * 100;
    var saturation = 80 + (humidity * 0.1);
    var noise = volume * 2;

    return {
        'hue': hue, // 0 - 360
        'saturation': saturation, // 0 - 100
        'brightness': brightness, // 0 - 100
        'noise': noise // 0 - 10
    };
};
module.exports = dataMapper;