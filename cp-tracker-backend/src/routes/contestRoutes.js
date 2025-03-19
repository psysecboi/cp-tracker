const express = require("express");
const { 
    bookmarkContest, 
    addYouTubeSolution, 
    getAllContests,
    createContest, 
    syncContests 
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

// Route to sync contests from external sources (e.g., Codeforces)
router.get("/sync", syncContests);


module.exports = router;
