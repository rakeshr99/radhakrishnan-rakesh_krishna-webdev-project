(function (){
    angular
        .module("WamApp")
        .controller("restaurantDetailsController", restaurantDetailsController);
        function restaurantDetailsController($routeParams, restaurantService, loggedUser, $location, reviewService){
            var model = this;
            this.createRestaurant = createRestaurant;
            this.isCustomer = isCustomer;
            this.isOwner = isOwner;
            this.deleteRestaurant = deleteRestaurant;
            this.updateRestaurant = updateRestaurant;
            this.reviewRestaurant = reviewRestaurant;
            this.createRestaurantForReview = createRestaurantForReview;
            this.getAllReviews = getAllReviews;
            this.searchRestaurantByTitle = searchRestaurantByTitle;

            function init(){
                var yelpId = $routeParams.restaurantId;
                model.userId = loggedUser._id;
                model.resId = $routeParams.restaurantId;
                restaurantService
                    .searchRestaurantById(yelpId)
                    .then(function (response){
                        model.restaurant = response;
                        if(model.restaurant == "0"){
                            restaurantService
                                .searchRestaurantByYelpId(yelpId)
                                .then(function (response){
                                    model.restaurant = response.jsonBody;
                                    model.address = model.restaurant.location[0];
                                    //return;
                                })
                        }else{
                            //return;
                        }
                    });

                //for reviews
                reviewService
                    .searchReviewById(model.userId, model.resId)
                    .then(function (response){
                        model.localReviews = response;
                        if(model.localReviews == "0"){
                            reviewService
                                .getReviewsFromYelp(model.resId)
                                .then(function (response){
                                    model.reviews = response.jsonBody.reviews;
                                    console.log(model.reviews);
                                    return;
                                    //reviewsFromYelp = response.jsonBody;
                                    //model.reviews.push(reviewsFromYelp);
                                })
                        }else{
                            model.locals = model.localReviews[0];
                            model.localReview = model.locals.reviews;
                            console.log(model.locals._id);
                            model.reviewId = model.locals._id;
                            return;
                        }
                    })

            }init();

            function getAllReviews(restaurantId){
                $location.url("/review-list/"+restaurantId);
            }

            function reviewRestaurant(restaurantId){
                $location.url("/review-restaurant/"+restaurantId);
            }

            function updateRestaurant(restaurant){
                $location.url("/update-restaurant/"+restaurant._id);
            }

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

            function createRestaurantForReview(userId, restaurant){
                restaurantService
                    .createRestaurant(userId, restaurant)
                    .then( function (restaurant){
                        model.restaurant = restaurant;
                        $location.url("/review-restaurant/"+restaurant._id);
                    });
                //$location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
            }

            function searchRestaurantByTitle(restaurantId){
                //alert(title);
                /*            restaurantService
                 .searchRestaurantByTitle(title)
                 .then(function (response){
                 model.restaurants = response.jsonBody.businesses;
                 })*/
                $location.url("/list-restaurant/"+restaurantId);

            }
        }
})();