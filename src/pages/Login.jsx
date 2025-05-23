import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Alert, Box, Fade, Grow, useTheme } from '@mui/material';


const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      setUser(user);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Grow in={true} timeout={1000}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Fade in={true} timeout={1500}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
             
              <Typography variant="h4" gutterBottom fontWeight={700} color="black">
                Welcome to Thought Box!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to continue 
              </Typography>
            </Box>
          </Fade>
          {error && (
            <Fade in={true}>
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
            </Fade>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Fade in={true} timeout={2000}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="email"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Fade>
            <Fade in={true} timeout={2500}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="current-password"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Fade>
            <Fade in={true} timeout={3000}>
              <Button
                type="submit"
                variant="contained"
                color="black"
                fullWidth
                size="large"
                sx={{ 
                  backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#333',
      color: 'white'},
                  py: 1.5, 
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Sign In
              </Button>
            </Fade>
            <Fade in={true} timeout={3500}>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="black">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    style={{ 
                      textDecoration: 'none', 
                      color: 'black',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Create one
                  </Link>
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};

export default Login;
