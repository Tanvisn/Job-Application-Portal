const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const User = mongoose.model('User');

router.post("/applicantDashboard", (req , res , next) => {

    User.find({"type" : 1} , {"$recruit.job.title" : 1 , "$recruit.name" : 1 , "$recruit.rating" : 1 , "$recruit.job.salary" : 1 , "$recruit.job.duration"  : 1, "$recruit.job.deadline" : 1} , (err, res_1) => {
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
