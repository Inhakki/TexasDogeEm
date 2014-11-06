var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET userlist page. */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e,docs){
		res.render('userlist', {
			"userlist": docs
		});
	});
});

/* Get New User Page. */
router.get('/newuser', function(req, res) {
	res.render('newuser', {title: 'Add New User'});
});

router.post('/adduser', function(req,res){

	//set intenral DB variable
	var db = req.db;

	//get form values
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//set collection
	var collection = db.get('usercollection');

	collection.insert({
		"username": userName,
		"email" : userEmail
	}, function(err, doc){
		if (err) {
			//If it failed, return error
			res.send("There was a problem adding information to the database.");
		} else {
			// If it worked, set the header to the address bar doesn't still say
			res.location("userlist");
			//and forward to successpage
			res.redirect("userlist");
		}
	});
});

module.exports = router;