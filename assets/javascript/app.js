// create a function to start the app
function init() {

    // we want to get the location from our user
    let appLocation;
    $.getJSON('https://ipinfo.io', function(data) { // ipinfo is an api service to get user location based on IP address

        console.log(data);
        // split data.loc into 2 seperate strings
        appLocation = data.loc.split(',');
        console.log('-----------------------');
        console.log(appLocation[0]);
        console.log(appLocation[1]);
        console.log('-----------------------');
        // create a variable for latitude
        let lat = appLocation[0];
        // create a variable for longitude
        let long = appLocation[1];

        // yelp api key
        const YELP_API = window.yelpKey

        // proxy URL to fix CORS issue
        const proxyURL = 'https://shielded-hamlet-43668.herokuapp.com/';

        // concatenate the long and lat into the yelp api url. With a limit of 10 search results for Pizzeria
        const yelpURL = 'https://api.yelp.com/v3/businesses/search?term=pizzeria&latitude=' + lat + '&longitude=' + long + '&limit=10';
        $.ajax({
            // concatenate the proxyURL with the yelpURL for the CORS issue
            url: proxyURL + yelpURL,
            method: 'GET',

            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + YELP_API);
            },
            complete: function(response) {
                console.log(response)
            }

        }).done(function(data) {
            console.log(data);
            console.log('-----------------------');
            // create a for loop and loop through data.business to get the needed information
            for (let i = 0; i < data.businesses.length; i++) {
                console.log(i);
                console.log(data.businesses[i].name);
                console.log('-----------------------');

                // append the information to the DOM
                $("#results").append('<img src="' + data.businesses[i].image_url + '" style="width:20rem; height:20rem; margin:3%;">');
                $("#results").append("<p><strong>Name:</strong> " + data.businesses[i].name + "</p>");

                $("#results").append("<p><strong>Address:</strong> " + data.businesses[i].location.display_address + "</p>");

                $("#results").append("<p><strong>Phone:</strong> " + data.businesses[i].display_phone + "</p>");
                $("#results").append("<p><strong>Hours:</strong> " + data.businesses[i].name + "</p>");
                $("#results").append("<hr>");
            };
        });
    });
}

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

// start the app
init();