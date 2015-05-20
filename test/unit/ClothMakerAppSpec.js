describe('ClothMaker App', function() {
  beforeEach(module('ClothMaker'));

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

  it('should be able to add an item to the cart', function() {
    scope.catalogue.push(product);
    scope.addToCart(scope.catalogue[0]);
    expect(scope.cart[0]).toEqual(product);
  });

  describe('app calls API', function() {
    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend
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
});

