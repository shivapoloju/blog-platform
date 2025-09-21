import React, { useEffect, useState } from 'react';
import BlogList from '../components/Blog/BlogList';
import BlogDetail from '../components/Blog/BlogDetail';
import { getPosts } from '../utils/api';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const handlePostSelect = (post) => {
        setSelectedPost(post);
    };

    const handleBackToList = () => {
        setSelectedPost(null);
    };

    return (
        <div>
            {selectedPost ? (
                <BlogDetail post={selectedPost} onBack={handleBackToList} />
            ) : (
                <BlogList posts={posts} onPostSelect={handlePostSelect} />
            )}
        </div>
    );
};

export default Blog;