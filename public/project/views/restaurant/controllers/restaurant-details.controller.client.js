(function (){
    angular
        .module("WamApp")
        .controller("restaurantDetailsController", restaurantDetailsController);
        function restaurantDetailsController($routeParams, restaurantService, loggedUser){
            var model = this;
            this.createRestaurant = createRestaurant;
            this.isCustomer = isCustomer;
            this.isOwner = isOwner;
            this.deleteRestaurant = deleteRestaurant;

            var yelpId = $routeParams.restaurantId;

            function init(){
                model.userId = loggedUser._id;
                restaurantService
                    .searchRestaurantById(yelpId)
                    .then(function (response){
                        model.restaurant = response;
                        if(model.restaurant == "0"){
                            restaurantService
                                .searchRestaurantByYelpId(yelpId)
                                .then(function (response){
                                    model.restaurant = response.jsonBody;
                                    return;
                                })
                        }else{
                            return;
                        }
                    })
            }init();

            function deleteRestaurant(userId, restaurantId){
                restaurantService.deleteRestaurant(userId, restaurantId)
                    .then( function (response){
                        $location.url("/");
                    });
            }

            function isCustomer(){
                if(loggedUser.roles[0] == "CUSTOMER"){
                    return true;
                }else{
                    return false;
                }
            }

            function isOwner(){
                if(loggedUser.roles[0] == "OWNER"){
                    return true;
                }else{
                    return false;
                }
            }

            function createRestaurant (userId, restaurant){
                restaurantService
                    .createRestaurant(userId, restaurant)
                    .then( function (restaurants){
                        model.restaurants = restaurants;
                    });
                //$location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
            }
        }
})();