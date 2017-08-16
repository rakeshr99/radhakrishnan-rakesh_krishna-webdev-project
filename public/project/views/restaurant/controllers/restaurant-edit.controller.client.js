(function () {
    angular
        .module("WamApp")
        .controller("editRestaurantController", editRestaurantController);


    function editRestaurantController($routeParams, restaurantService, $location, loggedUser){
        var model = this;
        model.updateRestaurant = updateRestaurant;

        //model.userId= loggedUser._id;
        function init(){
            model.userId = loggedUser._id;
            model.restaurantId = $routeParams.restaurantId;
            restaurantService
                .searchRestaurantById(model.restaurantId)
                .then(function (response){
                    model.restaurant = response;
                    model.photos = [];
                    model.categories = [];
                    model.location = [];
                    //model.categories = model.restaurant.categories;
                    //model.location = model.restaurant.location;
                    model.photos.photo1 = model.restaurant.photos[0];
                    model.photos.photo2 = model.restaurant.photos[1];
                    model.photos.photo3 = model.restaurant.photos[2];
                    model.restaurant.categories.alias = model.restaurant.categories[0].alias;
                    model.restaurant.categories.title = model.restaurant.categories[0].title;
                    model.restaurant.location.address1 = model.restaurant.location[0].address1;
                    model.restaurant.location.address2 = model.restaurant.location[0].address2;
                    model.restaurant.location.address3 = model.restaurant.location[0].address3;
                    model.restaurant.location.city = model.restaurant.location[0].city;
                    model.restaurant.location.zip_code = model.restaurant.location[0].zip_code;
                    model.restaurant.location.country = model.restaurant.location[0].country;
                    model.restaurant.location.state = model.restaurant.location[0].state;
                    model.restaurant.location.display_address = model.restaurant.location[0].display_address    ;
                    model.restaurant.location.address1 = model.restaurant.location[0].address1;

                        //model.restaurant.categories.alias


                })
        }init();

        function updateRestaurant(restaurant, photos){
            restaurant.photos = [];
            if(photos != null){
                restaurant.photos.push(photos.photo1, photos.photo2, photos.photo3);
            }

            restaurantService
                .updateRestaurant(model.restaurantId, restaurant)
                .then( function (restaurants){
                    model.restaurants = restaurants;
                    $location.url("/");
                });

        }
    }

})();