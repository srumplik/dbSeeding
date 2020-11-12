var mongoose = require('mongoose');
var user = require('./models/user');
const eraseDb = true;  // variable for initializing DB on app startup
const initialUsers = [{username: 'jDoe', password: '12345'}];


const cleanDB = async() => {
	console.log('cleaning database');
	mongoose.model('User').deleteMany({});
	console.log('DB cleaned');
};

const seedDB = () => {
	console.log('seeding database users');
	mongoose.model('User').insertOne({username:'admn', password: 'password'});
};

exports.cleanDB = cleanDB;
exports.seedDB = seedDB;
