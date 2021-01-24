const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
//filter based on job type
router.post("/recruiterSearchJobTitle", (req , res , next) => {
    var type = req.body.title;
    User.find({"job.listing.title" : title} , {"job.recruiter.name" : 1 , "$job.recruiter.email" : 1 , "$job.deadline" : 1 , "$job.reqSkills" : 1 , "$job.type"  : 1 , "$job.duration" : 1 , "$job.salary" : 1 , "$job.rating" : 1} , (err, res_1) => {
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
})