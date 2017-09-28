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
function takeCityInput($form) {
  if (input === '') {
    $("#error-message").empty();
    $("#error-message").text("Please type the name of a city for the new map!");
  } else {
    $.post(`/users/userid/maps`, $form.serialize())
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
  $create_map.on('click', function(event) {
    toggleCreateMap();
  });

  // Event handler for "Submit" button in "Create Map" field on Home Page
  $city_input.on('submit', function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var inputValue = $city_input.val();
    takeCityInput(inputValue);
  });

})