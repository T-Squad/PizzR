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
     

    var map;
    var marker;
    var mylatlng =  {lat: 40.748999, lng: -73.985677};
    function initMap(){
      map = new
      google.maps.Map(document.getElementById('googlemap'),{
                 center:mylatlng,
                 zoom:16
                 });
      marker = new google.maps.Marker({
        animation:google.maps.Animation.DROP,
        position:mylatlng,
        map:map,
        draggable:false

      });

      console.log(map)
        console.log(marker)
        console.log(mylatlng)
        
    }



        // yelp api key
        const YELP_API = window.yelpKey

        console.log(YELP_API);

        // proxy URL to fix CORS issue
        const proxyURL = 'https://shielded-hamlet-43668.herokuapp.com/';

        const yelpURL = 'https://api.yelp.com/v3/businesses/search?term=pizza&latitude=' + lat + '&longitude=' + long + '&limit=10';
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

            let yelpInfo = $('#secondaryContents');
            let cardInfo = $('.card-title');

            $('.card-title').append(data.businesses[0].name);
            $('.card-img-top').attr('src', data.businesses[0]['image_url']);
            $('.card-title').append(data.businesses[1].name);
            $('.card-img-top').attr('src', data.businesses[1]['image_url']);
            $('.card-title').append(data.businesses[2].name);
            $('.card-img-top').attr('src', data.businesses[2]['image_url']);
            $('.card-title').append(data.businesses[3].name);
            $('.card-img-top').attr('src', data.businesses[3]['image_url']);
            $('.card-title').append(data.businesses[4].name);
            $('.card-img-top').attr('src', data.businesses[4]['image_url']);
        });
    });
}
// start the app
init();