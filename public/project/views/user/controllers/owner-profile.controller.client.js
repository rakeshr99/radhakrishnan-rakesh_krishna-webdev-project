(function (){
    //this below code makes the module read only
    angular.module("WamApp")
        .controller("ownerProfileController", ownerProfileController);

    function ownerProfileController($routeParams, userService, $location, loggedUser){
        var model = this;
        var userId = loggedUser._id;/*$routeParams["userId"];*/
        model.userId = userId;

        model.updateUser = updateUser;
        model.unregister = unregister;
        function init() {
            var userId = loggedUser._id;
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
                    if(_user.roles[0] === "CUSTOMER"){
                        $location.url("/customer-profile/"+_user._id);
                    }else{
                        $location.url("/owner-profile/"+_user._id);
                    }
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

