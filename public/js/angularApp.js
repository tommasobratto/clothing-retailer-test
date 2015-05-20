var app = angular.module('ClothMaker', []);

app.controller('shopController', function($scope, $http) {
  $scope.catalogue = [];
  $scope.cart = [];

  $scope.callAPI = function() {
    var APIRequest = $http.get('http://localhost:3000/api');

    APIRequest.then(function(response) {
      $scope.catalogue = response.data;
    });
  };

  $scope.addToCart = function(product) {
    if(product.quantity > 0) {
      if($.inArray(product, $scope.cart) === -1)   {
        $scope.cart.push(product);
      } 
      
      $scope.checkStock(product);
      // need to add a jQuery function to show a 'item added to cart',
      // to write a test for it happening in the browser and a unit test.
    } else {
      // need to make a span appear when item is out of stock
      console.log('Item out of stock');
    }
  }

  $scope.checkStock = function(product) {
    var productIndex = $scope.catalogue.indexOf(product);

    // BUG: whenever you remove the product from the cart,
    // it doesn't actually return the original quantity of it
    if($.inArray(product, $scope.cart) == -1) {
      $scope.catalogue[productIndex].quantity += 1;
    } else {
      $scope.catalogue[productIndex].quantity -= 1;
    }
    // probably need to find a way send a modified JSON back 
    // to the server for 'persistence'
  }

  $scope.removeFromCart = function(product) {
    var productIndex = $scope.cart.indexOf(product);
    $scope.cart.splice(productIndex, 1);

    $scope.checkStock(product);
  } 

  $(document).ready(function() {
    $scope.callAPI();
  });
});
