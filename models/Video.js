const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoPath: { type: String, required: true },
  thumbnail: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
