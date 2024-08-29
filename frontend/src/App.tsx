import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { AppBar, Toolbar, Typography, Container, Button, TextField, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.unsplash.com/photo-1534134368327-3d2bd764f1ac?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ4OTAxNzd8&ixlib=rb-4.0.3)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
}));

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [aboutInfo, setAboutInfo] = useState('');
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const welcome = await backend.getWelcomeMessage();
      setWelcomeMessage(welcome);

      const about = await backend.getAboutInfo();
      setAboutInfo(about);

      const itemsList = await backend.getItems();
      setItems(itemsList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await backend.submitContactForm(name, email, message);
      if ('ok' in result) {
        alert('Form submitted successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Error submitting form: ' + result.err);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
    setLoading(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Simple Site</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Add this to prevent content from going under the AppBar */}
      
      <HeroSection>
        <Typography variant="h2">{welcomeMessage}</Typography>
      </HeroSection>

      <Container>
        <Section>
          <Typography variant="h4" gutterBottom>About Us</Typography>
          <Typography>{aboutInfo}</Typography>
        </Section>

        <Section>
          <Typography variant="h4" gutterBottom>Our Items</Typography>
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.title}
                  secondary={item.description || 'No description available'}
                />
              </ListItem>
            ))}
          </List>
        </Section>

        <Section>
          <Typography variant="h4" gutterBottom>Contact Us</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </form>
        </Section>
      </Container>
    </div>
  );
}

export default App;
