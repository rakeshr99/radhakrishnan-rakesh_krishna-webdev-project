(function (){
    //this below code makes the module read only
    angular.module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location){
        var model = this;
        var userId = $routeParams["userId"];
        model.userId = userId;

        model.updateUser = updateUser;
        model.unregister = unregister;
        function init() {
            var userId = $routeParams["userId"];
            model.userId = userId;
            userService.findUserById(userId)
                    .then(function (response){
                        model.user = response.data;
                })

        }
        init();

        function updateUser(user){
            userService.updateUser(userId, user)
                .then(function (response){
                    _user = response.data;
                    $location.url("/profile/"+userId);
                })
        }

        function unregister(userId){
            userService.unregister(userId)
                .then(function (response){
                    $location.url("/login");
                })
        }
    }

})();

