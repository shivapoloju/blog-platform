// Like or unlike a post
exports.toggleLikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        const userId = req.user.id;
        const liked = post.likes.includes(userId);
        if (liked) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        res.status(200).json({ likes: post.likes.length, liked: !liked });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Increment post view count
exports.incrementView = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ views: post.views });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        // If file upload failed, Multer will not set req.file and may throw error before this point
        // But if req.file is expected and missing, return error
        if (req.body.imageRequired && !req.file) {
            return res.status(400).json({ message: 'Image upload failed.' });
        }
        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }
        let tags = [];
        if (req.body.tags) {
            try {
                tags = JSON.parse(req.body.tags);
            } catch (e) {
                tags = Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags];
            }
        }
        // Validate required fields
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            tags,
            image: imagePath,
            author: req.user.id
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        // Only allow author to delete
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this post.' });
        }
        await post.deleteOne();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};