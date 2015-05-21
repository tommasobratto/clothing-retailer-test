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
      // var removeFromCartButton;
    var productQuantity;

    beforeEach(function() {
      addToCartButton = element(by.className('add-to-cart'));
      // removeFromCartButton = element(by.className('remove-from-cart'));
      productQuantity = element(by.className('out-of-stock'));
    });

    it('should be able to display an "Add to Cart" button', function() {
      expect(addToCartButton.isPresent()).toEqual(true);
    });

    // Have to find a way to target ngCart-cart stuff.
    // it('should be able to add an item to the cart', function() {
    //   addToCartButton.click();
    //    expect.().toEqual();
    // });

    // it('should be able to remove an item from the cart', function() {
    //   addToCartButton.click();
    //   removeFromCartButton.click();

    //   expect(removeFromCartButton.isPresent()).toEqual(false);
    // });

    it('should be able to show if an item is out of stock', function() {
      expect(productQuantity.isPresent()).toEqual(true);
    });
  });
});
