const { ObjectId } = require('mongoose').Types; 
const { User, Thought} = require('../models'); 



//Get All users 
module.exports = {
    getUsers(req, res) {
        User.find()
          .then(async (users) => {
            return res.json(users);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
         
    },

//Get a single user by _id 
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .lean()
            .then(async (user) =>
              !user
                ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({ user })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

//Post a new user
    createUser(req, res) {
        User.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

//PUT to update a user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then(async (user) => 
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({ user })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

//DELETE to remove user by _id
    removeUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
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
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.body} },
            { runValidators: true, new: true }
        )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'No user found with that ID' })
              : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
            
    },

//DELETE remove a friend from user's friend list
    removeFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'No user found with this ID' })
              : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};







