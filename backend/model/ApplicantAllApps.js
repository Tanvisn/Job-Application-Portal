//Schema for Job applicant profile
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const ApplicantAllAppsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    skills: {
        type:String,
        //required: true
    },

    date_apply: {
        type:Date,
        default: Date.now
    },

    inst_name: {
        type: String,
        //required: true,
    },
    start_year: {
        type: Number,
        //required: true
    },
    end_year: {
        type: Number
    }, 
    
    sop: {
        type: String,
        required: true
    },

    stage_apply: {
        type: String,
        required: true
    },

    job_id: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        //required: true
    },

});

module.exports = ApplicantAllApps = mongoose.model('applicantallapps', ApplicantAllAppsSchema);