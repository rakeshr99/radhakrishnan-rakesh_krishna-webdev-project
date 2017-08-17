(function (){
    //this below code makes the module read only
    angular.module("WamApp")
            .config(configuration)
            .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    function configuration($routeProvider, $httpProvider){

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
        $routeProvider
            .when("/", {
                templateUrl:"views/home/templates/home.view.client.html",
                controller : "homeController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }})
/*            .when("/restaurant/:yelpId", {
                templateUrl: "views/restaurant/templates/restaurant-details.view.client.html",
                controller: "restaurantDetailsController",
                controllerAs: "model"
            })*/
            .when("/login", {
                templateUrl:"views/user/templates/login.view.client.html",
                controller : "loginController",
                controllerAs : "model"})
            .when("/register", {
                templateUrl : "views/user/templates/register.view.client.html",
                controller : "registerController",
                controllerAs : "model"
            })
            .when("/customer-profile", {
                templateUrl : "views/user/templates/customer-profile.view.client.html",
                controller : "customerProfileController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/owner-profile", {
                templateUrl : "views/user/templates/owner-profile.view.client.html",
                controller : "ownerProfileController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/new-restaurant", {
                templateUrl : "views/restaurant/templates/restaurant-new.view.client.html",
                controller : "newRestaurantController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/list-restaurant/:restaurantId", {
                templateUrl : "views/restaurant/templates/restaurant-list.view.client.html",
                controller : "restaurantListController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/restaurant-details/:restaurantId", {
                templateUrl : "views/restaurant/templates/restaurant-details.view.client.html",
                controller : "restaurantDetailsController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/update-restaurant/:restaurantId", {
                templateUrl : "views/restaurant/templates/restaurant-edit.view.client.html",
                controller : "editRestaurantController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/review-restaurant/:restaurantId", {
                templateUrl : "views/reviews/templates/review-new.view.client.html",
                controller : "newReviewController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/review-list/:restaurantId", {
                templateUrl : "views/reviews/templates/review-list.view.client.html",
                controller : "reviewListController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/update-review/:reviewId", {
                templateUrl : "views/reviews/templates/review-edit.view.client.html",
                controller : "editReviewController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/user/:userId/website", {
                templateUrl : "views/website/templates/website-list.view.client.html",
                controller : "websiteListController",
                controllerAs : "model"})
            .when("/user/:userId/website/new", {
                templateUrl : "views/website/templates/website-new.view.client.html",
                controller : "newWebsiteController",
                controllerAs : "model"
                })
            .when("/user/:userId/website/:wid", {
                templateUrl : "views/website/templates/website-edit.view.client.html",
                controller : "editWebsiteController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page", {
                templateUrl : "views/pages/templates/page-list.view.client.html",
                controller : "pageListController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/new", {
                templateUrl : "views/pages/templates/page-new.view.client.html",
                controller : "newPageController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pageId", {
                templateUrl : "views/pages/templates/page-edit.view.client.html",
                controller : "editPageController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pageId/widget", {
                templateUrl : "views/widget/templates/widget-list.view.client.html",
                controller : "widgetListController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pageId/widget/new", {
                templateUrl : "views/widget/templates/widget-choose.view.client.html",
                controller : "newWidgetController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pageId/widget/:widgetId", {
                templateUrl : "views/widget/templates/widget-edit.view.client.html",
                controller : "editWidgetController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pageId/widget/:widgetId/search", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller : "flickrImageSearchController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pageId/widget/:widgetId/search", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller : "flickrImageSearchController",
                controllerAs : "model"
            })
            .when("/owners", {
                templateUrl: "views/user/templates/owner-list.view.client.html",
                controller : "ownerListController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
            .when("/owner", {
                templateUrl : "views/user/templates/owner-profile.view.client.html",
                controller : "ownerProfileController",
                controllerAs : "model",
                resolve: {
                    loggedUser : checkLogin
                }
            })
    }

    function checkLogin(userService, $q, $location){
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user){
                if(user === '0'){
                    deferred.reject();
                    $location.url("/login");
                }else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;

    }
})();

