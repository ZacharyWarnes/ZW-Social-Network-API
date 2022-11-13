const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(removeThought);

// /api/thoughts/:userId
router.route('/:userId').post(createThought);

// /api/:id/reactions
router.route('/:id/reactions').post(createReaction);

// /api/:id/reactions/reactionsId
router.route('/:id/reactions/reactionsId').delete(deleteReaction);

//GET all thoughts
//GET a single thought by _id
//POST to create a new thought and push to user's thoughts array field
//PUT to update a thought by its _id
//DELETE to remove a thought by its _id

//POST to create a reaction stored in a single thought's reactions array field
//DELETE to pull and remove a reaction by reactionId value