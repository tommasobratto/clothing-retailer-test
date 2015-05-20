var app = angular.module('ClothMaker', []);

app.controller('catalogueController', function($scope, $http) {
  var APIRequest = $http.get('http://localhost:3000/api');

  APIRequest.then(function(response) {
    $scope.catalogue = response.data;
  });
});
