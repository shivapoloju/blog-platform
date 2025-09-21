const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

// Fetch user profile details
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Authenticated user from JWT
        console.log('ProfileController: getUserProfile userId:', userId);
    const profile = await Profile.findOne({ user: userId }).populate('user', 'email name profilePicture createdAt');
        const posts = await Post.find({ author: userId });
        console.log('ProfileController: found profile:', profile);
        console.log('ProfileController: found posts:', posts);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Add registration date from user.createdAt
        let registrationDate = null;
        if (profile && profile.user && profile.user.createdAt) {
            registrationDate = profile.user.createdAt;
        }
        res.status(200).json({ profile, posts, registrationDate });
    } catch (error) {
        console.error('ProfileController: getUserProfile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, profilePicture, bio } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { user: userId },
            { name, profilePicture, bio },
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all posts by userId (for /:userId/posts route)
exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ author: userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};