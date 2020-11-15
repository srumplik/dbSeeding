var mongoose = require('mongoose');  // require the 'mongoose' plugin
var userModel = require('./models/user');  // require the 'user' model file
const initialUsers = [{username: 'admin', password: 'password'}, {username: 'agathye', password: 'PASSword1'}, {username: 'Testuser', password: 'password2'}];  // predefined users for seeding the database


const cleanDB = () => {
	console.log('cleaning database');
	userModel.User.deleteMany({}).then(function(){
		console.log('DB initialized');
	}).catch(function(error){
		console.log(error);
	});
};

const seedDB = () => {
	console.log('seeding database users');
	const initialNames = userModel.User;
	const doc = initialNames.create(initialUsers);
	console.log('database seeded');
};

exports.cleanDB = cleanDB;  //exports the 'cleanDB' function
exports.seedDB = seedDB;  // exports the 'seedDB' function
