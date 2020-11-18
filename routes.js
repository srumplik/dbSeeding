var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// APPLICATION LANDING PAGE
router.get('/', function(req,res){ // Server responds to HTTP GET request @ '/' URI with a callback function which takes in two perameters 'req' (request) & 'res' (response).
	res.render('index');  // The response to the request
});


// lOGIC FOR LOGIN PAGE =============================================
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
				res.redirect('/user/all');
			}
			else {  //  return other errors
				res.send('Incorrect password');
			};
		});
	};
});


// ROUTES FOR USERS =======================================
router.get('/user/all', function ( req, res) {  // display ALL users
	mongoose.model('User').find({}, function(err,users){  // function to return all documents in the 'Users' collection
		res.render('./user/users', {  // renders the 'users.pug' file
			users: users  // sends the JSON data returned from the DB to the 'users.pug' file for rendering
		});
	});
});

router.get('/user/one/:id', function ( req, res ) {  //  display ONE user via its _id
	mongoose.model('User').findOne({'_id': req.params.id}, function(err,user){  // function to return one document in the 'Users' colleciton with the '_id' passed in through the URL request
		if(user == null)  // if the supplied '_id' is not in the 'Users' collection, return an 'error'
		{
			res.send('No user in database with that ID');  // sending the 'error'
		}else  // render the 'user.pug' file while passing the JSON data through
		{
			res.render('./user/user', {
				user: user.username,
				user_id: user._id,
				user_password: user.password
			});
		}
	});
});

router.get('/user/create', function ( req, res) {  // page with form for creating a new user
	res.render('./user/createUser');  // render the 'createUser.pug' file
});

router.post('/user/create', function ( req, res ) {  // add new user to DB
	mongoose.model('User').create({username: req.body.username, password: req.body.password}, function(err, result) {  // function to save a new user document to the 'Users' collection
		if (err){
			res.send(err);
		} else {
			res.redirect('/user/all');
		};
	});
});

router.post('/user/update/:id', function ( req, res ) {  // update user in DB via its _id
	mongoose.model('User').findOneAndUpdate({ '_id': req.params.id}, req.body, function(err, user){  // function to find a user document that matches the '_id' passed in and update the document values with the newly supplied values
		if(err){
			console.log(err);
		}else
		{
			console.log(user)
		};
	});
	res.redirect('/user/all');  // once completed, redirect to show all users and including the newly updated user
});

router.get('/user/delete/:id', function ( req, res ) {  // delete user from DB via its _id
	mongoose.model('User').deleteOne({ '_id': req.params.id}, function(err, result){ // functino to find user document based on '_id' and remove it from 'Users' collection
		if(err){
			res.status(500).send(err);
		}else
		{
			res.redirect('/user/all');  // redirect to show all users
		};
	});
});



// ROUTES FOR CLIENTS =======================================
router.get('/client/all', function( req, res ){
	res.send('List of all clients to come');
}),



// ROUTES FOR ASSETS =======================================
router.get('/asset/all', function( req, res ){
	res.send('List of all assets to come');
}),


module.exports = router
