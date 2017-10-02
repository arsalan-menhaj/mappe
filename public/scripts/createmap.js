

function updateDescription() {
  var inputValue = $('#mapdesc').val();
  if (inputValue === '') {
    $("#error-message").empty();
    $("#error-message").text("Please input");
    console.log('HAHAHAHAHA',inputValue);

  } else {

    $.post(`/users/userid/maps/mapid`, inputValue)
    .done(function(data) {
    $('.p1').text(inputValue);

      $("#error-message").empty();
    }).fail(function(error) {
    })
  }
}


$(document).ready(function () {

  $('#map-description-bar').on('submit',(event) => {
   event.preventDefault();
   console.log('submitted');
   updateDescription();
   return false;
    // console.log( $('#map-description-bar'));
 })

});