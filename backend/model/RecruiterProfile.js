//Schema for Job applicant profile
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const RecruiterProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    }

});

module.exports = RecruiterProfile = mongoose.model('recruiterprofile', RecruiterProfileSchema);