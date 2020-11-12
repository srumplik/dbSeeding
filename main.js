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
	return mongoose.connect('mongodb://localhost:27017/assetTracking', {useNewUrlParser: true, useUnifiedTopology: true});
};  // Connect to 'assetTracking' database
const initializeDB = require('./db_seeding'); //
var User = require('./models/user');  // import models for DB collections

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
app.get('/', function(req,res){ // Server responds to HTTP GET request @ '/' URI with a callback function which takes in two perameters 'req' (request) & 'res' (response).
	res.render('index');  // The response to the request
});

app.post('/login',function (req, res){  //  logic for log in page
	if (req.body.username == '' || req.body.password == ''){  //  check to see that both boxes have values
		res.send('Please enter username and password');  // if either box is empty, return error message
	}
	else {  // if boxes are complete, check DB for username & password
		mongoose.model('User').findOne({'username':req.body.username},function(err,user){  //  function to search database
			if (err) return handleError (err)  // if error, return error
			else if (user == null) {  //  if username not in database, return error
				res.send('Username not in database');
			}
			else if (user.username == req.body.username && user.password == req.body.password){  //  if username and password are in database, redirect to page for user
				res.redirect('/user');
			}
			else {  //  return other errors
				res.send('Incorrect password');
			};
		});
	};
});

app.get('/user',function(req,res){  //  logged in user page
	res.render('user')
});


connectDb().then(async () => {
	initializeDB.cleanDB();
	initializeDB.seedDB();
	app.listen(port, () =>
		console.log('Server running at localhost:' + port)
	);
});
