const express = require("express");
const { 
    bookmarkContest, 
    addYouTubeSolution, 
    getAllContests 
} = require("../controllers/contestController");

const router = express.Router();

// Route to create a new contest
router.post('/', createContest);

// Route to bookmark a contest
router.post("/:id/bookmark", bookmarkContest);

// Route to add a YouTube solution link
router.post("/:id/yt-solution", addYouTubeSolution);

// Route to get all contests
router.get("/", getAllContests);

module.exports = router;
