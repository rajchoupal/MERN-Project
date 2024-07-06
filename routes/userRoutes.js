const express = require('express');
const router = express.Router();
const { createUser, getUser, updateBio, uploadProfilePicture } = require('../controllers/userController');

router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id/bio', updateBio);
router.put('/:id/profilePicture', uploadProfilePicture);

module.exports = router;
