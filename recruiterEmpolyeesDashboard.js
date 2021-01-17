const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
//Name of employee, date of joining, Job type, Job title, Rating
router.post("/recruiterEmployeesDashboard", (req , res , next) => {
    var username = req.body.name;
    User.find({"userName" : username} , {"$recruit.employees.name" : 1 , "$recruit.employees.date" : 1 , "$recruit.employees.type" : 1 , "$recruit.employees.title" : 1 , "$recruit.employees.rating"  : 1} , (err, res_1) => {
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