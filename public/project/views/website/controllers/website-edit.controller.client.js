(function (){
    angular
        .module("WamApp")
        .controller("editWebsiteController", editWebsiteController);

    function editWebsiteController($routeParams, websiteService, $location){
        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        model.websiteId = $routeParams.wid;
        model.website = $routeParams.website;
        model.userId = $routeParams.userId;
        model.userProfile = userProfile;

        function userProfile(){
            $location.url("/profile/"+userId);
        }        function init(){
            //model.websites =  websiteService.findWebsitesForUser(model.userId);
            websiteService
                .findWebsiteById(model.websiteId, model.userId)
                .then(function (website){
                    model.website = website;
                });
            websiteService
                .findWebsitesForUser(model.userId)
                .then( function (websites){
                    model.websites = websites;
                });
        }init();


        function updateWebsite(website){
            model.websites =
                websiteService.updateWebsite(model.websiteId, website, model.userId)
                    .then(function (response){
                        return response.data;
                    });
            $location.url("/user/"+model.userId+"/website");
        }

        function deleteWebsite(websiteId){
            websiteService.deleteWebsite(websiteId, model.userId)
                .then(function (response){
                    $location.url("/user/"+model.userId+"/website");
                });
        }

    }
})();