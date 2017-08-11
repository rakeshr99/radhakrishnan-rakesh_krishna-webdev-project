(function (){
    angular.module("wbdvDirectives",[])
            .directive('wbdvSortable',wbdvSortable );

    function wbdvSortable($routeParams){

        function linkFunction(scope, element, attributes){
            var initial = -1;
            var final = -1;
            $(element)
                .sortable({
                    start:function(event, ui){
                        initial = $(ui.item).index();
                    },
                    stop: function(event, ui){
                        final = $(ui.item).index();
                        scope.sortableController.sort(initial, final);
                    }
            });
        }
        return{
            scope: {},
            link:linkFunction,
            controller : sortableController,
            controllerAs :"sortableController"
        }
    }

    function sortableController(widgetService, $routeParams){
        var vm = this;
        vm.sort = sort;
        sortableController.pageId = $routeParams.pageId;

        function sort(initial, final){
            widgetService.sort(sortableController.pageId,initial, final);
        }
    }

})();

