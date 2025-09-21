import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { incrementView, likePost } from '../../utils/api';

const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndView = async () => {
            try {
                // Increment view count
                await incrementView(id);
                // Fetch post details
                const data = await import('../../utils/api').then(api => api.fetchPostById(id));
                setPost(data);
            } catch (err) {
                setError('Error fetching post details');
            } finally {
                setLoading(false);
            }
        };
        fetchAndView();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container" style={{ maxWidth: 700, margin: '2rem auto' }}>
            <div className="blog-card" style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '2rem' }}>
                {/* Post Image removed */}
                <div className="blog-title" style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{post.title}</div>
                <div className="blog-meta" style={{ color: '#888', marginBottom: '1.5rem' }}>By {post.author?.name || 'Unknown'} | {new Date(post.createdAt).toLocaleDateString()}</div>
                <p style={{
                    margin: '1rem 0',
                    fontSize: '1.15rem',
                    lineHeight: '1.7',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-line',
                }}>{post.content}</p>
                <div style={{ marginBottom: '1rem', color: '#2575fc', fontWeight: 'bold' }}>
                    Tags: {post.tags?.join(', ') || 'None'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '1.5rem' }}>
                    <button
                        onClick={async () => {
                            const token = localStorage.getItem('token');
                            if (!token) return;
                            const res = await likePost(post._id, token);
                            setPost(p => ({ ...p, likes: res.likes }));
                        }}
                        style={{ background: '#fff', color: '#6c63ff', border: '1px solid #6c63ff', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
                        title="Like"
                    >❤</button>
                    <span style={{ color: '#6c63ff', fontWeight: 'bold' }}>{post.likes ? post.likes.length : 0} Likes</span>
                    <span style={{ color: '#888', fontWeight: 'bold' }}>{post.views || 0} Views</span>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;