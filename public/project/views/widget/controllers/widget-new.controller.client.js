(function () {
    angular
        .module("WamApp")
        .controller("newWidgetController", newWidgetController);

    function newWidgetController($routeParams, $location, widgetService){
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pageId;

        this.createWidget = createWidget;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function widgetUrl(widget){
            var url = widgetService.widgetUrl(widget);
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl){
            return widgetService.getYouTubeEmbedUrl(linkUrl);
        }

        function trust(html){
            return widgetService.trust(html);
        }

        function createWidget(widgetType){
            var widget ={};
            widget.pageId = model.pageId;
            //widget._id = (new Date()).getTime() + "";
            widgetService.createWidget(model.userId, model.websiteId, model.pageId, widgetType, widget)
                .then(function(widget){
                    //model.widgets = widgets;
                    model.widget = widget;
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+model.widget._id);
                });
        }

        function init(){
            widgetService.findWidgetsByPageId(model.userId, model.websiteId, model.pageId)
                .then(function(widgets){
                    model.widgets = widgets;
                })
        }init();
    }

})();