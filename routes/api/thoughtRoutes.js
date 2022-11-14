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

module.exports = router;

