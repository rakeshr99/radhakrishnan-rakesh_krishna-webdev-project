(function() {
    angular
        .module("WamApp")
        .service("flickrService", flickrService);

    function flickrService($http) {
        this.searchPhotos =searchPhotos;

        var key = "18119d0aa30f353cfcc1365b2f7afc1f";
        var secret = "26c7019b394afecb";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();