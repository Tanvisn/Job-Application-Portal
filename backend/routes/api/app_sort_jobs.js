const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

const ApplicantAllJobs = require('../../models/RecCreateJob');

//Sort by Salary, duration, Recruiter rating descending and ascending order
router.post('/', (req , res , next) => {
    var username = req.body.name;
    var edit = req.body.edit; //edit = 1 => ascending, edit = -1 => descending
    var mode = req.body.mode; //mode = 1 => sort by salary, mode = 2 => sort by duration, mode = 3 => sort by rating
    console.log('Edit: ')
    console.log(edit);
    console.log('mode: ')
    console.log(mode);
    if(mode === 1)
    {
        //title
        ApplicantAllJobs.aggregate([{$sort : {"salary_monthly" : edit}}] , (err, res_1) => {
            var result;
            var message = "Something went wrong in Salary sort!!";
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

                console.error(err);
            }
        });
    }
    else if(mode === 2)
    {
        //date
        ApplicantAllJobs.aggregate([{$sort : {"duration" : edit}}] , (err, res_1) => {
            var result;
            var message = "Something went wrong in Duration sorting!!";
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
        //rating
        ApplicantAllJobs.aggregate([{$sort : {"rating" : edit}}] , (err, res_1) => {
            var result;
            var message = "Something went wrong in rating!!";
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
        var message = "Wrong mode!!";
        res.send(JSON.stringify({
            success : false,
            message : message,
            data : []
        }));
    }
})

module.exports = router;
