const Contest = require('../models/contestModel');

// Bookmark a contest
const bookmarkContest = async (req, res) => {
  try {
    const { userId } = req.body;
    const contest = await Contest.findById(req.params.id);

    if (!contest) return res.status(404).json({ message: 'Contest not found' });

    if (!contest.bookmarkedBy.includes(userId)) {
      contest.bookmarkedBy.push(userId);
      await contest.save();
    }

    res.status(200).json({ message: 'Contest bookmarked', contest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add YouTube solution link
const addYouTubeSolution = async (req, res) => {
  try {
    const { ytLink } = req.body;
    const contest = await Contest.findById(req.params.id);

    if (!contest) return res.status(404).json({ message: 'Contest not found' });

    contest.ytSolutions.push(ytLink);
    await contest.save();

    res.status(200).json({ message: 'YouTube solution added', contest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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


module.exports = { bookmarkContest, addYouTubeSolution, createContest };
