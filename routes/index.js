var express = require('express');
// var mongoose = require('mongoose'); // Kill this dependency
// var moment = require('moment'); // Kill this dependency
// var _ = require('underscore'); // Kill this dependency
var router = express.Router();
// var movementsschema = require('./lib/movement-schema');
var movementsmanager = require('./lib/movements');

// mongoose.connect('mongodb://localhost:27017/walletsdb');

// var movSchema = mongoose.Schema(movementsschema);

router.get('/movements', function(req, res, next) {
    movementsmanager.getAll(req.query.y, req.query.m, function(err, results) {
        if (err) return handleError(err);
        // Ok.
        res.status(200).json(results);
    });
});

router.get('/statistics', function(req, res, next) {

    var Movements = mongoose.model('movements', movSchema);

    // date filter for mountly interval.
    var fromdt = moment([req.query.y, req.query.m - 1, 1]);
    var todt = moment(fromdt.toDate()).add(1, 'months');

    // date filter for yearly interval.
    var y_fromdt = moment([req.query.y, 0, 1]);
    var y_todt = moment(fromdt.toDate()).add(1, 'years');

    var statistics = {
        total_cost : 0,
        total_income : 0,
        percentage_cost_income : 0,
        difference_cost_income : 0,
        total_yearly_cost : 0,
        total_yearly_income : 0
    };

    // TO DO: refactor with async.
    var query = Movements.find()
    .where('date')
        .gte(fromdt.toDate())
        .lt(todt.toDate())
    .where('frequencytype')
        .ne('f')
    .exec(function (err, results) {
        if (err) return handleError(err);

        _.each(results, function(value, key, results){
            
            if (value.amount > 0) {
                if (value.frequency > 0 && value.frequencytype === 'm')
                    statistics.total_income += (value.amount / value.frequency);
                else
                    statistics.total_income += ((-1)*value.amount);
            }
            else {
                if (value.frequency > 0 && value.frequencytype === 'm')
                    statistics.total_cost += (value.amount / value.frequency);
                else
                    statistics.total_cost += ((-1)*value.amount);
            }
        });

        statistics.percentage_cost_income = 0;
        if (statistics.total_income > 0)
            statistics.percentage_cost_income = (statistics.total_cost / statistics.total_income) * 100;

        statistics.difference_cost_income = statistics.total_income - statistics.total_cost;

        var year_query = Movements.find()
        .where('date')
            .gte(y_fromdt.toDate())
            .lt(y_todt.toDate())
        .where('frequencytype')
            .equals('f')
        .exec(function (err, results) {
            if (err) return handleError(err);

            _.each(results, function(value, key, results){

                if (value.amount > 0)
                    statistics.total_yearly_income_income += value.amount;
                else
                    statistics.total_yearly_cost += (-1)*value.amount;

            });

            // Ok.
            res.status(200).json(statistics);
        });

    });
});

router.get('/movement/:id', function(req, res, next) {
    movementsmanager.find(req.params.id, function(err, mov) {
        if (err) return handleError(err);
        // Ok.
        res.status(200).json(mov);
    });
});

router.put('/movement/:id', function (req, res) {
    movementsmanager.update(req.params.id, req.body, function (err, mov) {
        if (err) return handleError(err);
        res.status(200).json(mov);
    });
});

router.post('/movement', function (req, res) {
    movementsmanager.insert(req.body, function (err, mov) {
        if (err) return handleError(err);
        // Created.
        res.status(201).json(mov);
    });

});

router.delete('/movement/:id', function(req, res) {
    movementsmanager.delete(req.params.id, function (err, mov) {
        if (err) return handleError(err);
        res.status(200).json(mov);
    });
});

module.exports = router;
