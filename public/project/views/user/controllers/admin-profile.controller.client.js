(function (){
    //this below code makes the module read only
    angular.module("WamApp")
        .controller("adminProfileController", adminProfileController);

    function adminProfileController($routeParams, userService, $location, loggedUser){
        var model = this;
        var userId = loggedUser._id;/*$routeParams["userId"];*/
        model.userId = userId;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.followMe = followMe;
        model.logout = logout;
        model.createRestaurant = createRestaurant;
        model.updateUserByAdmin = updateUserByAdmin;

        function init() {
            var userId = loggedUser._id;
            model.userId = userId;
            model.role = loggedUser.roles[0];
            userService.findAllUsers()
                .then(function (response){
                    model.users = response.data;
                })

        }
        init();

        function updateUserByAdmin(userId, userRole){
            var userId_role = userId+"-"+userRole;
            if(userRole === "OWNER"){
                $location.url('/owner-profile-for-admin/'+userId_role);
            }else if(userRole === "CUSTOMER"){
                $location.url('/customer-profile-for-admin/'+userId_role);
            }
        }

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
                    $location.url("/admin");
                })
        }
    }

})();

