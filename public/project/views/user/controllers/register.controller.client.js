(function(){
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location){
        var model = this;

        model.registerUser = registerUser;
        function init(){

        }init();

        function registerUser(user) {
            if (!(user == null)) {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if (_user === "0") {
                            return userService.registerUser(user);
                        } else {
                            model.error = "User already exists";
                        }
                    })
                    .then(function (res) {
                        _user = res.data;
                        if (_user.roles[0] === "CUSTOMER") {
                            $location.url("/customer-profile");
                        } else {
                            $location.url("/owner-profile");
                        }
                    });
            }
        }
    }
})();