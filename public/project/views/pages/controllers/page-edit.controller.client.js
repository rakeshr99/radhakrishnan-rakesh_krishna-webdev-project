(function (){
    angular
        .module("WamApp")
        .controller("editPageController", editPageController);

    function editPageController($routeParams, pageService, $location){
        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        model.pageId = $routeParams.pageId;
        model.page = $routeParams.page;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        function init(){
            //model.pages = pageService.findPageByWebsiteId(model.websiteId);
            pageService.findPageById(model.userId, model.websiteId, model.pageId)
                .then( function (page){
                    model.page = page;
                });

            pageService
                .findPageByWebsiteId(model.websiteId)
                .then( function (pages){
                    model.pages = pages;
                });
        }init();

        function updatePage(page){
            pageService
                .updatePage(model.userId, model.websiteId, model.pageId, page)
                .then( function (pages){
                    model.pages = pages;
                });
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }

        function deletePage(pageId){
            pageService.deletePage(model.userId, model.websiteId,pageId)
                .then( function (response){
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                });
        }

    }
})();