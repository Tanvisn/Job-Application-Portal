const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
//Applicant's name, skills, date of application, education, SOP, Rating, Stage of application
router.post("/recruiterNonRejectedApplications", (req , res , next) => {
    var username = req.body.name;
    var title = req.body.title;
    User.find({"userName" : username , "recruit.listing.title" : title} , {"$recruit.list.name" : 1 , "$recruit.list.skills" : 1 , "$recruit.list.appDate" : 1 , "$recruit.list.education" : 1 , "$recruit.list.SOP"  : 1 , "$recruit.list.stage" : 1} , (err, res_1) => {
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