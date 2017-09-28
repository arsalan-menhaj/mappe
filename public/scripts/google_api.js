module.exports = function googleFunctions () {

  return {
    // New GoogleMaps client
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

      /* Takes coordinates and finds/shows on map
      function initMap(coord) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: coord
        });
        var marker = new google.maps.Marker({
          position: coord,
          map: map
        });
        return `<script src="https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=initMap"
    async defer></script>`
      }
      */
    }

  }

  // Accepts city name and places coordinates in an object

}

