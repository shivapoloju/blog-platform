import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getPost, updatePost } from '../../utils/api';

const BlogForm = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            getPost(id).then(post => {
                setTitle(post.title);
                setContent(post.content);
                setTags(post.tags.join(', '));
            });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const tagArr = tags.split(',').map(tag => tag.trim()).filter(Boolean);
        const token = localStorage.getItem('token');
        try {
            if (!title || !content) {
                setError('Title and content are required.');
                return;
            }
            const postData = {
                title,
                content,
                tags: tagArr
            };
            if (isEditing) {
                await updatePost(id, postData, token);
            } else {
                await createPost(postData, token);
            }
            history('/');
        } catch (err) {
            console.error('Create/Update Post Error:', err);
            setError(err?.response?.data?.message || 'Failed to create post. Please try again.');
        }
    };


        // Remove fixed background, add padding-top to avoid navbar overlap
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'none',
            }}>
                <div style={{
                    maxWidth: 520,
                    margin: '40px auto 0 auto',
                    background: 'rgba(255,255,255,0.97)',
                    borderRadius: '22px',
                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                    padding: '2.5rem 2.5rem 2rem 2.5rem',
                    border: '1.5px solid #e0e0e0',
                    position: 'relative',
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontWeight: 700,
                        fontSize: '2rem',
                        color: '#6a11cb',
                        letterSpacing: '0.5px',
                        textShadow: '0 2px 8px #fbc2eb33',
                    }}>{isEditing ? 'Edit Post' : 'Create Post'}</h2>
                    {error && (
                        <div style={{ color: '#ff4d4f', background: '#fff0f0', border: '1px solid #ffb3b3', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6a11cb', fontWeight: 600 }}>Title:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1.5px solid #b39ddb', fontSize: '1.1rem', background: '#f7f6fa' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6a11cb', fontWeight: 600 }}>Content:</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1.5px solid #b39ddb', minHeight: '120px', fontSize: '1.1rem', background: '#f7f6fa' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6a11cb', fontWeight: 600 }}>Tags:</label>
                            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1.5px solid #b39ddb', fontSize: '1.1rem', background: '#f7f6fa' }} />
                        </div>
                        {/* Photo upload removed */}
                        <button type="submit" style={{
                            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.9rem',
                            fontWeight: 'bold',
                            fontSize: '1.15rem',
                            marginTop: '0.5rem',
                            boxShadow: '0 2px 8px #b39ddb33',
                            cursor: 'pointer',
                            letterSpacing: '0.5px',
                            transition: 'background 0.2s',
                        }}>{isEditing ? 'Update Post' : 'Create Post'}</button>
                    </form>
                </div>
            </div>
        );
};

export default BlogForm;