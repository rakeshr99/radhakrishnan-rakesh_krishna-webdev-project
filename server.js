var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
var cors = require('cors');
app.use(cors());
app.options('*', cors());

//require("./test/app");
require("./project/app");

var port = process.env.PORT || 3000;
app.listen(port);