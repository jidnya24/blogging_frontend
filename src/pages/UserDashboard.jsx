import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Alert, CircularProgress, Box } from '@mui/material';

const UserDashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserPosts = useCallback(async () => {
    if (!user?.id) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/posts?author=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.posts);
      setLoading(false);
      setError('');
    } catch (err) {
      setError('Failed to fetch your posts');
      setLoading(false);
      console.error('Error fetching posts:', err);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      fetchUserPosts();
    }
  }, [fetchUserPosts, user?.id]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={700}>My Posts</Typography>
        <Button
          component={Link}
          to="/create-post"
          variant="contained"
          size="large"
          sx={{
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#333',
      color: 'white'
    },
  }}
        >
          Create New Post
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      {posts.length === 0 ? (
        <Alert severity="info">
          You haven't created any posts yet. Click "Create New Post" to get started!
        </Alert>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 500 }}>
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/edit-post/${post.id}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

UserDashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserDashboard;
