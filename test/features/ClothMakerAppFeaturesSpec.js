describe('ClothMaker app', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('should be able to display the name of a product', function() {

    var productName = element(by.className('product-name')).getText();
    expect(productName).toEqual('Almond Toe Court Shoes, Patent Black');
  });

  it('should be able to display an "Add to Cart" button', function() {
    var addToCartButton = element(by.className('add-to-cart'));
    expect(addToCartButton.getText()).toEqual('Add to Cart');
  });
});
