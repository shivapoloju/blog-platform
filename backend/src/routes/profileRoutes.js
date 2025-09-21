const express = require('express');
const { getUserProfile, updateUserProfile, getUserPosts } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, getUserProfile);
router.put('/:userId', authMiddleware, updateUserProfile);
router.get('/:userId/posts', authMiddleware, getUserPosts);

module.exports = router;