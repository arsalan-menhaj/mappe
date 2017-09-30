var map = null;
var infowindow = new google.maps.InfoWindow();
var inwindow = new google.maps.InfoWindow();
var markers = [];
var counter = 0;

function initialize() {

    var NY = new google.maps.LatLng(40.739112, -73.785848);
    map = new google.maps.Map(
    document.getElementById('map-canvas'), {
        center: NY,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListener(map, 'click', function (event) {

        addMarker(event.latLng);
    });

    google.maps.event.addListener(inwindow, 'domready', function () {
        var button = document.getElementById('inputButton');
        var input = document.getElementById('nameinput').value;
        button.onsubmit = function () {
            marker.title = input;
            inwindow.close();
        };
    });
    google.maps.event.addListener(infowindow, 'domready', function () {
        var button = document.getElementById('deleteButton');
        var id = parseInt(button.getAttribute('data-id'));
        button.onclick = function () {
            deleteMarker(id);
        };
    });
}

function addMarker(location) {

    counter++;

    var inputForm = 'Name:  <input type="text" id="nameinput" size="31" maxlength="31" tabindex="1"/>' + '<input type="button" id="inputButton" value="Submit">';


    var marker = new google.maps.Marker({
        position: location,
        map: map,
        id: counter
    });
    inwindow.setContent(inputForm);
    inwindow.open(map, marker);

    markers.push(marker);

    var deleteButton = '<button id="deleteButton" data-id="' + counter + '">Delete</button>';

    google.maps.event.addListener(marker, 'rightclick', function () {
        infowindow.setContent(deleteButton);
        infowindow.open(map, marker);
    });
}

function deleteMarker(markerId) {

    for (var i = 0; i < markers.length; i++) {

        if (markers[i].id === markerId) {

            markers[i].setMap(null);
        }
    }
}
google.maps.event.addDomListener(window,'load', initialize);
