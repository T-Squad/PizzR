// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

// lat = 40.6769 long = -74.2155

const googleAPIKey = 'AIzaSyC4SY9ZoJsatUeEcL76DhBNKDzdlyu5PvI';

var map;
var infowindow;

// $.getJSON('https://ipinfo.io', function(data) {

//         console.log(data);
//         appLocation = data.loc.split(',');
//         console.log(appLocation[0]);
//         console.log(appLocation[1]);
//         let lat = appLocation[0];
//         let long = appLocation[1];
//         $('#locationInfo').text(data.city);


function initMap() {

    

        const pyrmont = { lat: 40.6769, lng: -74.2155 };
        const request = {
            location: pyrmont,
            radius: 500,
            query: 'pizzeria'
        }
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 13
        });
        infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
}

function callback(results, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
            console.log(results.length);

            let placeId = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + results[i].place_id + '&key=' + googleAPIKey

            // console.log(placeId);
            console.log('========================================');
            // console.log(results[i]);

            // console.log(results[i].name);
            // console.log(results[i].place_id);

            // business image

            let photoReference = results[i].photos.reference;

            console.log(photoReference);
            console.log('========================================');

            

            let newDiv = $('<div>')

        }
    }

}

function createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

initMap();

// });

