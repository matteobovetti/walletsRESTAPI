var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/walletsdb');

var movSchema = mongoose.Schema({
	    date: Date,
	    description: String,
	    amount: Number
});

/* GET home page. */
router.get('/', function(req, res, next) {

	var Movements = mongoose.model('movements', movSchema);

	var mov = new Movements({ date: new Date(), description: "Hi, my fist movement.", amount: 100.2 });
	mov.save(function (err, mov) {
	  if (err) return console.error(err);
	  // Ok.
	  console.log(mov);
	});

	res.render('index', { title: 'Express' });
});

module.exports = router;
