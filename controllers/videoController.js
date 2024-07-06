const Video = require('../models/Video');
const User = require('../models/User');

exports.uploadVideo = async (req, res) => {
  const { userId, title, description } = req.body;
  const videoPath = req.file.path;
  const thumbnail = 'default_thumbnail_path'; // Update this with actual thumbnail generation logic

  console.log('Upload Video Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  try {
    const video = new Video({ userId, title, description, videoPath, thumbnail });
    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.userId });
    res.json(videos);
  } catch (error) {
    console.error('Error getting user videos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('firstName lastName');
    res.json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
