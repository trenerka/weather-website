const request = require("request");

const geocode = (country, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=pk.eyJ1IjoidHJlbmVya2EiLCJhIjoiY2t3M3Iya21iMXJpazJubnRqbjVmMXk1bSJ9.xfxIsIszKrxLEPIeeMb3ow&limit=1`;
  request({ url, json: true }, (error, response) => {
    const { body } = response;
    if (error) callback("Gruba greska", undefined);
    else if (!body.features.length) callback("Ne postoji ta drzava", undefined);
    else if (!country) console.log("U koju drzavu??");
    else {
      const latitude = body.features[0].center[1],
        longitude = body.features[0].center[0],
        location = body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};
module.exports = geocode;
