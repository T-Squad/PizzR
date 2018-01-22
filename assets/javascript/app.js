// app.js file goes here

// set variables for API Keys

// YELP API INFORMATION

// GEOLOCATION API INFORMATION

// GOOGLE MAPS API INFORMATION

// ======================================= //

// google maps

// function initMap() {
//     let uluru = {
//         lat: lat,
//         long: long
//     }
//     let map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 4,
//         center: uluru
//     });
//     let marker = new google.maps.Marker({
//         position: uluru,
//         map: map
//     });
// }


// LOCATION 

function init() {

    // we want to get the location from our user
    let appLocation;
    $.getJSON('https://ipinfo.io', function(data) {

        console.log(data);
        appLocation = data.loc.split(',');
        console.log(appLocation[0]);
        console.log(appLocation[1]);
        let lat = appLocation[0];
        let long = appLocation[1];
        $('#locationInfo').text(data.city);

        // yelp api key
        const YELP_API = window.yelpKey

        console.log(YELP_API);

        // proxy URL to fix CORS issue
        const proxyURL = 'https://shielded-hamlet-43668.herokuapp.com/';

        const yelpURL = 'https://api.yelp.com/v3/businesses/search?term=pizzeria&latitude=' + lat + '&longitude=' + long + '&limit=10';
        $.ajax({
            url: proxyURL + yelpURL,
            method: 'GET',
            // headers: {
            //  authorization: 'Bearer' + YELP_API
            // }
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + YELP_API);
            },
            complete: function(response) {
                console.log(response)
            }
            // }).done(response, => {
            //  console.log(response);
        }).done(function(data) {
            console.log(data);
            // let img = $('<img>').attr('src', data.businesses[0]['image_url']);
            // let businessText = JSON.parse(data.);

            for (var i = 0; i < data.businesses.length; i++) {
                console.log(i);
                console.log(data.businesses[i].name);
                $("#results").append('<img src="' + data.businesses[i].image_url +'" style="width:20rem; height:20rem; margin:3%;">');
                $("#results").append("<p><strong>Name:</strong> " + data.businesses[i].name + "</p>");

                $("#results").append("<p><strong>Address:</strong> " + data.businesses[i].location.display_address + "</p>");

                $("#results").append("<p><strong>Phone:</strong> " + data.businesses[i].display_phone + "</p>");
                $("#results").append("<p><strong>Hours:</strong> " + data.businesses[i].name + "</p>");
                $("#results").append("<hr>");
            };


            // let yelpInfo = $('#secondaryContents');
            // let cardInfo = $('.card-title');

            // $('.card-title').append(data.businesses[0].name);
            // $('.card-img-top').attr('src', data.businesses[0]['image_url']);
            // $('.card-title').append(data.businesses[1].name);
            // $('.card-img-top').attr('src', data.businesses[1]['image_url']);
            // $('.card-title').append(data.businesses[2].name);
            // $('.card-img-top').attr('src', data.businesses[2]['image_url']);
            // $('.card-title').append(data.businesses[3].name);
            // $('.card-img-top').attr('src', data.businesses[3]['image_url']);
            // $('.card-title').append(data.businesses[4].name);
            // $('.card-img-top').attr('src', data.businesses[4]['image_url']);
        });
    });
}

init();