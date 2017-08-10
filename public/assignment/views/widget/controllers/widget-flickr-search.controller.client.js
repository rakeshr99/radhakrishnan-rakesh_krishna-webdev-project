(function () {
    angular
        .module("WamApp")
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController(flickrService,$routeParams,widgetService,$location ) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            model.userId=$routeParams.userId;
            model.websiteId=$routeParams.wid;
            model.pageId = $routeParams.pageId;
            model.widgetId = $routeParams.widgetId;
        }
        init();

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService.getWidgetTypeById(model.userId, model.websiteId, model.pageId, model.widgetId)
                .then(function (widget){
                    widget.url = url;

                    widgetService
                        .updateWidget(model.userId, model.websiteId, model.pageId,model.widgetId,widget)
                        .then(function(widgets){
                            model.widgets = widgets;
                            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+widget._id);
                        });
                });
        }


        function searchPhotos(searchText){
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }

    }
})();