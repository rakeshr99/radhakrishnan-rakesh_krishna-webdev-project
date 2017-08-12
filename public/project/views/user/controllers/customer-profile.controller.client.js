(function (){
    //this below code makes the module read only
    angular.module("WamApp")
        .controller("customerProfileController", customerProfileController);

    function customerProfileController($routeParams, userService, $location, loggedUser){
        console.log(loggedUser);
        var model = this;
        var userId = loggedUser._id;/*$routeParams["userId"];*/
        model.userId = userId;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.getOwnersList = getOwnersList;

        function init() {
            var userId = loggedUser._id;/*$routeParams["userId"]*/;
            model.userId = userId;
            userService.findUserById(userId)
                    .then(function (response){
                        model.user = response.data;
                })

        }
        init();

        function getOwnersList(){
                    $location.url("/customer-profile/"+model.userId+"/owners");
        }

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

