// google api key
const googleAPIKey = window.googleKey;

// set variables for the map
let map;
let infowindow;

// create a function to request location and search query for google places
function initMap() {    

        const apploc = { lat: 40.6769, lng: -74.2155 }; // we had to hard code the long and lat for now...
        // in our request we cant to find pizzerias in a 500 feet radius of our current location
        const request = {
            location: apploc,
            radius: 500,
            query: 'pizzeria'
        }
        map = new google.maps.Map(document.getElementById('map'), {
            // map centers in at this location
            center: apploc,
            // set zoom of the map to 13
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

