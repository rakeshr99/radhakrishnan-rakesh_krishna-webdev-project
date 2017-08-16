(function () {
    angular
        .module("WamApp")
        .controller("newRestaurantController", newRestaurantController);


    function newRestaurantController($routeParams, restaurantService, $location, loggedUser){
        var model = this;
        model.createRestaurant = createRestaurant;

/*        model.websiteId = $routeParams.wid;
        model.page = $routeParams.page;
        model.pageId = $routeParams.pageId;*/
        model.userId= loggedUser._id;
        function init(){

        }init();

        function createRestaurant(restaurant, photos){

            restaurant.photos = [];

                restaurant.photos.push(photos.photo1, photos.photo2, photos.photo3)

            restaurantService
                .createRestaurant(model.userId, restaurant)
                .then( function (restaurants){
                    model.restaurants = restaurants;
                    $location.url("/");
                });
        }
    }

})();