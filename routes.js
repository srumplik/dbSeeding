var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// APPLICATION LANDING PAGE
router.get('/', function(req,res){ // Server responds to HTTP GET request @ '/' URI with a callback function which takes in two perameters 'req' (request) & 'res' (response).
	res.render('index');  // The response to the request
});


// lOGIC FOR LOGIN PAGE
router.post('/login',function ( req, res ){
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
				res.redirect('/user/' + user._id);
			}
			else {  //  return other errors
				res.send('Incorrect password');
			};
		});
	};
});


// ROUTES FOR USERS
router.get('/users', function ( req, res) {
	mongoose.model('User').find({}, function(err,users){
		res.render('users', {
			users: users
		});
		console.log(typeof(users));
		console.log(users[0].username);
	});
});

router.get('/user/:id', function ( req, res ) {  //  logged in user page
	mongoose.model('User').findOne({'_id': req.params.id}, function(err,user){
		res.render('user', {
			user: user.username,
			user_id: user._id,
			user_password: user.password
		});
	});
});

router.post('/user', function ( req, res ) {

});

router.put('/user/:id', function ( req, res ) {

});

router.delete('/user/:id', function ( req, res ) {

});


module.exports = router
