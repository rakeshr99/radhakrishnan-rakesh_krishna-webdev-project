(function (){
    //this below code makes the module read only
    angular.module("WamApp")
            .controller("loginController", loginController);

    function loginController($location, userService, $rootScope){

        var model = this;
        model.login = login;
        function init(){

        }
        init();
        function login(user){
                    if(!user){
                        model.errorMessage = "Invalid login credentials, the username or password you entered is incorrect";
                        return;
                    }

                    userService.findUserByNameAndPassword(user.username, user.password)
                        .then(function (response){
                            user = response.data;
                            if(user){
                                $rootScope.currentUser = user;
                                if(user.roles[0] === "CUSTOMER") {
                                    $location.url("customer-profile");
                                }else {
                                    $location.url("owner-profile");
                                }
                            }else{
                                model.errorMessage = "Invalid login credentials, the username or password you entered is incorrect";
                            }
                        })

        }
    }

})();

