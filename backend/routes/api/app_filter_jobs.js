const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();


const ApplicantAllJobs = require('../../models/RecCreateJob');

//@route POST api/appfilterjobs
//@desc filter based on various fields
//@access public

//filters for applicant
router.post("/", (req, res, next) => 
{
    var type = req.body.job_type;
    var regex = new RegExp(["^", type, "$"].join(""), "i");
    var low = req.body.low;
    var high = req.body.high;
    var duration = req.body.duration;
    var mode = req.body.mode;//if mode = 1 filter by type, if mode = 2, filter by salary, if mode = 3 filter by duration

    if (mode === 1) 
    {
        // Filter by Type
        ApplicantAllJobs.find({ job_type: regex }, { "job_type": 1, "name_of_rec": 1, "email_of_rec": 1, "deadline": 1, "req_skills": 1, "title_job": 1, "duration": 1, "salary_monthly": 1, "rating": 1 }, (err, res_1) => 
        {
            var result;
            var message = "Something went wrong!!";
            if (!err) {
                if ((res_1.length === 0) || (res_1[0] === null)) {
                    result = [];
                    message = "No entries yet!!";
                }
                else {
                    message = "Successfully fetched!!";
                    result = res_1;
                }
                res.send(JSON.stringify({
                    success: true,
                    message: message,
                    data: result
                }));
            }
            else {
                res.send(JSON.stringify({
                    success: false,
                    message: message,
                    data: []
                }));
            }
        });
    }

    else if(mode === 2) 
    {
        ApplicantAllJobs.find({ "salary_monthly": { $lte: high, $gte: low } }, { "job_type":1, "name_of_rec": 1, "email_of_rec": 1, "deadline": 1, "req_skills": 1, "title_job": 1, "duration": 1, "salary_monthly": 1, "rating": 1 }, (err, res_1) => 
        {
            var result;
            var message = "Something went wrong!!";
            if (!err) {
                if ((res_1.length === 0) || (res_1[0] === null)) 
                {
                    result = [];
                    message = "No entries yet!!";
                }
                else 
                {
                    message = "Successfully fetched!!";
                    result = res_1;
                }
                res.send(JSON.stringify({
                    success: true,
                    message: message,
                    data: result
                }));
            }
            else 
            {
                res.send(JSON.stringify({
                    success: false,
                    message: message,
                    data: []
                }));
            }
        });
    }

    else if (mode === 3) 
    {
        ApplicantAllJobs.find({ "duration": { $lt: duration } }, { "job_type":1, "name_of_rec": 1, "email_of_rec": 1, "deadline": 1, "req_skills": 1, "title_job": 1, "duration": 1, "salary_monthly": 1, "rating": 1 }, (err, res_1) => 
        {
            var result;
            var message = "Something went wrong!!";
            if (!err) {
                if ((res_1.length === 0) || (res_1[0] === null)) 
                {
                    result = [];
                    message = "No entries yet!!";
                }

                else 
                {
                    message = "Successfully fetched!!";
                    result = res_1;
                }
                res.send(JSON.stringify({
                    success: true,
                    message: message,
                    data: result
                }));
            }
            else 
            {
                res.send(JSON.stringify({
                    success: false,
                    message: message,
                    data: []
                }));
            }
        });
    }

    else 
    {
        res.send(JSON.stringify({
            success: false,
            message: "Wrong mode!!",
            data: []
        }));
    }
})

module.exports = router;