
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },

    image: {
        type: String,
        // required: true
    },
    preview: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true  
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    contact: {
        type: Number, // Assuming you store the contact number as a string
        required: true
    }
})

module.exports = mongoose.model('employeedetails', EmployeeSchema)