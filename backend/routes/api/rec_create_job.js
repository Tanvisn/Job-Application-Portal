const express = require('express');
const router = express.Router();

//Job creating by recruiter model
const RecCreateJob = require('../../models/RecCreateJob');

//@route GET api/reccreatejob
//@desc get all applicant profiles
//@access public
router.get('/',(req,res) => {
    RecCreateJob.find()
    .then(reccreatejob => res.json(reccreatejob))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@route POST api/reccreatejob
//@desc Create a new Job listing
//@access public
router.post('/', (req,res) => {

    const {_id, title_job, name_of_rec, email_of_rec,  max_applications,  max_positions, deadline, job_type, req_skills, duration, salary_monthly, rating} = req.body;

    //Simple validation
    if(!title_job || !name_of_rec || !email_of_rec ||  !max_applications ||  !max_positions || !deadline || !job_type || !req_skills || !duration || !salary_monthly || !rating)
    {
        //400 means bad request
        return res.status(400).json({msg: 'Please enter the required fields'});
    }


    RecCreateJob.insertMany({
        title_job: req.body.title_job,
        name_of_rec: req.body.name_of_rec,
        email_of_rec: req.body.email_of_rec,
        max_applications: req.body.max_applications,
        max_positions: req.body.max_positions,
        deadline: req.body.deadline,
        job_type: req.body.job_type,
        req_skills: req.body.req_skills,
        duration: req.body.duration,
        salary_monthly: req.body.salary_monthly,
        rating: req.body.rating
    })
    .then(reccreatejob => res.json(reccreatejob))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
