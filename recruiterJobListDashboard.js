const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
//Job title, Date of posting, Number of applicants, Maximum number of positions
router.post("/recruiterJobListDashboard", (req , res , next) => {
    var username = req.body.name;
    User.find({"userName" : username} , {"$recruit.listing.title" : 1 , "$recruit.listing.date" : 1 , "$recruit.listing.number" : 1 , "$recruit.listing.max" : 1} , (err, res_1) => {
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