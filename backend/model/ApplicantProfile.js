//Schema for Job applicant profile
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const ApplicantProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    inst_name: {
        type: String,
        required: true,
    },
    start_year: {
        type: Number,
        required: true
    },
    end_year: {
        type: Number
    },

    skills: {
        type:String,
        required: true
    },
    profileImage: {
        type: String,
    },

    mycv: {
        type: String,
    },

});

module.exports = ApplicantProfile = mongoose.model('applicantprofile', ApplicantProfileSchema);