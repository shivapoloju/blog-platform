import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
  // Save token or user info if needed
  localStorage.setItem('token', response.data.token);
  // Redirect to home page
  navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
  <div style={{ minHeight: '100vh', width: '100vw', overflow: 'auto', background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 420, width: '100%', background: 'rgba(255,255,255,0.97)', borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', padding: '2.5rem 2.5rem 2rem 2.5rem', border: '1.5px solid #e0e0e0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 700, fontSize: '2rem', color: '#6a11cb', letterSpacing: '0.5px', textShadow: '0 2px 8px #fbc2eb33' }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6a11cb', fontWeight: 600 }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1.5px solid #b39ddb', fontSize: '1.1rem', background: '#f7f6fa' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6a11cb', fontWeight: 600 }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1.5px solid #b39ddb', fontSize: '1.1rem', background: '#f7f6fa' }}
            />
          </div>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.9rem', fontWeight: 'bold', fontSize: '1.15rem', marginTop: '0.5rem', boxShadow: '0 2px 8px #b39ddb33', cursor: 'pointer', letterSpacing: '0.5px', transition: 'background 0.2s' }}>
            <span role="img" aria-label="login" style={{ marginRight: 8 }}>🔐</span> Login
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ color: '#888', fontSize: '1.05rem' }}>Don't have an account?</span>
          <Link to="/register" style={{ color: '#6a11cb', fontWeight: 700, marginLeft: 8, textDecoration: 'underline', fontSize: '1.08rem' }}>Register</Link>
        </div>
        {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;