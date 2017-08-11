(function () {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;

        model.websiteId = $routeParams.wid;
        function init() {
            model.userId=$routeParams.userId;
            model.websiteId=$routeParams.wid;
            pageService
                .findPageByWebsiteId(model.websiteId, model.userId)
                .then( function (pages){
                    model.pages = pages;
                });
        }

        init();
    }

})();