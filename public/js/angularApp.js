var app = angular.module('ClothMaker', ['ngCart']);

app.controller('shopController', function($scope, $http) {
  $scope.catalogue = [];
  $scope.cart = [];

  $scope.callAPI = function() {
    var APIRequest = $http.get('http://localhost:3000/api');

    APIRequest.then(function(response) {
      $scope.catalogue = response.data;
      $scope.checkCatalogue($scope.isOutOfStock);
      $scope.checkCatalogue($scope.isDiscounted);
    });
  };

  $scope.checkCatalogue = function(check) {
    $scope.catalogue.forEach(function(product) {
      check(product);
    });
  }

  $scope.isDiscounted = function(product) {
    if(product.discounted_price != undefined) {
      product.price = product.discounted_price;

      return true;
    } else {
      return false;
    }
  }

  $scope.isOutOfStock = function(product) {
    if(product.quantity === 0) {
      return true;
    } else {
      return false;
    }
  }

  $(document).ready(function() {
    $scope.callAPI();
  });
});
