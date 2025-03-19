const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  url: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who bookmarked
  ytSolutions: [{ type: String }], // Array of YouTube video links
  duration: { type: Number } // Duration in minutes
}, { timestamps: true });

const Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
