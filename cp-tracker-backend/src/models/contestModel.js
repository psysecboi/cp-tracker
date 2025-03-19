const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  url: { type: String, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  endTime: { 
    type: Date, 
    default: function() { return new Date(this.startTime.getTime() + this.duration * 60000); } 
  },
  bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
  ytSolutions: [{ type: String }], // Array of YouTube video links
}, { timestamps: true });

const Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
