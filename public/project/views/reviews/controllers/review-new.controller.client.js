(function () {
    angular
        .module("WamApp")
        .controller("newReviewController", newReviewController);


    function newReviewController($routeParams, reviewService, $location, loggedUser){
        var model = this;
        model.createReview = createReview;

        function init(){
            model.userId= loggedUser._id;
            model.restaurantId = $routeParams.restaurantId;
        }init();

        function createReview(userId, restaurantId, review){

            reviewService
                .createReview(userId, restaurantId, review)
                .then( function (reviews){
                    model.reviews = reviews;
                    $location.url("/restaurant-details/"+restaurantId);
                });
        }
    }

})();