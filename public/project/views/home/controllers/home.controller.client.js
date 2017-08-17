(function (){
    angular
        .module("WamApp")
        .controller("homeController", homeController);


    function homeController(restaurantService, $location, loggedUser, userService){
        var model =this;

            model.searchRestaurantByTitle = searchRestaurantByTitle;
            model.customerProfileButton = customerProfileButton;
            model.ownerProfileButton = ownerProfileButton;
            model.logout = logout;
            model.isAdmin = isAdmin;

        function init(){
            var urlParams = $location.search();
            model.search = urlParams.searchInput;

        }init();

        function customerProfileButton(){
            if(loggedUser.roles[0] == "CUSTOMER"){
                return true;
            }else{
                return false;
            }
        }

        function ownerProfileButton(){
            if(loggedUser.roles[0] == "OWNER"){
                return true;
            }else{
                return false;
            }
        }

        function isAdmin(){
            if(loggedUser.roles.indexOf('ADMIN') > -1){
                return true;
            }else{
                return false;
            }
        }

        function searchRestaurantByTitle(restaurantId){
            //alert(title);
/*            restaurantService
                .searchRestaurantByTitle(title)
                .then(function (response){
                    model.restaurants = response.jsonBody.businesses;
                })*/
            //$location.url("/list-restaurant/"+restaurantId);
            $location.path("/list-restaurant/"+restaurantId).search({searchInput: restaurantId});

        }

        function logout(){
            userService
                .logout()
                .then(function (){
                    $location.url('/login')
                })
        }


    }
})();