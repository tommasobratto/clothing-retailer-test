var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var catalogue = require('./products.json')["catalogue"];

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.render('index.html')
});

app.get('/api', function(req, res) {
  res.status(200).json(catalogue);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port 3000');
});
