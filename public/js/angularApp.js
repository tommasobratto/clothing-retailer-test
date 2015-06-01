var app = angular.module('ClothMaker', ['ngCart']);

/* The ngCart object contains information about the cart contents and methods
 * to retrieve them */
app.controller('shopController', function($scope, $http, ngCart, ngCartItem) {
  $scope.catalogue = [];
  $scope.discount;
  $scope.notEligible;

  $scope.callAPI = function() {
    var APIRequest = $http.get('http://localhost:3000/api');

    APIRequest.then(function(response) {
      $scope.catalogue = response.data;
      console.log($scope.catalogue);
      console.log("catalogue fetched from API");
    });
  };

  $scope.checkCatalogue = function(check) {
    $scope.catalogue.forEach(function(product) {
      check(product);
    });
  }
  
  $scope.isOutOfStock = function(product) {
    if(product.quantity === 0) {
      return true;
    } else {
      return false;
    }
  }

  $scope.isDiscounted = function(product) {
    if(product.discounted_price) {
      product.price = product.discounted_price;

      return true;
    } else {
      return false;
    }
  }

  $scope.setCategory = function(productId, productCategory) {    
    var item = ngCart.getItemById(productId.toString());
    
    if(item) {
      item.setData(productCategory);
    }
  }

  $scope.setDiscount = function(num) {
    $scope.discount = num;
    ngCart.setDiscount($scope.discount);
  }

  $scope.isEligible = function($event) {
    var discountType = $event.target.id;
    var totalPrice = ngCart.getSubTotal();
    var cartItems = ngCart.getItems();
    $scope.notEligible = false;

    if(discountType === 'off-order-discount') {
      $scope.applyOffOrderDiscount(cartItems);
    } else if(discountType === '10£-discount') {
      $scope.apply10Discount(totalPrice);
    } else if(discountType === '15£-discount') {
      $scope.apply15Discount(cartItems, totalPrice);
    } 
  }

  $scope.applyOffOrderDiscount = function(cartItems) {
    if(cartItems.length > 0) {
      $scope.setDiscount(-5);
    } else {
      $scope.notEligible = true;
    }
  }

  $scope.apply10Discount = function(totalPrice) {
    if(totalPrice > 50) {
      $scope.setDiscount(-10);
    } else {
      $scope.notEligible = true;
    }
  }

  $scope.apply15Discount = function(cartItems, totalPrice) {
    if($scope.hasFootwear(cartItems) && totalPrice > 75) {
      $scope.setDiscount(-15);
    } else {
      $scope.notEligible = true;
    }
  }

  $scope.hasFootwear = function(cartItems) {
    var category;
    var footwearNum = 0;

    cartItems.forEach(function(item) {
      category = item.getData();
      if(category.includes('Footwear')) {
        footwearNum += 1;
      }
    });

    if(footwearNum > 0) {
      return true;
    }
  }

  $scope.$on('ngCart:change', function() {
    $scope.setDiscount(0);
  });

  $(document).ready(function() {
    $scope.callAPI();
    $scope.checkCatalogue($scope.isOutOfStock);
    $scope.checkCatalogue($scope.isDiscounted);
  });
});
