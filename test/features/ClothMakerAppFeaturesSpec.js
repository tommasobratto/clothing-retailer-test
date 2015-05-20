describe('ClothMaker app', function() {
  
  // NOTE: the quantity feature doesn't have tests 
  // nor a properly written way of storing selected quantity.

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('should be able to display the name of a product', function() {
    var productName = element(by.className('product-name')).getText();
    expect(productName).toEqual('Almond Toe Court Shoes, Patent Black');
  });

  describe('cart buttons', function() {
    var addToCartButton;
    var removeFromCartButton;

    beforeEach(function() {
      addToCartButton = element(by.className('add-to-cart'));
      removeFromCartButton = element(by.className('remove-from-cart'));
    });

    it('should be able to display an "Add to Cart" button', function() {
      expect(addToCartButton.isPresent()).toEqual(true);
    });

    it('should be able to add an item to the cart', function() {
      addToCartButton.click();

      expect(removeFromCartButton.isPresent()).toEqual(true);
    });

    it('should be able to remove an item from the cart', function() {
      addToCartButton.click();
      removeFromCartButton.click();

      expect(removeFromCartButton.isPresent()).toEqual(false);
    });
  });
});
