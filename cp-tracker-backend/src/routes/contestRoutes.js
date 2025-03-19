const express = require('express');
const { 
    bookmarkContest, 
    addYouTubeSolution, 
    createContest 
} = require('../controllers/contestController');

const router = express.Router();

// Route to create a new contest
router.post('/', createContest);

// Route to bookmark a contest
router.post('/:id/bookmark', bookmarkContest);

// Route to add a YouTube solution link
router.post('/:id/yt-solution', addYouTubeSolution);

module.exports = router;
