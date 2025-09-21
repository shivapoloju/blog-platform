// Usage: node list_users.js
// Prints all users with their _id, name, and email

const mongoose = require('mongoose');
const User = require('./src/models/User');

const MONGO_URI = 'mongodb://localhost:27017/blog-platform'; // Change if needed

async function main() {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const users = await User.find();
    users.forEach(user => {
        console.log(`_id: ${user._id} | name: ${user.name} | email: ${user.email}`);
    });
    await mongoose.disconnect();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
