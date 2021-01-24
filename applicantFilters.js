const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
//filters for applicant
router.post("/applicantFilters", (req , res , next) => {
    var type = req.body.type;
    var low = req.body.low;
    var high = req.body.high;
    var duration = req.body.duration;
    var mode = req.body.mode;//if mode = 1 filter by type, if mode = 2, filter by salary, if mode = 3 filter by duration

    if(mode === 1)
    {
        // Filter by Type
        User.find({"$job.listing.type" : type} , {"$job.recruiter.name" : 1 , "$job.recruiter.email" : 1 , "$job.deadline" : 1 , "$job.reqSkills" : 1 , "$job.title"  : 1 , "$job.duration" : 1 , "$job.salary" : 1 , "$job.rating" : 1} , (err, res_1) => {
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
            }
        });
    }

    else if(mode === 2)
    {
        User.find({"$job.salary" : {$lte : high , $gte : low}} , {"$job.recruiter.name" : 1 , "$job.recruiter.email" : 1 , "$job.deadline" : 1 , "$job.reqSkills" : 1 , "$job.title"  : 1 , "$job.duration" : 1 , "$job.type" : 1 , "$job.rating" : 1} , (err, res_1) => {
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
            }
        });
    }

    else if(mode === 3)
    {
        User.find({"$job.duration" : {$lte : duration}} , {"$job.recruiter.name" : 1 , "$job.recruiter.email" : 1 , "$job.deadline" : 1 , "$job.reqSkills" : 1 , "$job.title"  : 1 , "$job.type" : 1 , "$job.salary" : 1 , "$job.rating" : 1} , (err, res_1) => {
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
            }
        });
    }

    else
    {
        res.send(JSON.stringify({
            success : false,
            message : "Wrong mode!!",
            data : []
        }));
    }
})