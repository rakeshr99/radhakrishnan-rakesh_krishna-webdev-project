(function () {
    angular
        .module("WamApp")
        .controller("newPageController", newPageController);


    function newPageController($routeParams, pageService, $location){
        var model = this;
        model.createPage = createPage;

        model.websiteId = $routeParams.wid;
        model.page = $routeParams.page;
        model.pageId = $routeParams.pageId;
        model.userId=$routeParams.userId;
        function init(){
           pageService
               .findPageByWebsiteId(model.websiteId)
               .then( function (pages){
                   model.pages = pages;
               });
        }init();

        function createPage (website){
            pageService
                .createPage(model.websiteId, model.page, model.userId)
                .then( function (pages){
                    model.pages = pages;
                });
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }
    }

})();