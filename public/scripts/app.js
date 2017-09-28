let userid;


// Helper function to make input field visible/invisible
function changeFieldStatus($element) {
  if ($element.css('display') !== 'none') {
    $element.css('display','none');
  } else {
    $element.css('display','inline-block');
  }
}


// Helper function for form validation
function takeCityInput() {

  if (input === '') {
    $("#error-message").empty();
    $("#error-message").text("Please type the name of a city for the new map!");

  } else {
    $.post(`/users/userid/maps`, $city_input.serialize())
    .done(function(data) {
      console.log('Button clicked, performing ajax call...');
      $("#error-message").empty();
    }).fail(function(error) {
      console.error(error);
    })
  }
}

function toggleCreateMap() {
  $city_input.slideToggle();
  $city_input.find("textarea").focus();
}


$(document).ready(function () {

  // Event handler for "Create Map" button on Home Page
  let $create_map;
  let $city_input;
  $create_map.on('click', (event) => {
    toggleCreateMap();
  });

  // Event handler for "Submit" button in "Create Map" field on Home Page
  $city_input.on('submit', (event) => {
    event.preventDefault();
    var formData = $(this).serialize();
    var inputValue = $city_input.val();
    takeCityInput();
  });

  // Event handler for when user clicks on a particular location
  // on a map in the Create/Edit map page
  let $location;
  $location.on('click', (event) => {
    // Need to find unique location identifiers from Maps API

    // Bring up Location Box when clicked
    // Contains Name, Tags, Address, Rating, Possibly Contact Info

    // If this location has already been added to the map,
    // Show Description and Images

  })

})