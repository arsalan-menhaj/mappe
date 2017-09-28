argument = process.argv[2];

// New GoogleMaps client
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBMSpojBgluxblRVHmiRw4dLUntkjdj6dM',
  Promise: Promise // 'Promise' is the native constructor.
});

// Accepts city name and places coordinates in an object
var coordinates = {};
googleMapsClient.geocode({address: argument}).asPromise()
.then((response) => {
  coordinates = response.json.results[0].geometry.location;
  console.log(coordinates);
})
.catch((err) => {
  console.log(err);
});

// Takes coordinates and finds/shows on map
function initMap(coord) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}