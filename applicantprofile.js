const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//ApplicantProfile model
const ApplicantProfile = require('../../models/ApplicantProfile');

//@route GET api/appro
//@desc get all applicant profiles
//@access public
router.get('/',(req,res) => {
    ApplicantProfile.find()
    .then(approfiles => res.json(approfiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@route POST api/appro
//@desc Create a new profile
//@access public
router.post('/', (req,res) => {

    const {name,email,inst_name, start_year, end_year, profileImage} = req.body;

    //Simple validation
    if(!name || !email || !inst_name || !start_year)
    {
        //400 means bad request
        return res.status(400).json({msg: 'Please enter the required fields'});
    }


    const newAppPro = new ApplicantProfile({
        name: req.body.name,
        email: req.body.email,
        inst_name: req.body.inst_name,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        profileImage: req.body.profileImage
    });

    newAppPro.save()
    .then(apppro => res.json(apppro))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@route GET api/appro
//@desc get specific applicant's profile
//@access public
router.get('/', (req,res) => {
    ApplicantProfile.find()
    .then(approfiles => res.json(approfiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
