var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('underscore');
var movementsschema = require('./mongo-schema/movement-schema');

mongoose.connect('mongodb://localhost:27017/walletsdb');

var movSchema = mongoose.Schema(movementsschema);

module.exports = {
    getAll : function (year, month, callback) {

        var mov = mongoose.model('movements', movSchema);

        var fromdt = moment([year, month - 1, 1]);
        var todt = moment(fromdt.toDate()).add(1, 'months');

        var query = mov.find()
        .where('date')
            .gte(fromdt.toDate())
            .lt(todt.toDate())
        .sort('-date')
        .exec(function (err, results) {
        if (err) return callback(err);
            // Ok.
            callback(null, results);
        });
    },
    
    find: function(id, callback) {

        var mov = mongoose.model('movements', movSchema);

        mov.findById(id, function (err, mov) {
            if (err) return callback(err);
            // Ok.
            callback(null, mov);
        });
    },

    update: function(id, movement, callback) {
        var mov = mongoose.model('movements', movSchema);

        mov.findByIdAndUpdate(id, { $set: movement}, function (err, m) {
            if (err) return callback(err);
            callback(null, m);
        });
    },

    insert: function(movement, callback) {
        var Movements = mongoose.model('movements', movSchema);
        var mov = new Movements(movement);
        mov.save(function (err, mov) {
            if (err) return callback(err);
            // Created.
            callback(null, mov);
        });
    },

    delete: function(id, callback) {
        var Movements = mongoose.model('movements', movSchema);
        Movements.findByIdAndRemove(id, function (err, mov) {
            if (err) return callback(err);
            callback(null, mov);
        });
    },

    statistics: function(year, month, wallet, callback) {

        var statistics = {
            total_cost : 0,
            total_income : 0,
            percentage_cost_income : 0,
            difference_cost_income : 0,
            total_fixed_cost : 0,
            total_fixed_income : 0
        };
        
        // TO DO: refactor with async.
        var self = this;
        self.mountlyMovementsWithSingleFrequency(year, month, wallet, statistics, function(err, stat) {
            if (err) callback(err);
            self.mountlyMovementsWithMultipleFrequency(year, month, wallet, stat, function(err, stat) {
                if (err) callback(err);
                self.mountlyMovementsWithFixedFrequency(year, month, wallet, stat, function(err, stat) {
                    if (err) callback(err);
                    callback(null, stat);
                });
            });
        });

    },

    mountlyMovementsWithSingleFrequency: function(year, month, wallet, statistics, callback) {

        var Movements = mongoose.model('movements', movSchema);

        // date filter for mountly interval.
        var fromdt = moment([year, month - 1, 1]);
        var todt = moment(fromdt.toDate()).add(1, 'months');

        var query = Movements.find()
        .where('date')
            .gte(fromdt.toDate())
            .lt(todt.toDate())
        .where('frequencytype')
            .equals('m')
        .where('frequency')
            .equals(1)
        .where('wallet')
            .equals(wallet)
        .exec(function (err, results) {
            if (err) return callback(err);

            _.each(results, function(value, key, results){

                if (value.amount > 0)
                    statistics.total_income += value.amount;
                else
                    statistics.total_cost += ((-1)*value.amount);
            });

            statistics.percentage_cost_income = 0;
            if (statistics.total_income > 0)
                statistics.percentage_cost_income = (statistics.total_cost / statistics.total_income) * 100;

            statistics.difference_cost_income = statistics.total_income - statistics.total_cost;

            callback(null, statistics);

        });


    },

    mountlyMovementsWithMultipleFrequency: function(year, month, wallet, statistics, callback) {

        var Movements = mongoose.model('movements', movSchema);

        var fromdt = moment([year, month - 1, 1]);
        var todt = moment(fromdt.toDate()).add(1, 'months');
        var calculatemonth = 0;
        var calculateyear = 0;

        var query = Movements.find()
        .where('frequencytype')
            .equals('m')
        .where('frequency')
            .gt(1)
        .where('wallet')
            .equals(wallet)        
        .exec(function (err, results) {
            if (err) return callback(err);

            _.each(results, function(value, key, results){

                calculateyear = moment(value.date).add(value.frequency, 'months').year();
                calculatemonth = moment(value.date).add(value.frequency, 'months').month();

                if (todt.year() <= calculateyear && todt.month() <= calculatemonth) {
                    if (value.amount > 0)
                        statistics.total_income += (value.amount / value.frequency);
                    else
                        statistics.total_cost += (((-1)*value.amount) / value.frequency);
                }

            });

            statistics.percentage_cost_income = 0;
            if (statistics.total_income > 0)
                statistics.percentage_cost_income = (statistics.total_cost / statistics.total_income) * 100;

            statistics.difference_cost_income = statistics.total_income - statistics.total_cost;

            callback(null, statistics);

        });


    },

    mountlyMovementsWithFixedFrequency: function(year, month, wallet, statistics, callback) {

        var Movements = mongoose.model('movements', movSchema);

        // date filter for yearly interval.
        var y_fromdt = moment([year, 0, 1]);
        var y_todt = moment(y_fromdt.toDate()).add(1, 'years');

        var year_query = Movements.find()
        .where('date')
            .gte(y_fromdt.toDate())
            .lt(y_todt.toDate())
        .where('frequencytype')
            .equals('f')
        .where('wallet')
            .equals(wallet)        
        .exec(function (err, results) {
            if (err) return callback(err);

            _.each(results, function(value, key, results){

                if (value.amount > 0)
                    statistics.total_fixed_income += value.amount;
                else
                    statistics.total_fixed_cost += (-1)*value.amount;

            });

            callback(null, statistics);
        });
    }

};
