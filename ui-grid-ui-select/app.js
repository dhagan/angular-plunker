var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.select', 'ngSanitize']);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.swapData = function () {
        if ($scope.gridOpts.data === data1) {
            $scope.gridOpts.data = data2;
        }
        else {
            $scope.gridOpts.data = data1;
        }
    };

    $scope.addData = function () {
        var n = $scope.gridOpts.data.length + 1;
        $scope.gridOpts.data.push({
            "firstName": "New " + n,
            "lastName": "Person " + n,
            "company": "abc",
            "employed": true
        });
    };

    $scope.removeFirstRow = function () {
        //if($scope.gridOpts.data.length > 0){
        $scope.gridOpts.data.splice(0, 1);
        //}
    };

    $scope.reset = function () {
        data1 = angular.copy(origdata1);
        data2 = angular.copy(origdata2);

        $scope.gridOpts.data = data1;
    };

    var data1 = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        },
        {
            "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "employed": false
        },
        {
            "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "employed": false
        },
        {
            "firstName": "Misty",
            "lastName": "Oneill",
            "company": "Letpro",
            "employed": false
        }
    ];

    var origdata1 = angular.copy(data1);

    var data2 = [
        {
            "firstName": "Waters",
            "lastName": "Shepherd",
            "company": "Kongene",
            "employed": true
        },
        {
            "firstName": "Hopper",
            "lastName": "Zamora",
            "company": "Acium",
            "employed": true
        },
        {
            "firstName": "Marcy",
            "lastName": "Mclean",
            "company": "Zomboid",
            "employed": true
        },
        {
            "firstName": "Tania",
            "lastName": "Cruz",
            "company": "Marqet",
            "employed": true
        },
        {
            "firstName": "Kramer",
            "lastName": "Cline",
            "company": "Parleynet",
            "employed": false
        },
        {
            "firstName": "Bond",
            "lastName": "Pickett",
            "company": "Brainquil",
            "employed": false
        }
    ];

    var origdata2 = angular.copy(data2);

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

    //$scope.cellTemplate = '<div class="grid-action-cell"><a ng-click="getExternalScopes().updateSelectedRow(row, $event);" href="#">{{row.entity.name}}</a></div>';
    $scope.cellTemplate = '<ui-select multiple ng-model="multipleDemo.colors" theme="bootstrap" ng-disabled="disabled" style="width: 300px;"> ' +
        ' <ui-select-match placeholder="Select colors...">{{$item}}</ui-select-match>' +
        ' <ui-select-choices repeat="color in availableColors | filter:$select.search"> {{color}} </ui-select-choices>' +
        '</ui-select>';


    $scope.gridOpts = {
        data: data1,
        columnDefs: [
            {
                field: 'firstName',
                displayName: 'Name',
                enableCellEdit: true,
                type: 'object'
            },
            {
                field: 'lastName',
                displayName: 'Name',
                enableCellEdit: true
            } ,
            {
                field: 'company',
                displayName: 'COO',
                enableCellEdit: true,
                cellTemplate: $scope.cellTemplate
            },
            {
                name: 'employed', // DJH some sort of hack for ui-grid 3.0
                field: '',
                displayName: 'Employed'

            }
        ]
    };
}]);


app.controller('DemoCtrl', function ($scope, $http, $timeout) {
    $scope.disabled = undefined;
    $scope.searchEnabled = undefined;

    $scope.enable = function () {
        $scope.disabled = false;
    };

    $scope.disable = function () {
        $scope.disabled = true;
    };

    $scope.enableSearch = function () {
        $scope.searchEnabled = true;
    };

    $scope.disableSearch = function () {
        $scope.searchEnabled = false;
    };

    $scope.clear = function () {
        $scope.person.selected = undefined;
        $scope.address.selected = undefined;
        $scope.country.selected = undefined;
    };

    $scope.someGroupFn = function (item) {

        if (item.name[0] >= 'A' && item.name[0] <= 'M')
            return 'From A - M';

        if (item.name[0] >= 'N' && item.name[0] <= 'Z')
            return 'From N - Z';

    };

    $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];
    $scope.multipleDemo = {};
    $scope.multipleDemo.colors = ['Blue', 'Red'];

});
