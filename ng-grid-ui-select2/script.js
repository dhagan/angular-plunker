// Code goes here

var app = angular.module('myApp',
    [ 'ngGrid',
        'ui.bootstrap',
        //'angular-selectize' 'theaquaNg',
        'ui.select2'
    ]);


// Specific directive that has the same effect on a ui-select2 element than the ng-input directive used on an input element
// This if for use as the ui-select2 dropdown as the editableCellTemplate in ng-grid
///////////////////////////////////////////////////////////////////////////////////
app.directive(
    'uiSelect2EditableCellTemplate',
    [
        function () {
            return {
                restrict: "A",
                link: function (scope, elm, attrs) {
                    //make sure the id is set, so we can focus the ui-select2 by ID later on (because its ID will be generated from our id if we have one)
                    elm.attr("id", "input-" + scope.col.index + "-" + scope.row.rowIndex);

                    elm.on('click', function (evt) {
                        evt.stopPropagation();
                    });

                    elm.on('mousedown', function (evt) {
                        evt.stopPropagation();
                    });

                    //select2 has its own blur event !
                    elm.on('select2-blur',
                        function (event) {
                            scope.$emit('ngGridEventEndCellEdit');
                        }
                    );

                    scope.$on('ngGridEventStartCellEdit', function () {
                        //Event is fired BEFORE the new elements are part of the DOM, so try to set the focus after a timeout
                        setTimeout(function () {
                            $("#s2id_" + elm[0].id).select2('open');
                        }, 10);
                    });


                }
            };
        }
    ]
);


var myCtrlFunction =
    function ($scope, $http) {

        $scope.data = "";

        $scope.colDefs = [];
        $scope.fkvalues = {};

        $scope.griddata =
            [
                { id: 1, population: 40, country: 1 },
                { id: 2, population: 20, country: 2 },
                { id: 3, population: 15, country: 3 },
            ];

        $scope.fkvalues_country = { 1: "Brazil", 2: "Spain", 3: "Italy", 4: "Argentina", 5: "Mexico", 6: "Peru" };

        $scope.cellTemplateDropdownSimple =
            '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" class="ng-pristine ng-valid colt3" style="width: 90%" >' +
            '<option ng-repeat="(fkid, fkrow) in fkvalues_country" value="{{fkid}}" ng-selected="COL_FIELD == fkid" >{{fkrow}} ({{fkid}})</option>' +
            '</select>'
        ;

        //try to make the dropdown an ng-semect dropdown
        $scope.cellTemplateDropdownUiSelect2 =
            '<select ui-select2 ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" class="ng-pristine ng-valid colt3" style="width: 90%" >' +
            '<option ng-repeat="(fkid, fkrow) in fkvalues_country" value="{{fkid}}" ng-selected="COL_FIELD == fkid" >{{fkrow}} ({{fkid}})</option>' +
            '</select>'
        ;


        //Make sure the ngGridEventEndCellEdit event gets fired when the dropdown loses focus
        //I created an ui-select2-editable-cell-template directive that will
        // add everythng needed to talk to ng-grid !!!
        /////////////////////////////////////////////////////////////////////////////////////
        $scope.cellTemplateDropdownUiSelect3 =
            '<select ui-select2-editable-cell-template ui-select2 ng-model="COL_FIELD" style="width: 90%" >' +
            '<option ng-repeat="(fkid, fkrow) in fkvalues_country" value="{{fkid}}" ng-selected="COL_FIELD == fkid" >{{fkrow}} ({{fkid}})</option>' +
            '</select>'
        ;

        $scope.gridOptions1 = {
            data: 'griddata',
            enableColumnResize: true,
            enableColumnReordering: true,
            enableSorting: true,
            //showFilter: true,
            //showGroupPanel: true,
            multiSelect: false,
            //enableCellEdit: true,
            selectedItems: [],
            columnDefs: //'colDefs1',
                [
                    { field: 'id' }, //, displayName: 'id'
                    { field: 'population', cellTemplate: '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" class="ng-pristine ng-valid colt3" style="width: 90%" type="number" ></input>' }, //, displayName: 'id'
                    { field: 'country', cellFilter: 'translateForeignKey: fkvalues_country',
                        cellTemplate: $scope.cellTemplateDropdownSimple
                    }
                ],
        };

        $scope.gridOptions2 = {
            data: 'griddata',
            enableColumnResize: true,
            enableColumnReordering: true,
            enableSorting: true,
            //showFilter: true,
            //showGroupPanel: true,
            multiSelect: false,
            //enableCellEdit: true,
            columnDefs: //'colDefs2',
                [
                    { field: 'id' }, //, displayName: 'id'
                    { field: 'population', cellTemplate: '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" class="ng-pristine ng-valid colt3" style="width: 90%" type="number" ></input>' }, //, displayName: 'id'
                    { field: 'country', cellFilter: 'translateForeignKey: fkvalues_country',
                        cellTemplate: $scope.cellTemplateDropdownUiSelect2
                    }
                ],
            selectedItems: [],
        };

        $scope.gridOptions3 = {
            data: 'griddata',
            enableColumnResize: true,
            enableColumnReordering: true,
            enableSorting: true,
            enableCellEditOnFocus: true,
            //showFilter: true,
            //showGroupPanel: true,
            multiSelect: false,
            //enableCellEdit: true,
            columnDefs: //'colDefs2',
                [
                    { field: 'id' }, //, displayName: 'id'
                    { field: 'population', cellEditableTemplate: '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" class="ng-pristine ng-valid colt3" style="width: 90%" type="number" ></input>' }, //, displayName: 'id'
                    { field: 'country', cellFilter: 'translateForeignKey:fkvalues_country',
                        editableCellTemplate: $scope.cellTemplateDropdownUiSelect2
                    }
                ],
            selectedItems: [],
        };


        $scope.gridOptions4 = {
            data: 'griddata',
            enableColumnResize: true,
            enableColumnReordering: true,
            enableSorting: true,
            enableCellEditOnFocus: true,
            //showFilter: true,
            //showGroupPanel: true,
            multiSelect: false,
            //enableCellEdit: true,
            columnDefs: [
                { field: 'id' }, //, displayName: 'id'
                { field: 'population', cellEditableTemplate: '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" class="ng-pristine ng-valid colt3" style="width: 90%" type="number" ></input>' }, //, displayName: 'id'
                { field: 'country', cellFilter: 'translateForeignKey: fkvalues_country',
                    editableCellTemplate: $scope.cellTemplateDropdownUiSelect3
                }
            ],
            selectedItems: [],
        };

    }

app.controller('myCtrl', myCtrlFunction); //[ '$scope', '$http', myCtrlFunction ]
app.filter(
    'translateForeignKey',
    function () {
        return    function (fk, fkValues) {
            return fkValues[ fk ] + " [" + fk + "]";
        }
            ;
    }
);





