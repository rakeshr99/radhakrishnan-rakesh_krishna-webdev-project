(function(){
    angular
        .module("YelpApp", ["ngRoute"])
        .controller("searchController", searchController)
        .controller("detailsController", detailsController)
        .config(configuration)
        .service("restaurantService", restaurantService);

    function init(){

    }init();

    function configuration($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "search.html",
                controller : "searchController",
                controllerAs : "model"
            })
            .when("/restaurant/:yelpId", {
                templateUrl: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }

    function restaurantService($http){
        this.searchRestaurantByTitle = searchRestaurantByTitle;
        this.searchRestaurantByYelpId = searchRestaurantByYelpId;

        function searchRestaurantByYelpId(yelpId){
            var url = "/api/yelp/"+yelpId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });

        }

        function searchRestaurantByTitle(title){
            var accessToken = [];

                var url = "/api/yelp/accesstoken";

                 return $http.get(url)
                    .then(function (response){
                        return response.data;
                    });
/*                    .then(function (response){
                        accessToken = response.data;
            });*/
            //var searchEndpointUrl = "https://api.yelp.com/v3/businesses/search?term="+title+"&location=boston";

            //for yelp
            return;

        }
    }

    function detailsController($routeParams, restaurantService){
            var model = this;

            var yelpId = $routeParams.yelpId;

            function init(){
                restaurantService
                    .searchRestaurantByYelpId(yelpId)
                    .then(function (response){
                        model.restaurant = response.jsonBody;
                    })
            }init();
    }

    function searchController(restaurantService){
        var model =this;

        model.searchRestaurantByTitle = searchRestaurantByTitle;

        function searchRestaurantByTitle(title){
            //alert(title);
            restaurantService
                .searchRestaurantByTitle(title)
                .then(function (response){
                    model.restaurants = response.jsonBody.businesses;
                })
        }


    }
})();