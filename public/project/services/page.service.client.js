(function() {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService($http) {
/*        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];*/


        this.findPageByWebsiteId = findPageByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function deletePage(userId, websiteId, pageId){
            var url = "/api/user/"+userId+ "/website/"+websiteId+"/page/"+pageId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                })
        }

        function updatePage(userId, websiteId,pageId, page){
            var url = "/api/user/"+userId+ "/website/"+websiteId+"/page/"+pageId;
            return $http.put(url, page)
                .then(function (response){
                    return response.data;
                });
        }

        function findPageById(userId, websiteId, pageId){

            var url = "/api/user/"+userId+ "/website/"+websiteId+"/page/"+pageId;
            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function createPage(websiteId, page, userId){

            var url = "/api/user/"+userId+ "/website/"+websiteId+"/page";
            return $http.post(url, page)
                .then (function (response){
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId, userId) {

            var url = "/api/user/"+userId+ "/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }
    }
})();