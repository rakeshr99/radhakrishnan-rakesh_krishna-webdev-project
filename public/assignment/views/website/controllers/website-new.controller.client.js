(function () {
    angular
        .module("WamApp")
        .controller("newWebsiteController", newWebsiteController)


    function newWebsiteController($routeParams, websiteService, $location){
        var model = this;
        model.createWebsite = createWebsite;

        model.userId = $routeParams.userId;
        model.website = $routeParams.website;
        function init(){
            websiteService
                .findWebsitesForUser(model.userId)
                .then( function (websites){
                    model.websites = websites;
                });
        }init();

        function createWebsite (website){
            model.websites =
                websiteService.createWebsite(model.userId, model.website)
                    .then(function (response){
                        return response.data;
                    });

            $location.url("/user/"+model.userId+"/website");
        }
    }

})();