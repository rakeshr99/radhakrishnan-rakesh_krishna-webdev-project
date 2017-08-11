(function() {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($sce, $http) {
/*        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Three years late and costing $12.9 billion, the USS Gerald R. Ford finally gets commissioned today at Norfolk Naval Station in Virginia. The latest aircraft carrier to join the American fleet has been burdened with—and this may shock you, considering we are talking about defense spending—cost overruns and significant…</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];*/

        this.getWidgetTypeById = getWidgetTypeById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.getWidgetIdByWidgetType = getWidgetIdByWidgetType;
        this.createWidget = createWidget;
        this.getWidgetByWidgetId = getWidgetByWidgetId;
        this.trust = trust;
        this.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        this.widgetUrl = widgetUrl;
        this.sort =sort;

        function sort(pageId, initial, final){
            var url = "/api/directives/widgets?initial="+initial+"&final="+final+"&pageId="+pageId;
            $http.put(url);
        }
        function widgetUrl(widget){
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.v1.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl){
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length-1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html){
            return $sce.trustAsHtml(html);
        }

        function getWidgetByWidgetId(widgetId){
            return widgets;
        }

        function createWidget(userId, websiteId, pageId, widgetType, widget){
            widget.widgetType = widgetType;

            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response){
                    return response.data;
                })
        }


        function getWidgetIdByWidgetType(widgetType){
            //var counter=0;
            for(var w in widgets){
                if(widgets[w].widgetType === widgetType){
                    return widgets[w]._id;
                }
            }
        }

        function findWidgetsByPageId(userId, websiteId, pageId) {

            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function deleteWidget(userId, websiteId, pageId, widgetId){
            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
        }

        function updateWidget(userId, websiteId, pageId, widgetId, widget){

            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

            return $http.put(url, widget)
                .then(function (response){
                    return response.data;
                });
        }

        function getWidgetTypeById(userId, websiteId, pageId, widgetId){

            var url = "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            return $http.get(url)
                .then( function (response){
                    return response.data;
                });
        }
    }
})();