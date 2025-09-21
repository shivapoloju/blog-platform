// Usage: node check_user_posts.js <userId>
// Prints all posts for the given userId

const mongoose = require('mongoose');
const Post = require('./src/models/Post');

const MONGO_URI = 'mongodb://localhost:27017/blog-platform'; // Change if needed

async function main() {
    const userId = process.argv[2];
    if (!userId) {
        console.error('Usage: node check_user_posts.js <userId>');
        process.exit(1);
    }
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const posts = await Post.find({ author: userId });
    console.log(`Found ${posts.length} posts for userId ${userId}`);
    posts.forEach(post => {
        console.log(`- ${post._id}: ${post.title}`);
    });
    await mongoose.disconnect();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
