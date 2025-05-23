import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Fade,
  Grow,
} from '@mui/material';

import backgroundImage from '../assets/bg.png'; // local image import

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts?page=${currentPage}`);
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch posts');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    if (!searchQuery.trim()) {
      fetchPosts();
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/search?q=${encodeURIComponent(searchQuery.trim())}`
      );
      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data);
      } else if (response.data && response.data.posts) {
        setPosts(response.data.posts);
      } else {
        setPosts([]);
      }
      setError('');
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search posts. Please try again.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 6, md: 10 },
          px: 2,
          
        }}
      >
        
        <Fade in={true} timeout={1000}>
          <Box sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Hello Innovator! Welcome to Thought Box.
            </Typography>

            <Typography variant="h6" fontWeight={500} color="rgba(255,255,255,0.8)">
              From imagination to innovation - all in one place.
            </Typography>
          </Box>
        </Fade>
      </Box>

      
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: 'white' }}>
        {error && (
          <Fade in={true}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Fade>
        )}
        <Fade in={true} timeout={1500}>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} sm={8}>
                <TextField
                  label="Search Blogs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#333',
                      color: 'white',
                    },
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid xs={12} sm={6} md={4} key={post.id}>
              <Grow in={true} timeout={1000 + index * 200}>
                <Card
                  elevation={2}
                  sx={{
                    height: 200,
                    width: 1200,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      By {post.author_name} | {new Date(post.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      {stripHtml(post.content).substring(0, 150)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/post/${post.id}`}
                      variant="outlined"
                      fullWidth
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#333',
                          color: 'white',
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
