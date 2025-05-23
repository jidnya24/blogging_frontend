import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Alert, Snackbar, Paper } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('All fields are required');
      setOpenSnackbar(true);
      return false;
    }
    if (!/^[a-zA-Z0-9_\s]{3,30}$/.test(formData.username.trim())) {
      setError('Username must be 3-30 characters long and can only contain letters, numbers, underscores, and spaces');
      setOpenSnackbar(true);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      setOpenSnackbar(true);
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setOpenSnackbar(true);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await axios.post('http://localhost:5000/api/auth/register', {
        ...registerData,
        username: registerData.username.trim(),
        email: registerData.email.trim()
      });
      setError('Registration successful! Redirecting to login...');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <PersonAddIcon sx={{ fontSize: 48, color: 'black', mb: 2 }} />
          <Typography variant="h4" fontWeight={700} color="black" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover a space for writers and readers to unite!
          </Typography>
        </Box>

        {error && (
          <Alert severity={error.includes('successful') ? 'success' : 'error'} sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
            autoFocus
            autoComplete="username"
            sx={{ mb: 3, borderRadius: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="email"
            sx={{ mb: 3, borderRadius: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="new-password"
            sx={{ mb: 3, borderRadius: 2 }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="new-password"
            error={Boolean(formData.confirmPassword && formData.password !== formData.confirmPassword)}
            helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords must match.' : ''}
            sx={{ mb: 3, borderRadius: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': { backgroundColor: '#333' },
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: 'black', fontWeight: 600 }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={error.includes('successful') ? 'success' : 'error'} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
