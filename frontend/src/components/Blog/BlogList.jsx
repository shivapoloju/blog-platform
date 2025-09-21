
import axios from 'axios';
import { useEffect, useState } from 'react';
import { likePost } from '../../utils/api';

const API_URL = 'http://localhost:5000/api/posts';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(API_URL);
                setPosts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
        // Fetch logged-in user profile
        import('../../utils/api').then(api => {
            api.fetchUserProfile().then(profile => {
                let name = '';
                if (profile) {
                    if (profile.profile && profile.profile.name) {
                        name = profile.profile.name;
                    } else if (profile.name) {
                        name = profile.name;
                    } else if (profile.user && profile.user.name) {
                        name = profile.user.name;
                    } else if (profile.user && profile.user.username) {
                        name = profile.user.username;
                    } else if (profile.user && profile.user.email) {
                        name = profile.user.email.split('@')[0];
                    }
                }
                setUserName(name || 'User');
                setUserId((profile.user && profile.user._id) || (profile.profile && profile.profile.user) || '');
            }).catch(() => {
                setUserName('User');
                setUserId('');
            });
        });
    }, []);

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;

    return (
        <div className="blog-main-layout" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            maxWidth: '900px',
            margin: '2.5rem auto',
            boxShadow: '0 12px 48px 0 rgba(106,17,203,0.10)',
            padding: '2.5rem 2rem',
            position: 'relative',
            zIndex: 1,
        }}>
            {/* Community Stats at the top */}
            <div
                style={{
                    background: '#fff',
                    color: '#3a3a3a',
                    borderRadius: '18px',
                    padding: '2.2rem 2.5rem',
                    boxShadow: '0 8px 32px #b39ddb33',
                    marginBottom: '2.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    textAlign: 'center',
                }}
            >
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#6a11cb', margin: 0, marginBottom: '1.2rem', letterSpacing: '0.5px', textShadow: '0 2px 8px #fbc2eb33' }}>
                    Community Stats
                </h2>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2.5rem' }}>
                    <div><span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6c63ff' }}>{posts.length}</span><br/>Posts</div>
                    <div><span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#fbc2eb' }}>{posts.reduce((acc, p) => acc + (p.views || 0), 0)}</span><br/>Views</div>
                    <div><span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#a18cd1' }}>{[...new Set(posts.map(p => p.author?.name || 'Unknown'))].length}</span><br/>Authors</div>
                </div>
            </div>

            {/* Welcome Card */}
            <div style={{
                background: 'linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)',
                color: '#fff',
                borderRadius: 28,
                padding: '2.5rem 2.5rem 2.2rem 2.5rem',
                marginBottom: '2.2rem',
                boxShadow: '0 8px 32px #a18cd155',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '1.35rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ marginBottom: '1.2rem', fontSize: '1.7rem', fontWeight: 700, textShadow: '0 2px 8px #fff6' }}>👋 Welcome back, {userName}!</div>
                <div style={{ marginBottom: '1.7rem', fontWeight: 400, fontSize: '1.13rem', color: '#f3e8ff', textShadow: '0 1px 4px #6a11cb33' }}>Ready to share your next big idea with the community?</div>
                <a href="/create" style={{ background: 'white', color: '#6a11cb', border: 'none', borderRadius: 12, padding: '0.85rem 2.2rem', fontWeight: 'bold', fontSize: '1.13rem', cursor: 'pointer', boxShadow: '0 4px 16px #fbc2eb44', transition: 'background 0.2s', marginTop: '0.5rem', letterSpacing: '0.5px', textDecoration: 'none', display: 'inline-block' }}>+ Write New Post</a>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 28, boxShadow: '0 8px 32px #a18cd122', pointerEvents: 'none' }} />
            </div>

            {/* Posts Section */}
            <div style={{ width: '100%' }}>
                <h1 style={{ fontSize: '2.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#3a3a3a', textShadow: '0 2px 8px #fbc2eb33' }}>Latest Posts</h1>
                {/* Search Bar */}
                <div style={{ marginBottom: '1.2rem', width: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search posts, authors, or tags..."
                        style={{
                            width: '99%',
                            boxSizing: 'border-box',
                            padding: '0.7rem 1rem',
                            borderRadius: 24,
                            border: '1.2px solid #e0e0e0',
                            fontSize: '1rem',
                            boxShadow: '0 2px 8px #b39ddb22',
                            outline: 'none',
                            background: 'rgba(255,255,255,0.97)',
                            transition: 'box-shadow 0.2s',
                        }}
                    />
                </div>
                {/* Post Cards */}
                {posts.map(post => (
                    <div key={post._id} style={{
                        background: 'rgba(255,255,255,0.97)',
                        borderRadius: '18px',
                        boxShadow: '0 8px 32px #b39ddb33',
                        padding: '2rem 2.2rem',
                        marginBottom: '2.2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1.5px solid #e0e0e0',
                        transition: 'box-shadow 0.2s',
                    }}>
                        {/* Post Image removed */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <div style={{ background: '#6c63ff', color: 'white', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', marginRight: '1rem' }}>
                                {post.author?.name ? post.author.name[0].toUpperCase() : 'U'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: '#3a3a3a' }}>{post.author?.name || 'Unknown'}</div>
                                <div style={{ fontSize: '0.95rem', color: '#888' }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0 0.5rem 0', color: '#222' }}>{post.title}</div>
                        <div style={{
                            fontSize: '1rem',
                            color: '#444',
                            marginBottom: '1rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '3.6em',
                        }}>{post.content}</div>
                        <div style={{ marginBottom: '1rem' }}>
                            {post.tags && post.tags.map((tag, idx) => (
                                <span key={idx} style={{ background: '#f1f3f6', color: '#6c63ff', borderRadius: '16px', padding: '0.3rem 0.9rem', fontSize: '0.95rem', marginRight: '0.5rem', fontWeight: 'bold', border: '1px solid #e0e0e0' }}>#{tag}</span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                <button
                                    onClick={async () => {
                                        const token = localStorage.getItem('token');
                                        if (!token) return;
                                        const res = await likePost(post._id, token);
                                        setPosts(posts => posts.map(p => p._id === post._id ? { ...p, likes: res.likes } : p));
                                    }}
                                    style={{ background: '#fff', color: '#6c63ff', border: '1px solid #6c63ff', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
                                    title="Like"
                                >❤</button>
                                <span style={{ color: '#6c63ff', fontWeight: 'bold' }}>{post.likes ? post.likes.length : 0} Likes</span>
                                <span style={{ color: '#888', fontWeight: 'bold' }}>{post.views || 0} Views</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a href={`/post/${post._id}`} style={{ background: '#6c63ff', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 1px 4px rgba(44,62,80,0.08)' }}>Read More →</a>
                                {post.author?._id === userId && (
                                    <button
                                        onClick={async () => {
                                            const token = localStorage.getItem('token');
                                            await import('../../utils/api').then(api => api.deletePost(post._id, token));
                                            setPosts(posts.filter(p => p._id !== post._id));
                                        }}
                                        style={{ background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '24px', padding: '0.5rem 1.2rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    >Delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;