const express = require('express');
const router = express.Router();
const Chips = require('../models/chips.js');
// Remember INDUCES

// Index
router.get('/', (req, res)=>{
    Chips.find({}, (err, foundChips)=>{
        res.json(foundChips);
    });
});
// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res)=>{
    Chips.findByIdAndRemove(req.params.id, (err, deletedChips)=>{
        res.json(deletedChips);
    });
});
// Update
router.put('/:id', (req, res)=>{
    Chips.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedChips)=>{
        res.json(updatedChips);
    });
});
// Create
router.post('/', (req, res)=>{
    Chips.create(req.body, (err, createdChips)=>{
        res.json(createdChips); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React application
// Show
router.get('/:id', (req, res)=>{
    Chips.findById(req.params.id, (err, foundChips)=>{
        res.json(foundChips);
    });
});


module.exports = router;