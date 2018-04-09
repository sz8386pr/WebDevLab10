//code reference from https://www.w3schools.com/html/html5_geolocation.asp

var x = document.getElementById("display-coordinates");

$(document).ready(function(){

    // when user clicks get coordinates button, browser will get the user location coordinates
    $("#get-coordinates").click(function(){
        navigator.geolocation.getCurrentPosition(getCoordinates, showError);
        $('#sighting-submit-button').show()

        // var temp = $('#coordinates').val();
        // console.log(temp['latitude'],temp['longitude']);

    });

});


function getCoordinates(position){
    // round coordinates to whole number to protect privacy and set the value to the hiddne input values
    var latitude = Math.round(position.coords.latitude);
    var longitude = Math.round(position.coords.longitude);
    $('#latitude').val(latitude);
    $('#longitude').val(longitude);
    // display coordinates for the user
    x.innerHTML = "Latitude: " + latitude + ", Longitude: " + longitude;
}

// error messages
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}