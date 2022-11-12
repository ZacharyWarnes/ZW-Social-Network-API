const { User, Thought } = require('../models');

module.exports = {

//GET all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));   
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
        })
},
//POST to create a new thought and push to user's thoughts array field

//PUT to update a thought by its _id
//DELETE to remove a thought by its _id

//POST to create a reaction stored in a single thought's reactions array field
//DELETE to pull and remove a reaction by reactionId value
}