import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Navbar
            isAuthenticated={isAuthenticated}
            user={user}
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: '100%',
              py: { xs: 2, sm: 4 },
              px: { xs: 2, sm: 0 },
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                  )
                }
              />
              <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
              />
              <Route path="/post/:id" element={<PostDetail user={user} />} />
              <Route
                path="/create-post"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <CreatePost user={user} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-post/:id"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <EditPost user={user} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <UserDashboard user={user} />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
