describe('ClothMaker App', function() {
  beforeEach(module('ClothMaker'), module('ngCart'));

  var ctrl;

  var product = {
    "name": "Almond Toe Court Shoes, Patent Black",
    "price": 99.00,
    "category": "Women's Footwear",
    "quantity": 5
  };

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('shopController', { $scope: scope });
  }));

  it('should initialise with an empty catalogue', function() {
    expect(scope.catalogue).toEqual([]);
  });

  describe('app calls API', function() {
    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      httpBackend
        .when("GET", "http://localhost:3000/api")
        .respond({
          catalogue: product
        }
      );
    }));

    it('should be able to get a product from the API', function() {
      scope.callAPI();
      httpBackend.flush();
      expect(scope.catalogue['catalogue']).toEqual(product);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  });

  // describe('checking for discounts', function() {
  //   var ngCart;
  //   var discountButton;
  //   var cart;
  //   var totalPrice;
  //   var $event;

  //   beforeEach(function() {
  //     cart = [];
  //     cart.push(product);

  //     // mock ngCart methods
  //     ngCart = {
  //       getItems: function() {
  //         return cart;
  //       },
  //       getSubTotal: function() {
  //         totalPrice = cart[0].price;

  //         return totalPrice;
  //       }
  //     }
  //   });

  //   it('should be able to check for and apply a discount for an order', function() {
  //     // need to find a way to mock $event
  //     scope.isEligible($event);
  //     console.log($event.target);
  //     expect(scope.discount).toEqual(-5);
  //   });

  //   it('should be able to apply a discount if the total price is greater than 50', function() {
  //     scope.isEligible(event);
  //     expect(scope.discount).toEqual(-10);
  //   });

  //   it('should apply a discount if the total price is greater than 75 and the item category is footwear', function() {
  //     scope.isEligible($event);
  //     expect(scope.discount).toEqual(-15);
  //   });
  // });
});

