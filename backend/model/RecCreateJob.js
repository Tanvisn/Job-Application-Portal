//Schema for Creating Job listing for recruiter
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const RecCreateSchema = new Schema({
    title_job: {
        type: String,
        required: true
    },
    name_of_rec: {
        type: String,
        required: true,
    },

    email_of_rec: {
        type: String,
        required: true,
    },

    max_applications: {
        type: Number,
        required: true
    },
    //Number of available positions
    max_positions: {
        type: Number,
        required: true
    },

    date_post: {
        type:Date,
        default: Date.now
    },
    //Day Month Year Hour Minute
    deadline: {
        type:Date,
        required: true
    },
    job_type: {
        type: String,
        required: true,
    },
    req_skills: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary_monthly: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        default: 'active'
    }

});

module.exports = Recruit = mongoose.model('recruit', RecCreateSchema);