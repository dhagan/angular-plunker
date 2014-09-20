var app = angular.module('app', ['ui.grid']);

app.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.swapData = function() {
    if ($scope.gridOpts.data === data1) {
      $scope.gridOpts.data = data2;
    }
    else {
      $scope.gridOpts.data = data1;
    }
  };

  $scope.addData = function() {
    var n = $scope.gridOpts.data.length + 1;
    $scope.gridOpts.data.push({
                "firstName": "New " + n,
                "lastName": "Person " + n,
                "company": "abc",
                "employed": true
              });
  };

  $scope.removeFirstRow = function() {
    //if($scope.gridOpts.data.length > 0){
       $scope.gridOpts.data.splice(0,1);
    //}
  };

  $scope.reset = function () {
    data1 = angular.copy(origdata1);
    data2 = angular.copy(origdata2);

    $scope.gridOpts.data = data1;
  }

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

  $scope.gridOpts = {
    data: data1
  };
}]);
