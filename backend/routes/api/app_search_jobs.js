const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

const ApplicantAllJobs = require('../../models/RecCreateJob');

//@route POST api/appsearchjobs
//@desc search based on job title
//@access public
//Search based on job title
router.post("/", (req , res , next) => {
    console.log(req.body.title_job);
    var title = req.body.title_job;
    var regex = new RegExp(["^", title, "$"].join(""), "i");
    ApplicantAllJobs.find( { title_job : regex } , {"title_job": 1, "name_of_rec" : 1 , "email_of_rec" : 1 , "deadline" : 1 , "req_skills" : 1 , "job_type"  : 1 , "duration" : 1 , "salary_monthly" : 1 , "rating" : 1} , (err, res_1) => {
        var result;
        var message = "Something went wrong!!";
        if(!err)
        {
            if((res_1.length === 0) || (res_1[0] === null))
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
                success : true,
                message : message,
                data : result
            }));
        }
        else
        {
            res.send(JSON.stringify({
                success : false,
                message : message,
                data : []
            }));

            console.log(err);
        }
    });
})

module.exports = router;