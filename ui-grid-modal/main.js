// main.js
var app = angular.module('myApp', ['ui.grid', 'ui.grid.edit', 'ngTagsInput', 'ui.bootstrap']);

var ctrl = app.controller('MyCtrl', function ($scope, $modal) {
    $scope.myData = [
        {name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}
    ];


    // per http://ui-grid.info/docs/#/tutorial/305_externalScopes, UI-Grid uses isolate scope,
    // so there is no access to your application scope variables from a row or cell template.
    $scope.myViewModel = {
        someProp: 'abc',
        showMe: function () {
            alert(this.someProp);
        },
        debugRow: function (row, $event) {
            $event.stopPropagation();
            console.log(row);
            console.log($event);
        },
        updateSelectedRow: function (row, $event) {
            //$event.stopPropagation();
            console.log($event);
            console.log(row);
            $scope.myrow = row.entity;
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        return row.entity;
                    }
                }
            })
        }
    };

    $scope.cellTemplate = '<div class="grid-action-cell"><a ng-click="getExternalScopes().updateSelectedRow(row, $event);" href="#">{{row.entity.name}}</a></div>';

    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableCellEdit: true,
        enableRowSelection: false,
        columnDefs: [
            {
                field: 'name',
                displayName: 'Name',
                enableCellEdit: true
            },
            {
                name: 'xyz', // DJH some sort of hack for ui-grid 3.0
                field: '',
                displayName: 'COO',
                cellTemplate: $scope.cellTemplate
            }
        ]
    };

    // DJH what is this for?
    $scope.save = function () {
        console.log($modal);
        $modal.dismiss('cancel');
    };

    $scope.products = [
        {product: "pMkkoroni", age: 50},
        {product: "pTiancum", age: 43},
        {product: "pJacob", age: 27},
        {product: "pNephi", age: 29},
        {product: "pEnos", age: 34}
    ];

    $scope.loadTags = function () {
        var deferred = $q.defer();
        deferred.resolve($scope.products);
        return deferred.promise;
    }

});

var ModalInstanceCtrl = function ($scope, $modalInstance, $q, items) {

    $scope.products = [
        {text: "United States"},
        {text: "Hawaii"},
        {text: "South Africa"},
        {text: "England"},
        {text: "Greece"}
    ];


    $scope.loadTags = function () {
        var deferred = $q.defer();
        deferred.resolve($scope.products);
        return deferred.promise;
    };

    $scope.items = items;
    var name = items.name;
    var age = items.age;


    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        items.name = name;
        items.age = age;
        $modalInstance.dismiss('cancel');
    };
};