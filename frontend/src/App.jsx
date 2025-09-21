import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BlogDetail from './components/Blog/BlogDetail';
import BlogForm from './components/Blog/BlogForm';
import BlogList from './components/Blog/BlogList';
import MyPosts from './components/Profile/MyPosts';
import ProfileView from './components/Profile/ProfileView';
  function AppContent() {
  // const [search, setSearch] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token');

    // const handleSearch = (e) => {
    //   e.preventDefault();
    //   if (search.trim()) {
    //     navigate(`/search/${search.trim()}`);
    //   }
    // };

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    // Redirect to login if not logged in and not on register page
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      return <Navigate to="/login" replace />;
    }

    return (
      <>
        {/* App background gradient */}
        <div style={{
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -2,
          background: 'linear-gradient(180deg, #fbc2eb 0%, #a6c1ee 100%)',
        }} />
        <header className="header" style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 4px 24px 0 rgba(106,17,203,0.10)',
          color: '#6a11cb',
          padding: '1.2rem 2.5rem 1.2rem 2.5rem',
          marginBottom: '2.5rem',
          borderBottom: '1.5px solid #e0e0e0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div style={{ fontWeight: 'bold', fontSize: '2.2rem', letterSpacing: '1.5px', color: '#6a11cb', textShadow: '0 2px 8px #fbc2eb33' }}>
              <Link to="/" style={{ color: '#6a11cb', textDecoration: 'none', fontFamily: 'cursive' }}>Blog Platform</Link>
            </div>
            <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.7rem' }}>
              {isLoggedIn && (
                <Link
                  to="/"
                  style={{
                    background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)',
                    color: '#6a11cb',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    padding: '0.55rem 1.4rem',
                    borderRadius: '24px',
                    boxShadow: '0 2px 8px #a18cd133',
                    letterSpacing: '0.5px',
                    fontSize: '1.08rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🏠</span> Home
                </Link>
              )}
              {/* Removed Create Post from nav */}
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    style={{
                      background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)',
                      color: '#6a11cb',
                      border: 'none',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      padding: '0.55rem 1.4rem',
                      borderRadius: '24px',
                      boxShadow: '0 2px 8px #a18cd133',
                      letterSpacing: '0.5px',
                      fontSize: '1.08rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background 0.2s',
                      marginRight: '0.2rem',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🔐</span> Login
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      background: 'linear-gradient(90deg, #fbc2eb 0%, #a18cd1 100%)',
                      color: '#6a11cb',
                      border: 'none',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      padding: '0.55rem 1.4rem',
                      borderRadius: '24px',
                      boxShadow: '0 2px 8px #a18cd133',
                      letterSpacing: '0.5px',
                      fontSize: '1.08rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>📝</span> Register
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <div style={{ position: 'relative' }}>
                  <button
                    style={{
                      background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)',
                      color: '#6a11cb',
                      border: 'none',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      padding: '0.55rem 1.4rem',
                      borderRadius: '24px',
                      boxShadow: '0 2px 8px #a18cd133',
                      letterSpacing: '0.5px',
                      fontSize: '1.08rem',
                      marginLeft: '0.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background 0.2s',
                    }}
                    onClick={e => {
                      e.preventDefault();
                      setShowProfileDropdown(prev => !prev);
                    }}
                  >
                    <span style={{ marginRight: 8, fontSize: '1.2rem' }}>👤</span> Profile
                  </button>
                  {showProfileDropdown && ReactDOM.createPortal(
                    <div style={{ position: 'fixed', right: '3.5rem', top: '5.2rem', background: 'white', color: '#333', boxShadow: '0 8px 32px rgba(106,17,203,0.18)', borderRadius: '16px', minWidth: '200px', zIndex: 9999, overflow: 'hidden', paddingTop: 0 }}>
                      <Link to="/profile" style={{ display: 'block', padding: '1rem 1.5rem', textDecoration: 'none', color: '#2575fc', fontWeight: 'bold', borderBottom: '1px solid #f0f0f0', background: 'white' }} onClick={() => setShowProfileDropdown(false)}>
                        <span style={{ marginRight: 8 }}>👤</span> My Profile
                      </Link>
                      <Link to="/my-posts" style={{ display: 'block', padding: '1rem 1.5rem', textDecoration: 'none', color: '#2575fc', fontWeight: 'bold', borderBottom: '1px solid #f0f0f0', background: 'white' }} onClick={() => setShowProfileDropdown(false)}>
                        <span style={{ marginRight: 8 }}>📝</span> My Posts
                      </Link>
                      <button onClick={() => { setShowProfileDropdown(false); handleLogout(); }} style={{ display: 'block', width: '100%', padding: '1rem 1.5rem', background: 'white', border: 'none', textAlign: 'left', color: '#ff4d4f', fontWeight: 'bold', cursor: 'pointer' }}>
                        <span style={{ marginRight: 8 }}>🚪</span> Logout
                      </button>
                    </div>,
                    document.body
                  )}
                </div>
              )}
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={isLoggedIn ? <BlogList /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={isLoggedIn ? <BlogForm /> : <Navigate to="/login" replace />} />
          <Route path="/edit/:id" element={isLoggedIn ? <BlogForm /> : <Navigate to="/login" replace />} />
          <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="/my-posts" element={isLoggedIn ? <MyPosts /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isLoggedIn ? <ProfileView /> : <Navigate to="/login" replace />} />
          {/* Add category and search routes here for future expansion */}
        </Routes>
      </>
    );
  }

  function App() {
    return (
      <Router>
        <AppContent />
      </Router>
    );
  }

  export default App;