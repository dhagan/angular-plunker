// main.js
var app = angular.module('myApp', [/*'ui.grid', 'ui.grid.edit'*/ 'ngGrid', 'ui.bootstrap']);

var ctrl = app.controller('MyCtrl', function ($scope, $modal) {
    $scope.myData = [
        {name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}
    ];

    //var cellTemplate = '<div class="ngCellText"  data-ng-model="row"><button data-ng-click="updateSelectedRow(row,$event)">Edit</button></div>';
    $scope.cellTemplate = '<div class="grid-action-cell"><a ng-click="updateSelectedRow(row, $event);" href="#">{{row.entity.name}}</a></div>'

    $scope.debugRow = function (row, $event) {
        $event.stopPropagation();
        console.log(row);
        console.log($event);

    };

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
                displayName: 'Tag Input',
                cellTemplate: $scope.cellTemplate
            }
        ]
    };
    $scope.updateSelectedRow = function (row, $event) {
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
        });

    };
    $scope.save = function () {
        console.log($modal);
        $modal.dismiss('cancel');
    }

});
var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

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