var express = require('express');
var router = express.Router();
var movementsmanager = require('./lib/movements');

router.get('/movements', function(req, res, next) {
    movementsmanager.getAll(req.query.y, req.query.m, function(err, results) {
        if (err) return handleError(err);
        // Ok.
        res.status(200).json(results);
    });
});

router.get('/statistics', function(req, res, next) {
    movementsmanager.statistics(req.query.y, req.query.m, function(err, results) {
        if (err) return handleError(err);
        // Ok.
        res.status(200).json(results);
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
