(function (){
    angular
        .module("WamApp")
        .controller("homeController", homeController);


    function homeController(restaurantService, $location){
        var model =this;

            model.searchRestaurantByTitle = searchRestaurantByTitle;

        function init(){
/*            var x = document.getElementById("demo");

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }

            function showPosition(position) {
                x.innerHTML = "Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude;
                model.latitude = position.coords.latitude;
                model.longitude = position.coords.longitude
            }*/
        }init();

        function searchRestaurantByTitle(restaurantId){
            //alert(title);
/*            restaurantService
                .searchRestaurantByTitle(title)
                .then(function (response){
                    model.restaurants = response.jsonBody.businesses;
                })*/
            $location.url("/list-restaurant/"+restaurantId);

        }


    }
})();