// Usage: node backfill_profiles.js
// Creates a Profile for every User that does not have one

const mongoose = require('mongoose');
const User = require('./src/models/User');
const Profile = require('./src/models/Profile');

const MONGO_URI = 'mongodb://localhost:27017/blog-platform'; // Change if needed

async function main() {
    await mongoose.connect(MONGO_URI);
    const users = await User.find();
    let createdCount = 0;
    for (const user of users) {
        const existingProfile = await Profile.findOne({ user: user._id });
        if (!existingProfile) {
            const profile = new Profile({
                user: user._id,
                name: user.name || user.email,
                profilePicture: user.profilePic || 'defaultProfilePic.png',
                bio: user.bio || ''
            });
            await profile.save();
            console.log(`Created profile for user ${user._id} (${user.email})`);
            createdCount++;
        }
    }
    console.log(`Backfill complete. Created ${createdCount} new profiles.`);
    await mongoose.disconnect();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
