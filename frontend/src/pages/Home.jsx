import { useEffect, useState } from 'react';
import BlogList from '../components/Blog/BlogList';
import { fetchPosts } from '../utils/api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Categories for demo; will be dynamic in future
    const categories = ["Tech", "Lifestyle", "Education", "Business", "Health", "Travel", "Food"];
    const [selectedCategory, setSelectedCategory] = useState('');

    // Trending logic: top 4 posts by views or latest
    const trendingPosts = posts.slice(0, 4);

    return (
        <div style={{ display: 'flex', gap: '2rem', maxWidth: '1200px', margin: '2rem auto' }}>
            {/* Main Content */}
            <div style={{ flex: 3 }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '2rem', letterSpacing: '1px', color: '#3a3a3a' }}>Featured & Latest Posts</h1>
                {/* Featured post (first post) */}
                {posts.length > 0 && (
                    <div style={{ marginBottom: '2rem', background: 'linear-gradient(90deg,#e0e7ff 0%,#f0f4ff 100%)', borderRadius: '16px', boxShadow: '0 4px 16px rgba(106,17,203,0.10)', padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {posts[0].image && <img src={`http://localhost:5000${posts[0].image}`} alt="Featured" style={{ width: 220, height: 160, borderRadius: '12px', objectFit: 'cover', marginRight: '2rem', boxShadow: '0 2px 8px rgba(106,17,203,0.08)' }} />}
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2575fc' }}>{posts[0].title}</h2>
                            <p style={{ marginBottom: '1rem', color: '#444' }}>{posts[0].content.substring(0, 180)}...</p>
                            <div style={{ color: '#2575fc', fontWeight: 'bold', marginBottom: '0.5rem' }}>By {posts[0].author?.name || 'Unknown'} | {new Date(posts[0].createdAt).toLocaleDateString()}</div>
                            <a href={`/post/${posts[0]._id}`} style={{ background: '#2575fc', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 1px 4px rgba(44,62,80,0.08)' }}>Read More →</a>
                        </div>
                    </div>
                )}
                {/* Blog list for remaining posts */}
                <BlogList posts={selectedCategory ? posts.filter(p => p.category === selectedCategory) : posts.slice(1)} />
            </div>
            {/* Sidebar */}
            <div style={{ flex: 1 }}>
                <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(106,17,203,0.10)', padding: '2rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2575fc' }}>Categories</h2>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {categories.map(cat => (
                            <li key={cat}>
                                <button
                                    style={{ background: selectedCategory === cat ? '#2575fc' : '#e0e7ff', color: selectedCategory === cat ? 'white' : '#2575fc', border: 'none', borderRadius: '16px', padding: '0.5rem 1.2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                                >{cat}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(106,17,203,0.10)', padding: '2rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2575fc' }}>Trending Posts</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {trendingPosts.map(post => (
                            <li key={post._id} style={{ marginBottom: '1rem' }}>
                                <a href={`/post/${post._id}`} style={{ color: '#2575fc', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>{post.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ background: '#f0f4ff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(106,17,203,0.08)', padding: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ color: '#2575fc', marginBottom: '0.5rem' }}>About the Author</h3>
                    <img src="/default-profile.png" alt="Author" style={{ width: 60, height: 60, borderRadius: '50%', marginBottom: '0.5rem', objectFit: 'cover', boxShadow: '0 2px 8px rgba(106,17,203,0.08)' }} />
                    <div style={{ fontWeight: 'bold', color: '#3a3a3a', marginBottom: '0.3rem' }}>Your Name</div>
                    <div style={{ color: '#666', fontSize: '0.95rem' }}>Welcome to our magazine-style blog platform. Share your stories and connect with the community!</div>
                </div>
            </div>
        </div>
    );
};

export default Home;