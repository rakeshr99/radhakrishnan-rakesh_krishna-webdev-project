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
                templateUrl:"views/home/home.view.client.html",
                controller : "homeController",
                controllerAs : "model"})
            .when("/login", {
                templateUrl:"views/user/templates/login.view.client.html",
                controller : "loginController",
                controllerAs : "model"})
            .when("/register", {
                templateUrl : "views/user/templates/register.view.client.html",
                controller : "registerController",
                controllerAs : "model"})
            .when("/profile/:userId", {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller : "profileController",
                controllerAs : "model"})
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

    }
})();

