(function (){
    angular
        .module("WamApp")
        .controller("restaurantDetailsController", restaurantDetailsController);
        function restaurantDetailsController($routeParams, restaurantService){
            var model = this;

            var yelpId = $routeParams.restaurantId;

            function init(){
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
        }
})();