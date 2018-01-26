// create a function to start the app
function init() {

    // we want to get the location from our user
    let appLocation;
    $.getJSON('https://ipinfo.io', function(data) { // ipinfo is an api service to get user location based on IP address

        console.log(data);
        // split data.loc into 2 seperate strings
        appLocation = data.loc.split(',');

        // console.log('-----------------------');
        // console.log(appLocation[0]);
        // console.log(appLocation[1]);
        // console.log('-----------------------');

        // create a variable for latitude
        let lat = appLocation[0];
        // create a variable for longitude
        let long = appLocation[1];

         
        // yelp api key
        const YELP_API = window.yelpKey

        // proxy URL to fix CORS issue
        const proxyURL = 'https://shielded-hamlet-43668.herokuapp.com/';

        // concatenate the long and lat into the yelp api url. With a limit of 10 search results for Pizzeria
        const yelpURL = 'https://api.yelp.com/v3/businesses/search?term=pizzeria&latitude=40.730771&longitude=-74.065707&limit=20';
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
            // console.log(data);
            // console.log('-----------------------');

            // create a for loop and loop through data.business to get the needed information
            for (let i = 0; i < data.businesses.length; i++) {
                // console.log(i);
                // console.log(data.businesses[i].name);
                // console.log('-----------------------');

                

                // append the information to the DOM
                $(".results").append('<img class="img-fluid" src="' + data.businesses[i].image_url + '" style="width:15rem; height:15rem; margin:3%;">');
                $(".results").append('<p><strong>Name:</strong> ' + data.businesses[i].name + '</p>');

                $(".results").append("<p><strong>Address:</strong> " + data.businesses[i].location.display_address + "</p>");

                $(".results").append("<p><strong>Phone:</strong> " + data.businesses[i].display_phone + "</p>");
                // $("#results").append("<p><strong>Hours:</strong> " + data.businesses[i].name + "</p>");
                $(".results").append("<hr>");
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

    const apploc = { lat: 40.730771, lng: -74.065707 }; // we had to hard code the long and lat for now...
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
            // console.log(results.length);
            let placeId = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + results[i].place_id + '&key=' + googleAPIKey

            // // console.log(placeId);
            // console.log('========================================');
            // // console.log(results[i]);
            // // console.log(results[i].name);
            // // console.log(results[i].place_id);
        }
    }

}

function createMarker(place) {
    let pizzr = './assets/images/favicon.ico'
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        icon: pizzr,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

// start the map
initMap();

// start the app
init();

$(function(){
    $("#typed").typed({
        // 'pizzr /peet-ser/ noun - a smart tool that will calculate how many steps from deliciousness you are.'
        strings: ['Cheese?', 'Sauce?', 'Pepperoni?', 'Pizza?'],
        // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
        stringsElement: null,
        // typing speed
        typeSpeed: 30,
        // time before typing starts
        startDelay: 1200,
        // backspacing speed
        backSpeed: 20,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: true,
        // false = infinite
        loopCount: 5,
        // show cursor
        showCursor: false,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
    });
});