const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
// Remember INDUCES

// Index(Read)
router.get("/userbase", async (req, res) => {
        router.route('/').get((req, res) => {
        Users.find({}, (err, foundUsers)=>{
            res.json(foundUsers);
        });
    });
});

// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res)=>{
    Users.findByIdAndRemove(req.params.id, (err, deletedUsers)=>{
        res.json(deletedUsers);
    });
});
// Update
router.put('/:id', (req, res)=>{
    Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUsers)=>{
        res.json(updatedUsers);
    });
});
// Create
router.post('/', (req, res)=>{
    Users.create(req.body, (err, createdUsers)=>{
        res.json(createdUsers); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React application
// Show(Read)
router.get('/:id', (req, res)=>{
    Users.findById(req.params.id, (err, foundUsers)=>{
        res.json(foundUsers);
    });
});


module.exports = router;