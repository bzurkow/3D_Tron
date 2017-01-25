var sitePath = process.argv[2] || ".";
var port = 8080;

var express = require('express');
var app = express();
var path = require('path');

app.use(function(req, res, next){
  console.log(req.url);
  next();
});


console.log(sitePath);
console.log("Starting server in: " +__dirname + "/" + sitePath);

app.use(express.static(__dirname+ '/' +sitePath));

app.listen(port, function(){
  console.log("Server is listening and running on Port "+port);
});
