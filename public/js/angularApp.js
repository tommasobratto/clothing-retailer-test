var app = angular.module('ClothMaker', []);

app.controller('shopController', function($scope, $http) {
  $scope.cart = [];

  var APIRequest = $http.get('http://localhost:3000/api');

  APIRequest.then(function(response) {
    $scope.catalogue = response.data;
  });

  $scope.addToCart = function(product) {
    if(product.quantity > 0) {
      if($.inArray(product, $scope.cart) === -1)   {
        $scope.cart.push(product);
      } 
      
      $scope.checkStock(product);
      // need to add a jQuery function to show a 'item added to cart',
      // to write a test for it happening in the browser and a unit test.
    } else {
      console.log('Item out of stock');
    }
  }

  $scope.checkStock = function(product) {
    var productIndex = $scope.catalogue.indexOf(product);
    $scope.catalogue[productIndex].quantity -= 1;
  }

  $scope.removeFromCart = function(product) {
    var productIndex = $scope.cart.indexOf(product);
    $scope.cart.splice(productIndex, 1);
  } 
});
