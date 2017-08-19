(function () {
    angular
        .module("WamApp")
        .controller("reviewListController", reviewListController);


    function reviewListController($routeParams, reviewService, $location, loggedUser){
        var model = this;
        //model.createReview = createReview;
        this.deleteReview = deleteReview;
        this.updateReview = updateReview;

        function init(){
            model.userId= loggedUser._id;
            model.restaurantId = $routeParams.restaurantId;
            model.locals = {};
            model.localReview = {};
            model.reviewId = 0;
            var currentUser = loggedUser;/*$routeParams["userId"];*/
            model.currentUser = currentUser;
            console.log(model.currentUser.roles[0]);

            reviewService
                .searchReviewById(model.userId, model.restaurantId)
                .then(function (response){
                    model.localReviews = response;
                    if(model.localReviews == "0"){
                        reviewService
                            .getReviewsFromYelp(model.restaurantId)
                            .then(function (response){
                                model.reviews = response.jsonBody.reviews;
                                console.log(model.reviews);
                                return;
                                //reviewsFromYelp = response.jsonBody;
                                //model.reviews.push(reviewsFromYelp);
                            })
                    }else{
                        model.localReview = model.localReviews;
                        model.locals = model.localReview[0];
                        model.locals2 = model.localReview[1];
                        model.locals3 = model.localReview[2];
                        model.text1 = model.locals.reviews[0].text;
/*                        model.text2 = model.locals2.reviews[0].text;
                        model.text3 = model.locals3.reviews[0].text;*/
                        model.reviewId1 = model.locals._id;
 /*                       model.reviewId2 = model.locals._id;
                        model.reviewId3 = model.locals._id;*/
/*                        model.locals = model.localReviews[0];
                        model.localReview = model.locals.reviews;
                        console.log(model.locals._id);
                        model.reviewId = model.locals._id;
                        return;*/
                    }
                })

        }init();

        //model.deleteReview(model.userId,model.restaurantId, model.reviewId)

        function updateReview(reviewId){
            $location.url("/update-review/"+reviewId);
        }

        function deleteReview(userId, restaurantId, reviewId){
            reviewService.deleteReview(userId, restaurantId, reviewId)
                .then( function (response){
                    $location.url("/");
                });
        }

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