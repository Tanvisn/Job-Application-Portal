const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const path = require("path");
const multer = require("multer");

//const upload = multer({dest: 'uploads/'});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cp) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cp(null, true);
    }
    else {
        cp(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

var uploadMultiple = upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'mycv', maxCount: 1 }])

//ApplicantProfile model
const ApplicantProfile = require('../../models/ApplicantProfile');

//@route GET api/appro
//@desc get all applicant profiles
//@access public
router.get('/', (req, res) => {
    ApplicantProfile.find()
        .then(approfiles => res.json(approfiles))
        .catch(err => res.status(400).json('Error: ' + err));
});

//@route POST api/appro/download/:id
//@desc Download CV
//@access public
router.get('/download/:id', async (req, res) => {
    try {
        const file = await ApplicantProfile.findById(req.params.id);
        var path= __dirname+'../' + '../' + '../' + file.mycv;  
        console.log(path);
        res.download(path); 
        //download(new Blob[result.data],filename, mimetype);
    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});

//@route POST api/appro
//@desc Create a new profile
//@access public
router.post('/', uploadMultiple, (req, res) => {
    console.log(req.files.profileImage[0].path);
    console.log(req.files.mycv.path);
    const { name, email, inst_name, start_year, end_year, skills, profileImage, mycv } = req.body;

    //Simple validation
    if (!name || !email || !inst_name || !start_year || !skills) {
        //400 means bad request
        return res.status(400).json({ msg: 'Please enter the required fields' });
    }


    const newAppPro = new ApplicantProfile({
        name: req.body.name,
        email: req.body.email,
        inst_name: req.body.inst_name,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        skills: req.body.skills,
        profileImage: req.files.profileImage.path,
        mycv: req.files.mycv.path

    });

    ApplicantProfile.insertMany({
        name: req.body.name,
        email: req.body.email,
        inst_name: req.body.inst_name,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        skills: req.body.skills,
        profileImage: req.files.profileImage[0].path,
        mycv: req.files.mycv[0].path
    })
        .then(apppro => res.json(apppro))
        .catch(err => res.status(400).json('Error: ' + err));
});

//@route POST api/appro/edit
//@desc Edit Profile
//@access public
router.post('/edit/:id', upload.single("profileImage"), (req, res) => {

    ApplicantProfile.findById(req.params.id)

    ApplicantProfile.updateOne({ _id: req.params.id },
        {$set: {
            name: req.body.name,
            email: req.body.email,
            inst_name: req.body.inst_name,
            start_year: req.body.start_year,
            end_year: req.body.end_year,
            skills: req.body.skills,
        }})
        .then(apppro => {
            console.log(apppro);
            console.log('Post request success!!!');
        }
        )
        .catch(err => res.status(400).json('Error: ' + err));
});



//@route GET api/appro
//@desc get specific applicant's profile
//@access public
router.get('/', (req, res) => {
    ApplicantProfile.find()
        .then(approfiles => res.json(approfiles))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
