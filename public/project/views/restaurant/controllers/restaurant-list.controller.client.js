(function () {
    angular
        .module("WamApp")
        .controller("restaurantListController", restaurantListController);

    function restaurantListController($routeParams, restaurantService, loggedUser, $location) {

        var model = this;

        this.getRestaurantDetails = getRestaurantDetails;

        //model.websiteId = $routeParams.wid;
        model.userId = loggedUser._id;
        model.restaurantId = $routeParams.restaurantId;
        function init() {
/*            var x = document.getElementById("demo");

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }*/

            navigator.geolocation.getCurrentPosition(success);

            function success(pos) {
                model.latitude = pos.coords.latitude;
                model.longitude = pos.coords.longitude;
            }

            console.log(model.latitude+"            "+model.longitude);

            var restaurantId = $routeParams.restaurantId;
            restaurantService
                .searchRestaurantByTitle(restaurantId, model.latitude, model.longitude)
                .then(function (response){
                    model.restaurants = response.jsonBody.businesses;
                    restaurantService
                        .getAllRestaurants()
                        .then( function (restaurants){
                            for(i=0; i< restaurants.length;i++){
                                restaurants[i].id = restaurants[i]._id;
                                model.restaurants.push(restaurants[i]);
                            }
                        });
                });
                //alert(title);
        }

        init();

        function getRestaurantDetails(restaurantId){
            $location.url("/restaurant-details/"+restaurantId);
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
        function showPosition(position) {
            /*                x.innerHTML = "Latitude: " + position.coords.latitude +
             "<br>Longitude: " + position.coords.longitude;*/
            var coords = [];
            coords.push(position.coords.latitude);
            coords.push(position.coords.longitude);
            return coords;
        }
    }

})();