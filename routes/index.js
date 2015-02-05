var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/walletsdb');

var movSchema = mongoose.Schema({
	    date: Date,
	    description: String,
	    amount: Number,
	    tags: String,
	    wallet: String,
	    PoU: Number,
	    frequencytype: String,
	    frequency: Number
})

/* GET home page. */
/*
router.get('/', function(req, res, next) {
	res.render('index');
});
*/

router.get('/movements', function(req, res, next) {
	var Movements = mongoose.model('movements', movSchema);
    
    var query = Movements.find().sort('-date').exec(function (err, results) {
      if (err) return handleError(err);
        // Ok.
		res.status(200).json(results);
    });
});

router.get('/movement/:id', function(req, res, next) {
	var Movements = mongoose.model('movements', movSchema);
    
    Movements.findById(req.params.id, function (err, mov) {
      if (err) return handleError(err);
        // Ok.
		res.status(200).json(mov);
    });
    
});

router.put('/updateMovement/:id', function (req, res) {
	var Movements = mongoose.model('movements', movSchema);
    
    Movements.findByIdAndUpdate(req.params.id, { $set: req.body}, function (err, mov) {
      if (err) return handleError(err);
      res.status(200).json(mov);
    });
});

router.post('/addMovement', function (req, res) {
	var Movements = mongoose.model('movements', movSchema);

	var mov = new Movements(req.body);
	mov.save(function (err, mov) {
	  if (err) return console.error(err);
	  	// Created.
		res.status(201).json(mov);
	});

})

module.exports = router;
