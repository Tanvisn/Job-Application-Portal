const express = require('express');
const router = express.Router();

//Job creating by recruiter model
const AllApplications = require('../../models/AllApplications');
const ApplicantAllApps = require('../../models/ApplicantAllApps');

//@route GET api/apply
//@desc get all applications
//@access public
router.get('/', (req, res) => {
    AllApplications.find()
        .then(allapplications => res.json(allapplications))
        .catch(err => res.status(400).json('Error: ' + err));
});


//@route DELETE api/apply/del
//@desc delete requested entry from applications
//@access public
router.delete('/del', (req, res) => {
    console.log('Deleting the requested entry!!!');
    AllApplications.findById(req.body.id)
        .then(job => job.remove().then(() =>
            res.json({ success: true }))
        )
        .catch(err => res.status(404).json({ success: false }));
});


//@route POST api/apply/updateStage
//@desc update stage of job
//@access public
router.post('/updateStage', (req, res) => {

    AllApplications.updateOne({ _id: req.body.id },
        {
            $set: {
                stage_apply: req.body.stage_apply
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



//@route POST api/apply/getjobapps
//@desc get all applications of a particular job
//@access public
router.post('/getjobapps', (req, res, next) => {
    var job = req.body.job_id;
    AllApplications.find({ "job_id": job }, { "name": 1, "skills": 1, "date_apply": 1, "inst_name": 1, "start_year": 1, "end_year": 1, "sop": 1, "stage_apply": 1, "rating": 1 }, (err, res_1) => {
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
})


//@route POST api/apply/setStatus
//@desc set status
//@access public
router.post("/setStatus", (req , res , next) => {

    var key = req.body.id;

    AllApplications.updateMany({"job_id" : key} , {$set : {"stage_apply" : "deleted"}} , (err) => {
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

//@route POST api/apply
//@desc Create a new application
//@access public
router.post('/', (req, res) => {

    console.log('Applying...')
    //console.log(req.body);

    const { name, email, skills, inst_name, end_year, start_year, sop, stage_apply, job_id, rating } = req.body;

    //Simple validation
    if (!name || !skills || !email || !inst_name || !start_year || !sop || !stage_apply || !job_id) {
        //400 means bad request
        return res.status(400).json({ msg: 'All fields not recieved' });
    }

    AllApplications.insertMany({
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        inst_name: req.body.inst_name,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        sop: req.body.sop,
        stage_apply: req.body.stage_apply,
        job_id: req.body.job_id,
        rating: req.body.rating
    })

        .then(allapplications => res.json(allapplications))
        .catch(err => res.status(400).json('Error: ' + err));
});

//@route POST api/apply/getsortjobs
//@desc get sorted job application to display on Recruiter
//@access public

//Sort by title, date of application, applicant's rating, descending and ascending order
router.post("/getsortjobs", (req, res, next) => {
    //var username = req.body.name;
    var job = req.body.job_id;
    var edit = req.body.edit; //edit = 1 => ascending, edit = -1 => descending
    var mode = req.body.mode; //mode = 1 => sort by name, mode = 2 => sort by date, mode = 3 => sort by rating

    if (mode === 1) {
        //name
        AllApplications.aggregate([{ $match: { "job_id": job } }, { $sort: { "name": edit } }], (err, res_1) => {
            var result;
            var message = "Something went wrong in name!!";
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
    }

    else if (mode === 2) {
        //date
        AllApplications.aggregate([{ $match: { "job_id": job } }, { $sort: { "date_apply": edit } }], (err, res_1) => {
            var result;
            var message = "Something went wrong in date!!";
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
    }
    else if (mode === 3) {
        //rating
        AllApplications.aggregate([{ $match: { "job_id": job } }, { $sort: { "rating": edit } }], (err, res_1) => {
            var result;
            var message = "Something went wrong in rating!!";
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
    }
    else {
        var message = "Wrong mode!!";
        res.send(JSON.stringify({
            success: false,
            message: message,
            data: []
        }));
    }
})


//@route POST api/apply/getsortjobs/all
//@desc get all applications sorted
//@access public

//Sort by title, date of application, applicant's rating, descending and ascending order
router.post("/getsortjobs/all", (req, res, next) => {
    var edit = req.body.edit; //edit = 1 => ascending, edit = -1 => descending
    var mode = req.body.mode; //mode = 1 => sort by name, mode = 2 => sort by rating

    if (mode === 1) {
        //name
        AllApplications.aggregate([{ $sort: { "name": edit } }], (err, res_1) => {
            var result;
            var message = "Something went wrong in name!!";
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
    }

    else if (mode === 3) {
        //rating
        AllApplications.aggregate([{ $sort: { "rating": edit } }], (err, res_1) => {
            var result;
            var message = "Something went wrong in rating!!";
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
    }
    else {
        var message = "Wrong mode!!";
        res.send(JSON.stringify({
            success: false,
            message: message,
            data: []
        }));
    }
})



module.exports = router;
