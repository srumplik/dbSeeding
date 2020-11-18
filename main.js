
// Name:      CSIS483 Capstone Project - Asset Tracking
// Purpose:   Web Application for Asset Tracking
// Student:    Anthony Gathye

var express = require('express');  // Javascript web framework
var path = require('path');  // tool for getting local directory paths
var log = require('morgan')  // tool for logging & debugging HTTP request
var bodyParser = require('body-parser');  // middleware for parsing information going from front end to back end
var multer = require('multer');  // middleware for form data
var mongoose = require('mongoose');  // an interface to Mongo
var app = express();  // initialize the express framework to 'app' variable
var upload = multer();  // initialize the multer 'function' on the 'upload' variable
var port = process.env.PORT || 8080;  // uses system defined PORT variable or 8080 in none is defined

// Database functions
const connectDb = () => {
	return mongoose.connect('mongodb://localhost:27017/assetTracking', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
};  // Connect to 'assetTracking' database
const initializeDB = require('./db_seeding'); //
var userModel = require('./models/user');  // import models for DB collections


// Middleware
// Log HTTP request & responses
app.use(log('dev'));  // Use the logging tool in the 'dev' preset
// Use PUG template engine
app.set('views', './views');  // define the directory for page templates
app.set('view engine', 'pug');  //  define 'pug' as the templating engine
app.use(express.static(path.join(__dirname,'public')));  // define directory for static files
app.use(bodyParser.json());  // use body-parser middleware for json
app.use(bodyParser.urlencoded({extended: true}));  // use body-parser middleware for url encoded info
app.use(upload.array());  // use of 'multer' middleware


// ROUTES - HTTP requests handled here
app.use(require('./routes'))


// Initialize database and start application
connectDb().then(() => {  // remove all documents from all collections
	initializeDB.cleanDB();
});

connectDb().then(() => {  // add predefined documents to specific collections
	initializeDB.seedDB();
});

app.listen(port, () =>  // start the express application
	console.log('Server running at localhost:' + port)
);
