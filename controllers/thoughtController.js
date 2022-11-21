const { User, Thought } = require('../models');


module.exports = {

//GET all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err)=> res.status(500).json(err));

},

//GET a single thought by _id
    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')
            .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID'})
              : res.json(thought)
              )
              .catch((err) => {
                res.status(500).json(err)
                console.log(err) 
              });             
},
//POST to create a new thought and push to user's thoughts array field
    createThought(req,res) {
        Thought.create(req.body)
        .then((thought)=> {
            return User.findOneAndUpdate(
                {username: req.body.username},
                {$push: { thoughts: thought._id}},
                {new: true}
            );
        })
        .then((user) => {
            if(!user) {
                res.status(404).json({ message: 'Enter valid user ID' });
                return;
            }
            res.json({message: 'Thought added' });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });
    },

//PUT to update a thought by its _id
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new:true}
            )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

//DELETE to remove a thought by its _id
    removeThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
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
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new:true }
        )
            .then((thought) => 
              !thought
                ? res
                  .status(404).json({ message: 'No thought found with this ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));  
},

//DELETE to pull and remove a reaction by reactionId value
    deleteReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId } } },
            { runValidators: true, new: true  }
        )
            .then((thought) =>
              !thought
                ? res.status(404).json({ message: 'No thought found with that ID' })
              : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
},

};

