(function () {
    angular
        .module("WamApp")
        .controller("editReviewController", editReviewController);


    function editReviewController($routeParams, reviewService, $location, loggedUser){
        var model = this;
        model.updateReview = updateReview;

        //model.userId= loggedUser._id;
        function init(){
            model.userId = loggedUser._id;
            model.reviewId = $routeParams.reviewId;
            model.review = {};
            model.user = {};
            reviewService
                .searchReviewByIdForUpdate(model.reviewId)
                .then(function (response){
                    model.review = response;
                    model.review.reviews.text = model.review.text;
                    model.review.reviews.rating = model.review.text;
                    model.user = model.review.reviews[0].user;
                    model.review.reviews.user.name = model.user.name;
                    model.review.reviews.user.image_url = model.user.image_url;
                })
        }init();


        function updateReview(restaurant, photos){
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