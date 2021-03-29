const express = require('express');
const router = express.Router();

const RecCreateJob = require('../../models/RecCreateJob');
//Job title, Date of posting, Number of applicants, Maximum number of positions

//@route POST api/recruiterdash/alljobs
//@desc Shows all jobs listed by the recruiter
//@access public

router.post('/alljobs', (req, res) => {
    var username = req.body.email_of_rec;
    console.log(username);
    RecCreateJob.find({ "email_of_rec": username, "state": {$ne: "expired"}}, { "title_job": 1, "date_post": 1, "max_applications": 1, "max_positions": 1, "deadline": 1, "job_type": 1 }, (err, res_1) => {
        var result;
        var message = "Something went wrong!!";
        if (!err) {
            if ((res_1.length === 0) || (res_1[0] === null)) {
                result = [];
                message = "No entries yet!!";
            }
            else {
                message = "Successfully fetched!!";
                result = res_1;
            }
            res.send(JSON.stringify({
                success: true,
                message: message,
                data: result
            }));
        }
        else {
            res.send(JSON.stringify({
                success: false,
                message: message,
                data: []
            }));
        }
    });
});

//@route POST api/recruiterdash/alljobs/sort
//@desc Shows sorted all jobs listed by the recruiter
//@access public
//Sort by Title descending and ascending order
router.post('/alljobs/sort', (req , res , next) => {
    var username = req.body.email_of_rec;
    var edit = req.body.edit; //edit = 1 => ascending, edit = -1 => descending
    var mode = req.body.mode; //mode = 1 => sort by title, mode = 2 => sort by duration, mode = 3 => sort by rating
    console.log('Edit: ')
    console.log(edit);
    console.log('mode: ')
    console.log(mode);
    if(mode === 1)
    {
        //title
        RecCreateJob.aggregate([{$match : {"email_of_rec" : username}}, {$sort : {"title_job" : edit}}] , (err, res_1) => {
            var result;
            var message = "Something went wrong in Title sort!!";
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

// //@route DELETE api/recruiterdash/del/:id
// //@desc Delete Job from list
// //@access public
// router.('/del/:id', (req, res) => {
//     console.log('Deleting the requested entry!!!');
//     RecCreateJob.findById(req.params.id)
//         .then(job => job.remove().then(() =>
//             res.json({ success: true }))
//         )
//         .catch(err => res.status(404).json({ success: false }));
// });

router.post('/del/:id', (req, res) => {
    console.log('Deleting the requested entry!!!');
    RecCreateJob.updateOne({ _id: req.body.id },
        {
            $set: {
                state: 'expired'
            }
        })
        .then(res => {
            console.log(res);
            console.log('Post request success!!!');
        }
        )
        .catch(err =>
            res.status(400).json('Error: ' + err));
});


module.exports = router;
