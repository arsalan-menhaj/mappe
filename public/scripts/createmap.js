//THis becomes update description


function updateDescription() {
  var inputValue = $('.mapdesc').val();
  if (inputValue === '') {
    $("#error-message").empty();
    $("#error-message").text("Please type the name of a city for the new map!");
    console.log(inputValue);

  } else {

    
    $.put(`/users/userid/maps`, $inputValue.serialize())
    .done(function(data) {
    $('.p1').text(inputValue);
 
      $("#error-message").empty();
    }).fail(function(error) {
    })
  }
}