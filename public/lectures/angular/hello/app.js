angular
    .module("TodoApp", [])
    .controller("TodoController", TodoController)
    .directive('wdDraggable', wdDraggable);

function wdDraggable(){

    function linkFunction(scope, element){
        $(element).sortable();
    }
    return{
        link:linkFunction
    }
}

function TodoController($scope) {
    $scope.hello = "Hello from TodoController";
}