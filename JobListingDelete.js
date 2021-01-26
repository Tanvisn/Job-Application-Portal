const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');

router.post("/jobListingDelete", (req , res , next) => {

    var key = req.body.key;

    User.updateMany({jobKey : key} , {$set : {"status" : "Deleted"}} , (err) => {
        var message = "Something went wrong!!";
        if(!err)
        {
            message = "Deleted Sucessfully!!";
            res.send(JSON.stringify({
                success : true,
                message : message,
            }));
        }
        else
        {
            res.send(JSON.stringify({
                success : false,
                message : message,
            }));
        }
    });
})
