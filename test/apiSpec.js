var should = require('chai').should();
var request = require('supertest');
var app = require('express')();
var catalogue = require('../storage/products.json')

describe('API server', function() {

  app.get('/api', function(req, res) {
    res.status(200).json(catalogue);
  });

  it('should respond with a JSON file catalogue on a GET request', function(done) {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done)
  });
});
