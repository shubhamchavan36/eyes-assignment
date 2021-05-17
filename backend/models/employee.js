var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = mongoose.model;

const employeeSchema = new Schema({
    name: {
        type: String,
    },
    hourlyRate: {
        type: Number
    },
    monthlyWorkingHour: {
        type: Number
    },
    allowance: {
        type: Number
    },
    deduction: {
        type: Number
    }
});
module.exports = Model('employee', employeeSchema);
