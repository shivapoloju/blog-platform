import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../utils/api';

function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [registrationDate, setRegistrationDate] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetchUserProfile();
        setProfile(response.profile);
        setPosts(response.posts);
        setRegistrationDate(response.registrationDate);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      }
    }
    getProfile();
  }, []);

  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Error: {error}</div>;
  if (!profile) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', background: 'rgba(255,255,255,0.97)', borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', padding: '2.5rem 2.5rem 2rem 2.5rem', border: '1.5px solid #e0e0e0', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
          <img src={profile.profilePicture} alt="Profile" style={{ width: 140, height: 140, borderRadius: '50%', marginBottom: '1.2rem', objectFit: 'cover', boxShadow: '0 4px 16px #b39ddb33', border: '4px solid #a6c1ee' }} />
          <h2 style={{ marginBottom: '0.3rem', fontWeight: 700, fontSize: '2rem', color: '#6a11cb', letterSpacing: '0.5px', textShadow: '0 2px 8px #fbc2eb33' }}>{profile.name}</h2>
          <p style={{ color: '#666', marginBottom: '0.7rem', fontSize: '1.1rem', fontStyle: 'italic' }}>{profile.bio}</p>
          {registrationDate && (
            <div style={{ color: '#888', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              Registered on: {new Date(registrationDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <h3
          style={{ marginTop: '2rem', color: '#2575fc', fontWeight: 600, fontSize: '1.25rem', letterSpacing: '0.5px', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 4 }}
          onClick={() => navigate('/my-posts')}
        >
          My Posts
        </h3>
        {posts.length === 0 ? (
          <div style={{ color: '#888', fontSize: '1.1rem', marginTop: '1rem' }}>No posts available</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center', marginTop: '1.2rem' }}>
            {posts.map(post => (
              <div
                key={post._id}
                onClick={() => navigate(`/post/${post._id}`)}
                style={{
                  background: 'linear-gradient(90deg, #a6c1ee 0%, #fbc2eb 100%)',
                  borderRadius: 12,
                  padding: '0.7rem 1.2rem',
                  fontWeight: 600,
                  color: '#6a11cb',
                  fontSize: '1.05rem',
                  boxShadow: '0 2px 8px #b39ddb33',
                  marginBottom: '0.2rem',
                  minWidth: 120,
                  textAlign: 'center',
                  cursor: 'pointer',
                  // Removed underline
                  transition: 'background 0.2s, color 0.2s',
                }}
                title="Read more"
              >
                {post.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileView;