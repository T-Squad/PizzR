// This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    const googleAPIKey = 'AIzaSyC4SY9ZoJsatUeEcL76DhBNKDzdlyu5PvI';
    // console.log(lat);
    // console.log(long);
    var map;
    var infowindow;

    function initMap() {
        var pyrmont = { lat: 40.7364, lng: -74.0724 };
        var request = {
            location: pyrmont,
            radius: 500,
            query: 'pizza'
        }

        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 13
        });

        infowindow = new google.maps.InfoWindow();

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);


        // service.nearbySearch({
        //     location: pyrmont,
        //     radius: 500,
        //     type: ['restaurant']
        // }, callback);

        // service = new google.maps.places.PlacesService(map);
        // service.textSearch(request, callback);
        // nearbySearch

        // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
    }

    function callback(results, status) {
        
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
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

                // https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=<REFERENCE_ID_BEING_RETURNED_FROM_API>&key=YOUR_API_KEY




                // let idURL = $('<a>').attr('href', 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + results[i].place_id + '&key=' + googleAPIKey);
                // let idURL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + results[i].id + '&key=' + googleAPIKey;
                // $('.places').append(results[i].name);
                // $('.places').append(idURL);
                // newDiv = $('<div>').append(idURL);

                let newDiv = $('<div>')

            }
        }

    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    initMap();