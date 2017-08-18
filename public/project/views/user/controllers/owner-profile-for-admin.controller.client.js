(function (){
    //this below code makes the module read only
    angular.module("WamApp")
        .controller("ownerProfileForAdminController", ownerProfileForAdminController);

    function ownerProfileForAdminController($routeParams, userService, $location){
        var model = this;
/*        var userId = loggedUser._id;/!*$routeParams["userId"];*!/
        model.userId = userId;*/

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.followMe = followMe;
        model.logout = logout;
        model.createRestaurant = createRestaurant;

        function init() {
            var userId_role = $routeParams["userId_role"];
            var splitparams = userId_role.split("-");
            model.userId = splitparams[0];
            model.role = splitparams[1];
            var userId = model.userId;

            userService.findUserById(model.userId)
                .then(function (response){
                    model.user = response.data;
                });

        }
        init();

        function createRestaurant(){
            $location.url('/new-restaurant');
        }

        function logout(){
            userService
                .logout()
                .then(function (){
                    $location.url('/login')
                })
        }

        function followMe(){
            userService
                .followMe(model.userId)
                .then(function (response){
                    response.send(200);
                })
        }

        function updateUser(userId, user){
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

