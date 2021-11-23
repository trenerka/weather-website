const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=431e3b288421b01b841dc25bd5d61516&query=${lat},${lng}&units=m`;
  request({ url, json: true }, (error, response) => {
    const { body } = response;
    if (error) callback("Gruba greska", undefined);
    else if (body.error) callback("Bad coords", undefined);
    else
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, but it feels like ${body.current.feelslike} degrees out`
      );
  });
};

module.exports = forecast;
