const express = require('express');
const router = express.Router();
const { uploadVideo, getUserVideos, getAllUsers } = require('../controllers/videoController');

router.post('/', uploadVideo);
router.get('/:userId', getUserVideos);
router.get('/', getAllUsers);

module.exports = router;
