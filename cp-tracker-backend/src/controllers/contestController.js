const Contest = require("../models/contestModel");
const mongoose = require("mongoose");

// Bookmark a contest
const bookmarkContest = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contest ID" });
    }

    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    // Add user to bookmarkedBy array if not already bookmarked
    if (!contest.bookmarkedBy.includes(userId)) {
      contest.bookmarkedBy.push(userId);
      await contest.save();
    }

    res.status(200).json({ message: "Contest bookmarked", contest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add YouTube solution link
const addYouTubeSolution = async (req, res) => {
  try {
    const { ytLink } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contest ID" });
    }

    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    contest.ytSolutions.push(ytLink);
    await contest.save();

    res.status(200).json({ message: "YouTube solution added", contest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contests
const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().sort({ startTime: 1 }); // Sort by start time (upcoming first)
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookmarkContest, addYouTubeSolution, getAllContests };


const createContest = async (req, res) => {
    try {
        const { name, url, platform, startTime, duration } = req.body;
        const contest = new Contest({ name, url, platform, startTime, duration });
        await contest.save();
        res.status(201).json({ message: "Contest created successfully", contest });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { bookmarkContest, addYouTubeSolution, createContest, getAllContests };
