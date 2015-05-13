var moment = require('moment');

module.exports = {
    getAll : function (mov, year, month, callback) {
        var fromdt = moment([year, month - 1, 1]);
        var todt = moment(fromdt.toDate()).add(1, 'months');

        var query = mov.find()
        .where('date')
            .gte(fromdt.toDate())
            .lt(todt.toDate())
        .sort('-date')
        .exec(function (err, results) {
        if (err) return handleError(err);
            // Ok.
            callback(null, results);
        });
    },
    
    getOne: function(mov, id, callback) {
        mov.findById(id, function (err, mov) {
            if (err) return handleError(err);
            // Ok.
            callback(null, mov);
        });
    }
};

// module.exports = movements;