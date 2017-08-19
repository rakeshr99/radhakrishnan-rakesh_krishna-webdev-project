(function (){
    angular
        .module("WamApp")
        .factory("userService", userService);// two ways of creating this

    function userService($http){
        var api = {
            "findUserByNameAndPassword" : login,
            "findUserById" : findUserById,
            "registerUser" : registerUser,
            "findUserByUsername" : findUserByusername,
            "updateUser" : updateUser,
            "unregister" : unregister,
            "getOwnersList" : getOwnersList,
            "checkLogin" : checkLogin,
            "followMe" : followMe,
            "logout" : logout,
            "checkAdmin" : checkAdmin,
            "findAllUsers" : findAllUsers

        };
        return api;

        function checkAdmin(){
            return $http.get("/api/checkAdmin")
                .then(function (response){
                    return response.data;
                })
        }

        function logout(){
            var url = "/api/logout";
            return $http
                .post(url)
                .then(function (response){
                    return response.data;
                })

        }

        function followMe(ownerName, userId){
/*            var owner = {};
            userService.findUserByUsername(ownerName)
                .then(function (response){
                    owner = response.data;
                });*/
            var url = "/api/owner/followMe";
            return  $http.post(url, {userId :userId, ownerName : ownerName});
        }

        function checkLogin(){
            return $http.get("/api/checkLogin")
                .then(function (response){
                    return response.data;
                })
        }

        function getOwnersList(){
            var url = "/api/owner";
            return $http.get(url);
        }

        function unregister(userId){
            var url = "/api/user/" + userId;

            return $http.delete(url);
        }

        function updateUser(userId, user){

            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }
        function findUserByusername(username){

            var  url = "/api/user?username="+ username;

            return $http.get(url);
        }

        function registerUser(user){
            var url = "/api/user";

            return $http.post(url, user);
        }

        function findUserById(userId){
            return $http.get("/api/user/" + userId);
        }

        function findAllUsers(){
            return $http.get("/api/all-users/");
        }

        function login(username, password){

            var url = "/api/login";
            return $http.post(url, {username :username, password: password});
        }
    }
})();