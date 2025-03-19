const express = require('express');
const { bookmarkContest, addYouTubeSolution } = require('../controllers/contestController');
const router = express.Router();

router.post('/:id/bookmark', bookmarkContest);  // API to bookmark contests
router.post('/:id/add-solution', addYouTubeSolution);  // API to add YouTube solutions

module.exports = router;
