import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'black',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              thought box.
            </Typography>
            <Typography variant="body2" color="white" paragraph>
              Share your thoughts, ideas, and stories with the world. Join our community of writers and readers.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="white" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="white" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="white" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton color="white" aria-label="Instagram">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="white" underline="none" 
              sx={{
    '&:hover': {
      color: 'gray',
    },
  }}>
                Home
              </Link>
              <Link href="/about" color="white" underline="none"
               sx={{
    '&:hover': {
      color: 'gray',
    },
  }}>
                About Us
              </Link>
              <Link href="/contact" color="white" underline="none" 
               sx={{
    '&:hover': {
      color: 'gray',
    },
  }}>
                Contact
              </Link>
              
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="white" paragraph>
              47 Valley Street
              <br />
              Sebastian Valley, KL 94025
            </Typography>
            <Typography variant="body2" color="white" paragraph>
              Email: thoughtbox@gmail.com
              <br />
              Phone: (222) 898-656
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="white" align="center">
          © {currentYear} Blog Platform. All rights reserved.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mt: 3,
          }}
        >
          <Typography variant="body2" color="white" align="center">
            Connect with us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              aria-label="LinkedIn"
              sx={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              aria-label="Instagram"
              sx={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
