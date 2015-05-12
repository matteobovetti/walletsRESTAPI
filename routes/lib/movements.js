"use strict";

var Movements = function() {
    this.schema = {
        date: Date,
        description: String,
        amount: Number,
        tags: String,
        wallet: String,
        PoU: Number,
        frequencytype: String,
        frequency: Number
    }
};

Movements.prototype.getSchema = function () {
  return this.schema;
};

module.exports = Movements;
