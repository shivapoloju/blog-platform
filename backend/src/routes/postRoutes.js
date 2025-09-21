const express = require('express');
const multer = require('multer');
const path = require('path');
const { createPost, getPosts, getPostById, updatePost, deletePost, toggleLikePost, incrementView } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Multer setup for image uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Save to top-level uploads folder
		cb(null, path.join(__dirname, '../../../uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

const router = express.Router();


// Post CRUD
router.post('/', authMiddleware, upload.single('image'), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

// Like/unlike post
router.post('/:id/like', authMiddleware, toggleLikePost);

// Increment view count
router.post('/:id/view', incrementView);

module.exports = router;