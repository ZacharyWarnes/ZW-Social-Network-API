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
router.route('/').get(getThoughts).post(createThought).get(getSingleThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').put(updateThought).delete(removeThought);

// /api//thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api//thoughts/:id/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;

