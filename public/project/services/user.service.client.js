(function (){
    angular
        .module("WamApp")
        .factory("userService", userService);// two ways of creating this

    function userService($http){
/*        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];*/
        var api = {
            "findUserByNameAndPassword" : findUserByNameAndPassword,
            "findUserById" : findUserById,
            "registerUser" : registerUser,
            "findUserByUsername" : findUserByusername,
            "updateUser" : updateUser,
            "unregister" : unregister

        };
        return api;

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

        function findUserByNameAndPassword(username, password){

            var url = "/api/user?username="+username+"&password="+ password;
            return $http.get(url);
        }
    }
})();