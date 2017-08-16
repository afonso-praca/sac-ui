var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('SAC App UI Server listening on port 3000!');
});