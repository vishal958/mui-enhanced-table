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
    <Grid container>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        <Drawer
          anchor="left"
          open={isMobile && isDrawerOpen}
          onClose={toggleDrawer}
          variant={isMobile ? 'temporary' : 'persistent'}
        >
          <List component="nav">
            <ListItem button>
              <ListItemText primary="Homae" />
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
      <Grid item xs={10} sx={{ marginLeft: 'auto', paddingTop: '64px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">Welcome to My Website!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              This is some sample main content. Replace it with your own
              content.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
