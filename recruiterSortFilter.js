const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
//Sort by title, date of application, applicant's rating, descending and ascending order
router.post("/recruiterSortFilter", (req , res , next) => {
    var username = req.body.name;
    var edit = req.body.edit; //edit = 1 => ascending, edit = -1 => descending
    var mode = req.body.mode; //mode = 1 => sort by title, mode = 2 => sort by date, mode = 3 => sort by rating

    if(mode === 1)
    {
        //title
        User.aggregate([{$match : {"userName" : username}} , {$sort : {"$recruit.recruiting.title" : edit}}] , (err, res_1) => {
            var result;
            var message = "Something went wrong in title!!";
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
        //date
        User.aggregate([{$match : {"userName" : username}} , {$sort : {"$recruit.recruiting.date" : edit}}] , (err, res_1) => {
            var result;
            var message = "Something went wrong in date!!";
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
        User.aggregate([{$match : {"userName" : username}} , {$sort : {"$recruit.recruiting.rating" : edit}}] , (err, res_1) => {
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