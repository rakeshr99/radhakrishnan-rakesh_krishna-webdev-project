(function() {
    angular
        .module("WamApp")
        .service("reviewService", reviewService);

    function reviewService($http){
        this.searchRestaurantByTitle = searchRestaurantByTitle;
        this.searchRestaurantByYelpId = searchRestaurantByYelpId;
        this.createReview = createReview;
        this.getAllRestaurants = getAllRestaurants;
        this.searchRestaurantById =searchRestaurantById;
        this.deleteRestaurant = deleteRestaurant;
        this.updateRestaurant = updateRestaurant;
        //this.createReview = createReview;
        this.searchReviewById = searchReviewById;
        this.getReviewsFromYelp = getReviewsFromYelp;
        this.deleteReview = deleteReview;
        this.searchReviewByIdForUpdate = searchReviewByIdForUpdate;

        function searchReviewByIdForUpdate(reviewId){
            var url = "/api/search-review/"+reviewId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function deleteReview(userId, restaurantId, reviewId){
            var url = "/api/delete-review?userId="+userId+"&restaurantId="+restaurantId+"&reviewId="+reviewId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                })
        }

        function getReviewsFromYelp(restaurantId) {
            var url = "/api/yelp-review/" + restaurantId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchReviewById(userId, restaurantId){
            var url = "/api/yelp/localSearchReview/"+restaurantId+"/"+userId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function createReview(userId, restaurantId, review){

            var url = "/api/new-review";
            return $http.post(url, {userId: userId, restaurantId :restaurantId, review : review})
                .then (function (response){
                    return response.data;
                });
        }

        function updateRestaurant(restaurantId, restaurant){
            var url = "/api/update-restaurant/"+restaurantId;
            return $http.put(url, restaurant)
                .then(function (response){
                    return response.data;
                });
        }

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
            return;

        }
    }
})();