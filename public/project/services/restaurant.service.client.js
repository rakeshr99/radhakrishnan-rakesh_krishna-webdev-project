(function() {
    angular
        .module("WamApp")
        .service("restaurantService", restaurantService);

    function restaurantService($http){
        this.searchRestaurantByTitle = searchRestaurantByTitle;
        this.searchRestaurantByYelpId = searchRestaurantByYelpId;
        this.createRestaurant = createRestaurant;
        this.getAllRestaurants = getAllRestaurants;
        this.searchRestaurantById =searchRestaurantById;
        this.deleteRestaurant = deleteRestaurant;

        function deleteRestaurant(userId, restaurantId){
            var url = "/api/delete-restaurant?userId="+userId+"&restaurantId="+restaurantId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                })
        }

        function searchRestaurantById(yelpId){
            var url = "/api/yelp/localSearch/"+yelpId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });

        }

        function getAllRestaurants(){

            var url = "/api/list-restaurant";

            return $http.get(url)
                .then(function (response){
                    return response.data;
                });

        }

        function createRestaurant(userId, restaurant){

            var url = "/api/new-restaurant";
            return $http.post(url, {userId :userId, restaurant : restaurant})
                .then (function (response){
                    return response.data;
                });
        }

        function searchRestaurantByYelpId(yelpId){
            var url = "/api/yelp/"+yelpId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });

        }

        function searchRestaurantByTitle(title, latitude, longitude){
            var accessToken = [];

            var url = "/api/yelp/accesstoken?title="+title+"&latitude="+latitude+"&longitude="+longitude;

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
})();