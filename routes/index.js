var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/walletsdb');

var movSchema = mongoose.Schema({
	    date: Date,
	    description: String,
	    amount: Number,
	    tags: Array,
	    wallet: String,
	    PoU: Number,
	    frequencytype: String,
	    frequency: Number
});

/* GET home page. */
/*
router.get('/', function(req, res, next) {
	res.render('index');
});
*/

router.post('/addMovement', function (req, res) {

	var Movements = mongoose.model('movements', movSchema);

	var mov = new Movements(req.body);
	mov.save(function (err, mov) {
	  if (err) return console.error(err);
	  	// Ok.
		res.status(201).json(mov);
	});

})

module.exports = router;
