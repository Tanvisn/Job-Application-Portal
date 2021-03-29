const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//Item model
const Item = require('../../models/Item');

//@route GET api/Items
//@desc Get all items
//@access public
router.get('/',(req,res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))

});

//@route POST api/Items
//@desc Get Create an Item
//@access private
router.post('/', auth, (req,res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));

});

//@route DELETE api/Items/:id
//@desc Get Delete an Item
//@access private
router.delete('/:id', auth, (req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});




module.exports =  router;