import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost, fetchUserProfile } from '../../utils/api';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetchUserProfile();
        console.log('Fetched profile response:', response);
        if (response && Array.isArray(response.posts) && response.posts.length > 0) {
          setPosts(response.posts);
        } else if (response && response.posts && Array.isArray(response.posts) && response.posts.length === 0) {
          setPosts([]);
          setError('No posts found for this user.');
        } else {
          setPosts([]);
          setError('Unexpected response from server.');
        }
      } catch (err) {
        // If 404, treat as no posts available
        if (err.response && err.response.status === 404) {
          setPosts([]);
          setError('No posts found (404).');
        } else {
          setError(err.message || 'Failed to load posts');
        }
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  const openModal = (postId) => {
    setDeleteId(postId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem('token');
    await deletePost(deleteId, token);
    setPosts(posts.filter(p => p._id !== deleteId));
    closeModal();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', padding: '2rem 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: 'rgba(255,255,255,0.97)', borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', padding: '2.5rem 2.5rem 2rem 2.5rem', border: '1.5px solid #e0e0e0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 700, fontSize: '2rem', color: '#6a11cb', letterSpacing: '0.5px', textShadow: '0 2px 8px #fbc2eb33' }}>My Posts</h2>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>No posts available</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {posts.map(post => (
              <div key={post._id} style={{ background: 'linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)', borderRadius: 16, boxShadow: '0 4px 16px #b39ddb33', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 180, position: 'relative' }}>
                <div
                  style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.7rem', color: '#6a11cb', textShadow: '0 1px 4px #fff6', cursor: 'pointer' }}
                  onClick={() => navigate(`/post/${post._id}`)}
                  title="Read more"
                >
                  {post.title}
                </div>
                <div style={{ color: '#444', marginBottom: '0.7rem', fontSize: '1.05rem', minHeight: 60 }}>{post.content.substring(0, 100)}...</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', gap: '1rem' }}>
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    style={{ background: 'linear-gradient(90deg, #a6c1ee 0%, #fbc2eb 100%)', color: '#333', border: 'none', borderRadius: '24px', padding: '0.5rem 1.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #b39ddb33', letterSpacing: '0.5px', transition: 'background 0.2s' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal(post._id)}
                    style={{ background: 'linear-gradient(90deg, #ff4d4f 0%, #ffb199 100%)', color: 'white', border: 'none', borderRadius: '24px', padding: '0.5rem 1.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #ffb19933', letterSpacing: '0.5px', transition: 'background 0.2s' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for delete confirmation */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '2rem 2.5rem', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', minWidth: 320, textAlign: 'center' }}>
            <h3 style={{ color: '#ff4d4f', marginBottom: '1.2rem' }}>Confirm Delete</h3>
            <p style={{ color: '#444', marginBottom: '2rem' }}>Are you sure you want to delete this post? This action cannot be undone.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <button onClick={closeModal} style={{ background: 'linear-gradient(90deg, #a6c1ee 0%, #fbc2eb 100%)', color: '#333', border: 'none', borderRadius: '24px', padding: '0.5rem 1.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #b39ddb33', letterSpacing: '0.5px' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ background: 'linear-gradient(90deg, #ff4d4f 0%, #ffb199 100%)', color: 'white', border: 'none', borderRadius: '24px', padding: '0.5rem 1.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #ffb19933', letterSpacing: '0.5px' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
