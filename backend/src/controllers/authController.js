const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { email, password, name, profilePic, bio } = req.body;
    const Profile = require('../models/Profile');

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name, profilePic, bio });
        await newUser.save();

        // Automatically create profile for new user
        const newProfile = new Profile({
            user: newUser._id,
            name: name || email,
            profilePicture: profilePic || 'defaultProfilePic.png',
            bio: bio || ''
        });
        await newProfile.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log('Login attempt:', email, password);
        console.log('User from DB:', user);
        if (!user) {
            console.log('No user found for email:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('Comparing entered password with hash:', user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};
// ...existing code...

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};