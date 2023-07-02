import React, { useState } from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Grid container direction="column" style={{ minHeight: '100vh' }}>
      <Grid item>
        <AppBar position="sticky">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Sticky Header
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h4">Welcome to My Website!</Typography>
            <Typography variant="body1">
              This is some sample main content. Replace it with your own
              content.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <AppBar
          position="static"
          color="primary"
          style={{ top: 'auto', bottom: 0 }}
        >
          <Toolbar>
            <Typography variant="body2" color="inherit" sx={{ flexGrow: 1 }}>
              &copy; 2023 My Website. All rights reserved.
            </Typography>
            <Typography variant="body2" color="inherit">
              Contact: info@mywebsite.com
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {!isMobile && (
        <Grid item>
          <Drawer anchor="left" open={true} variant="persistent">
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Services" />
              </ListItem>
            </List>
          </Drawer>
        </Grid>
      )}
      {isMobile && (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          variant="temporary"
        >
          <List component="nav">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Services" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </Grid>
  );
};

export default App;
