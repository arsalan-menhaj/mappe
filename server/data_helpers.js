const googleFunctions = require("../scripts/google_api.js");

module.exports = function makeDataHelpers(db) {

  return {
    googleMapsClient: require('@google/maps').createClient({
      key: 'AIzaSyBMSpojBgluxblRVHmiRw4dLUntkjdj6dM',
      Promise: Promise // 'Promise' is the native constructor.
    });

    // Function that accepts a city name, and returns coordinates
    findCity: function(input) {
      var coordinates = {};
      googleMapsClient.geocode({address: input}).asPromise()
      .then((response) => {
        coordinates = response.json.results[0].geometry.location;
        console.log(coordinates);
        return coordinates
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}