(function(){
    angular
        .module("WamApp")
        .controller("ownerListController", ownerListController);

    function ownerListController(userService, $location, $routeParams, loggedUser){
        var model = this;
        this.followMe = followMe;

        function init(){
            model.userId = loggedUser._id;/*$routeParams["userId"];*/

            userService.getOwnersList()
                .then(function (response){
                    model.ownersList = response.data;
                })
        }init();

        function followMe(ownerName){
            userService
                .followMe(ownerName, model.userId)
                .then(function (response){
                    response.send(200);
                })
        }

    }
})();