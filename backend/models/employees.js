const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;






// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const employeeSchema = new Schema({
//   employeeID: {
//     type: String,
//     required: true,
//   },
//   employeeName: {
//     type: String,
//     required: true,
//   },
//   contactNo: {
//     type: Number,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   position: {
//     type: String,
//     required: true,
//   },

// });

// module.exports = mongoose.model("employee", employeeSchema);