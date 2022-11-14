const { User, Thought } = require('../models');


module.exports = {

//GET all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then(thoughts => res.json(thoughts))
        .catch(err => res.status(500).json(err));   
},

//GET a single thought by _id
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.id})
            .then(thought => {
                if(!thought) {
                    res.status(400).json({message: 'No thought with this ID'});
                    return;
                };
                res.json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
},
//POST to create a new thought and push to user's thoughts array field
    createThought(req,res) {
        Thought.create(req.body)
        .then(({_id})=> {
            return User.findOneAndUpdate(
                {username: req.body.username},
                {$push: { thoughts: _id}},
                {new: true}
            );
        })
        .then(user => {
            if(user) {
                res.json(user);
            } else {
                res.status(400).json({message: 'No User with this ID'});
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

//PUT to update a thought by its _id
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {runValidators: true, new:true}
            )
        .then(thought => {
            if(thought) {
                res.json(thought);
            } else {
                res.status(400).json({message: "No thought found with this ID"});
            };
        })
    },

//DELETE to remove a thought by its _id
    removeThought(req,res) {
        Thought.findOneAndDelete({_id: req.params.id})
            .then(thought => {
                if(thought) {
                    res.json(thought);
                } else {
                    res.status(400).json({message: "No thought found with  this ID"});
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

//POST to create a reaction stored in a single thought's reactions array field
    createReaction(req,res) { 
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: {reactions: req.body} },
            { runValidators: true, new:true }
        )
            .then(thought => {
                if(thought) {
                    res.json(thought);
                } else {
                    res.status(400).json({message: 'No thought found with this ID'});
                };
            })    
},

//DELETE to pull and remove a reaction by reactionId value
    deleteReaction(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            { $pull: {reactions: {reactionsId: req.params.reactionsId}}},
            {runValidators: true, new:true }
        )
            .then(thought => {
                if(thought) {
                    res.json(thought);
                } else {
                    res.status(400).json({ message: 'No thought found with this ID'})
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
};