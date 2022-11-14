const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(removeUser);

// /api/users/friends
router.route('/:id/friends').post(addFriend);

// /api/users/:id/friends/:friendsId
router.route('./:id/friends/:friendsId').delete(removeFriend);

module.exports= router;