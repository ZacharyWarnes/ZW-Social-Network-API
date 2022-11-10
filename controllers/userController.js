const { User, Thought } = require('../models'); 


//Get All users 
module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));   
    },

//Get a single user by _id populated thought and friend data
    getSingleUser(req,res) {
        User.findOne({_id: req.params.id})
            .populate({
                path: 'thoughts', select: '-__v'
            })
            .populate({
                path: 'friends', select: '-__v'
            })
            .select('-__v')
            .then(user => {
                if(!user) {
                    res.status(400).json({message: 'No user with this ID'});
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
    
}




//DELETE to remove user by _id

//POST add a new friend to user's friend list 
//DELETE remove a friend from user's friend list