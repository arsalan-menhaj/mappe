

function updateDescription() {
  var inputValue = $('.mapdesc').val();
  if (inputValue === '') {
    $("#error-message").empty();
    $("#error-message").text("Please input");
    console.log('HAHAHAHAHA',inputValue);

  } else {

    
    $.put(`/users/userid/maps`, inputValue)
    .done(function(data) {
    $('.p1').text(inputValue);
 
      $("#error-message").empty();
    }).fail(function(error) {
    })
  }
}


$(document).ready(function () {
 
  $('#map-description-bar').on('sumbit',(event) => {
   event.preventDefault();
    updateDescription();
    console.log( $('#map-description-bar'));
 })

});