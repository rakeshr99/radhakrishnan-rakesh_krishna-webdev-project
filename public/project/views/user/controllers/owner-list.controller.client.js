(function(){
    angular
        .module("WamApp")
        .controller("ownerListController", ownerListController);

    function ownerListController(userService, $location, $routeParams){
        var model = this;

        function init(){
            model.userId = $routeParams["userId"];

            userService.getOwnersList()
                .then(function (response){
                    model.ownersList = response.data;
                })
        }init();

    }
})();