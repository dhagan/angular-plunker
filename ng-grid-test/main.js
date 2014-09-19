// main.js
var app = angular.module('myApp', ['ngGrid']);
app.controller('MyCtrl', function($scope, $location, $window) {
    $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = {  data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        // headerRowHeight: 50, // header wrap - this isn't working
        columnDefs: [
            {
                field: 'name',
                displayName: 'NDC',
                enableCellEdit: true,
                width: '80px'
            }, {
                field: 'age',
                displayName: 'Name/Description',
                enableCellEdit: true,
                width: '120px'
            }
    ]};
    
    $scope.goTo = function () {
        console.log('helpe me');
        $location.path('/help');
        //$window.location.href="http://www.google.com";
    };
});