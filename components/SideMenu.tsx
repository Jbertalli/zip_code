import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TagIcon from '@mui/icons-material/Tag';
import HeightIcon from '@mui/icons-material/Height';
import PlaceIcon from '@mui/icons-material/Place';
import ClearIcon from '@mui/icons-material/Clear';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SideMenu({ zipCode, setZip, setCity, setLatCoord, setLongCoord, setState, setStateAbbreviation, handleClear, latCoord, longCoord, opposite, clearOpposite, OppLat, OppLong, zip, city, state, stateAbbreviation, addZip, deleteZip, addCity, deleteCity, addLat, latitude, deleteLat, addLong, longitude, deleteLong, addState, deleteState, addStateAbbr }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: '#313e4c', color: 'white' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#313e4c',
            color: 'white'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List>
          {['DB Zip', 'DB City', 'DB Latitude', 'DB Longitude', 'DB State', 'DB State Abbreviation', 'DB All'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addZip(zip)} style={{ background: 'blue' }}>
                    DB Zip
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addCity(city)} style={{ background: 'blue' }}>
                    DB City
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addLat(latitude)} style={{ background: 'blue' }}>
                    DB Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addLong(longitude)} style={{ background: 'blue' }}>
                    DB Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addState(state)} style={{ background: 'blue' }}>
                    DB State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addStateAbbr(stateAbbreviation)} style={{ background: 'blue' }}>
                    DB State Abbreviation
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    DB All
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteZip(zip)} style={{ background: 'blue' }}>
                    Delete Zip
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteCity(city)} style={{ background: 'blue' }}>
                    Delete City
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteLat(latitude)} style={{ background: 'blue' }}>
                    Delete Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteLong(longitude)} style={{ background: 'blue' }}>
                    Delete Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteState(state)} style={{ background: 'blue' }}>
                    Delete State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    Delete State Abbreviation
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    Delete All
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setZip(zipCode.zipcode)} style={{ background: 'blue' }}>
                    <TagIcon fontSize="small" />&nbsp;
                    Zip
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setCity(zipCode.city)} style={{ background: 'blue' }}>
                    <LocationCityIcon fontSize="small" />&nbsp;
                    City
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setLatCoord(zipCode.latitude)} style={{ background: 'blue' }}>
                    <HeightIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
                    Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setLongCoord(zipCode.longitude)} style={{ background: 'blue' }}>
                    <HeightIcon fontSize="small" />&nbsp;
                    Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setState(zipCode.state)} style={{ background: 'blue' }}>
                    <PlaceIcon fontSize="small" />&nbsp;
                    State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setStateAbbreviation(zipCode.state_abbr)} style={{ background: 'blue' }}>
                    <PlaceIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                    State Abbreviation
                </ListItemButton>
            </ListItem>
            {(zip && city && latCoord && longCoord && state && stateAbbreviation) ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClear()} style={{ background: 'blue' }}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Clear All
                        </ListItemButton>
                    </ListItem>
                </>
            ): null}
        </List>
        <Divider />
        <List>
            {(latCoord && longCoord) ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={opposite} style={{ background: 'blue' }}>
                        Opposite
                    </ListItemButton>
                </ListItem>
                {(OppLat && OppLong) ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={clearOpposite} style={{ background: 'blue' }}>
                            Clear Opposite
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    &nbsp;
                </>
                )}
            </>
            ):(
            <>
                &nbsp;
            </>
            )}
        </List>
      </Drawer>
    </Box>
  );
}
