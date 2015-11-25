'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookmarker')


// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/index'));
app.use('/tag', require('./routes/tag'));
app.use('/link', require('./routes/link'));

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
