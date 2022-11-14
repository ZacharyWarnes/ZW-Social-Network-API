const { User, Thought} = require('../models'); 


//Get All users 
module.exports = {
    getUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .select('-__v')
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })   
    },

//Get a single user by _id 
    getSingleUser(req,res) {
        User.findOne({_id: req.params.id})
            .then(user => {
                if(!user) {
                    res.status(400).json({message: 'No User Found with this ID'});
                    return;
                };
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

//Post a new user
    createUser(req,res) {
        User.create(req.body)
        .then(user => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

//PUT to update a user by _id
    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true, runValidators: true}
        )
        .then(user => {
            if(!user) {
                res.status(400).json({message: 'no user with this ID'});
                return;
            }
            res.json(user);
        })
        .catch(err => res.status(500).json(err));
    },

//DELETE to remove user by _id
    removeUser(req,res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            if(!user) {
                res.status(400).json({message: 'No user with that ID'});
                return;
            };
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

//POST add a new friend to user's friend list 
    addFriend(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new: true}
        )
            .then(user => {
                if(!user) {
                    res.status(400).json({message: 'No user with that ID'});
                    return;
                };
                res.json(user);
            })
            .catch(err => {
                res.status(500).json(err);
            })
            
    },

//DELETE remove a friend from user's friend list
    removeFriend(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendsId}},
            {runValidators: true, new: true}
        )
            .then(user => {
                if(!user) {
                    res.status(400).json({message: 'No user with that ID'});
                    return;
                };
                res.json(user);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
};







