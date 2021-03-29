const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//User model
const User = require('../../models/User');
const { route } = require('./items');

//@route POST api/auth
//@desc register Auth user
//@access public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    //Simple validation
    if (!email || !password) {
        //400 means bad request
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });
            //Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    user_type: user.user_type
                                }
                            })
                        }
                    )
                })
        })
});

//@route POST api/auth/edit/:id
//@desc register Auth user
//@access public
router.post('/edit/:id', (req, res) => {

    User.findById(req.params.id)

    User.updateOne({ _id: req.params.id },
        {
            name: req.body.name,
            email: req.body.email
        })
        .then(user => {
            console.log(user);
            console.log('User update success!!!');
        }
        )
        .catch(err => res.status(400).json('Error: ' + err));
});


//@route GET api/auth/user
//@desc get user data
//@access public
router.get('/user', (req, res) => {
    User.find()
        .select('-password')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;