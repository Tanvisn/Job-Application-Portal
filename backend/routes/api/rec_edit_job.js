const express = require('express');
const router = express.Router();

//Job creating by recruiter model
const RecCreateJob = require('../../models/RecCreateJob');

//@route POST api/recruiterdash/getdetails
//@desc details of job listing
//@access public
router.post('/getdetails', (req, res) => {
    var id = req.body._id;
    console.log(id);
    RecCreateJob.find({ "_id": id }, { "max_applications": 1, "max_positions": 1, "deadline": 1 }, (err, res_1) => {
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

//@route POST api/receditjob/edit/:id
//@desc Edit details of Job listing
//@access public
router.post('/:id', (req,res) => {
    console.log(req.params.id);
    RecCreateJob.updateOne({_id:req.params.id},
        {  max_applications: req.body.max_applications,
            max_positions: req.body.max_positions,
            deadline: req.body.deadline,
        })
    .then(recpro => {
        res.json(recpro);
        console.log(recpro);
        console.log('Post request success!!!');
    }
       )
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
