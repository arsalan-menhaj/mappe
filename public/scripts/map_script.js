// How to use this script:
// Include this script in the page where a map needs to be shown
// Include another script that will contain/produce a 'coordinates variable'


// API key will need to be moved!!!!
var api_key = 'AIzaSyBMSpojBgluxblRVHmiRw4dLUntkjdj6dM';

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: coordinates
  });
  var marker = new google.maps.Marker({
    position: coordinates,
    map: map
  });
}

var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=initMap`;


