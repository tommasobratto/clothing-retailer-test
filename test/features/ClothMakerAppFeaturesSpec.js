describe('ClothMaker app', function() {
  
  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('should be able to display the name of a product', function() {
    var productName = element(by.className('product-name')).getText();
    expect(productName).toEqual('Almond Toe Court Shoes, Patent Black');
  });

  describe('cart buttons', function() {
    var addToCartButton;
    var productOutOfStock;
    var discountButton;
    var notEligibleMessage;

    beforeEach(function() {
      addToCartButton = element(by.className('add-to-cart'));
      productOutOfStock = element(by.className('out-of-stock'));
    });

    it('should be able to display an "Add to Cart" button', function() {
      expect(addToCartButton.isPresent()).toEqual(true);
    });

    it('should be able to show if an item is out of stock', function() {
      expect(productOutOfStock.isPresent()).toEqual(true);
    });

    beforeEach(function() { 
      discountButton = element(by.id('off-order-discount'));
    });

    it('should be able to show a discount button', function() {
      expect(discountButton.isPresent()).toEqual(true);
    });

    it('should be able to show a message if the discount is not applicable', function() {
      discountButton = element(by.id('off-order-discount'));
      notEligibleMessage = element(by.id('not-eligible'));

      discountButton.click();
      expect(notEligibleMessage.isPresent()).toEqual(true);
    });
  }); 
});
