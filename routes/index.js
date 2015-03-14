var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('underscore');
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
});

router.get('/movements', function(req, res, next) {
	var Movements = mongoose.model('movements', movSchema);
    
    var fromdt = moment([req.query.y, req.query.m - 1, 1]);
    var todt = moment(fromdt.toDate()).add(1, 'months');
    
    var query = Movements.find()
    .where('date')
        .gte(fromdt.toDate())
        .lt(todt.toDate())
    .sort('-date')
    .exec(function (err, results) {
      if (err) return handleError(err);
        // Ok.
		res.status(200).json(results);
    });
});

router.get('/statistics', function(req, res, next) {
	var Movements = mongoose.model('movements', movSchema);
    
    var fromdt = moment([req.query.y, req.query.m - 1, 1]);
    var todt = moment(fromdt.toDate()).add(1, 'months');
    
	var statistics = {
		total_cost : 0,
		total_income : 0,
		percentage_cost_income : 0,
		difference_cost_income : 0,
		total_yearly_cost : 0,
		total_yearly_income : 0
	};
	
    var query = Movements.find()
    .where('date')
        .gte(fromdt.toDate())
        .lt(todt.toDate())
    .exec(function (err, results) {
      if (err) return handleError(err);
        // Ok.
		_.each(results, function(value, key, results){
			
			if (value.frequencytype === 'f') {
				if (value.amount > 0)
					statistics.total_yearly_income += value.amount;
				else
					statistics.total_yearly_cost += (-1)*value.amount;
			}
			else {
				if (value.amount > 0)
					statistics.total_income += value.amount;
				else
					statistics.total_cost += (-1)*value.amount;
			}
				
		});
		
		statistics.percentage_cost_income = 0;
		if (statistics.total_income > 0)
			statistics.percentage_cost_income = (statistics.total_cost / statistics.total_income) * 100;

		statistics.difference_cost_income = statistics.total_income - statistics.total_cost;
		
		// Ok.
		res.status(200).json(statistics);
		
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

});

router.delete('/deleteMovement/:id', function(req, res) {
	var Movements = mongoose.model('movements', movSchema);
    
    Movements.findByIdAndRemove(req.params.id, function (err, mov) {
      if (err) return handleError(err);
      res.status(200).json(mov);
    });
    
});

module.exports = router;
