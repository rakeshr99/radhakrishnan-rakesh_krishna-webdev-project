(function () {
    angular
        .module("WamApp")
        .controller("reviewListController", reviewListController);


    function reviewListController($routeParams, reviewService, $location, loggedUser){
        var model = this;
        //model.createReview = createReview;

        function init(){
            model.userId= loggedUser._id;
            model.restaurantId = $routeParams.restaurantId;
            model.locals = {};
            model.localReview = {};

            reviewService
                .searchReviewById(model.restaurantId)
                .then(function (response){
                    model.localReviews = response;
                    if(model.localReviews == "0"){
                        reviewService
                            .getReviewsFromYelp(model.restaurantId)
                            .then(function (response){
                                model.reviews = response.jsonBody.reviews;
                                console.log(model.reviews)
                                return;
                                //reviewsFromYelp = response.jsonBody;
                                //model.reviews.push(reviewsFromYelp);
                            })
                    }else{
                        model.locals = model.localReviews[0];
                        model.localReview = model.locals.reviews;
                        return;
                    }
                })

        }init();

        function createReview(restaurantId, review){

            reviewService
                .createReview(restaurantId, review)
                .then( function (reviews){
                    model.reviews = reviews;
                    $location.url("/restaurant-details/"+restaurantId);
                });
        }
    }

})();