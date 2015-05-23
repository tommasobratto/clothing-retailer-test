var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var catalogue = require('./products.json')["catalogue"];

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index.html')
});

app.get('/api', function(req, res) {
  res.status(200).json(catalogue);
});

app.post('/checkout', function(req, res) {
  // mock of a post request to the server with cart data;
  console.log(req.body.data);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port 3000');
});
