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
import Database from '../components/Database';
import Delete from '../components/Delete';
import UI_Buttons from '../components/UI_Buttons';
import GetLocation from '../components/GetLocation';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';

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

export default function SideMenu({ zipCode, setZip, setCity, setLatCoord, setLongCoord, setState, setStateAbbreviation, handleClear, latCoord, longCoord, opposite, clearOpposite, OppLat, OppLong, zip, city, state, stateAbbreviation, addZip, deleteZip, addCity, deleteCity, addLat, latitude, deleteLat, addLong, longitude, deleteLong, addState, deleteState, addStateAbbr, deleteAbbr, addDocument, deleteAll, addOppLat, addOppLong, deleteOppositeLat, deleteOppositeLong }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const auth = getAuth();
  const [user, loading] = useAuthState(getAuth());

  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {loading &&
                <div style={{ position: 'absolute', zIndex: '10000', transform: 'scale(0.8) translateY(10px)', top: '5px' }}>
                    <CircularProgress />
                </div>
            }
        </div>
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
                    <div style={{ fontSize: '25px', fontWeight: '100' }}>
                        <span>
                            {user ? (
                            <>
                                {user.displayName}'s{' '}
                            </>
                            ): null}
                        </span>
                        <span>
                            Dashboard
                        </span>
                    </div>
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
                <GetLocation />
                    <Divider />
                {user ? (
                <>
                    <Database latCoord={latCoord} longCoord={longCoord} zip={zip} city={city} state={state} stateAbbreviation={stateAbbreviation} addZip={addZip} addCity={addCity} addLat={addLat} latitude={latitude} addLong={addLong} longitude={longitude} addState={addState} addStateAbbr={addStateAbbr} addDocument={addDocument} deleteZip={deleteZip} addOppLat={addOppLat} OppLat={OppLat} addOppLong={addOppLong} OppLong={OppLong} />
                        <Divider />
                    <Delete latCoord={latCoord} longCoord={longCoord} zip={zip} city={city} state={state} stateAbbreviation={stateAbbreviation} deleteZip={deleteZip} deleteCity={deleteCity} latitude={latitude} deleteLat={deleteLat} longitude={longitude} deleteLong={deleteLong} deleteState={deleteState} deleteAbbr={deleteAbbr} deleteAll={deleteAll} deleteOppositeLat={deleteOppositeLat} deleteOppositeLong={deleteOppositeLong} OppLat={OppLat} OppLong={OppLong} />
                        <Divider />
                </>
                ):(
                <>
                    &nbsp;
                </>
                )}
                <UI_Buttons zipCode={zipCode} setZip={setZip} setCity={setCity} setLatCoord={setLatCoord} setLongCoord={setLongCoord} setState={setState} setStateAbbreviation={setStateAbbreviation} handleClear={handleClear} latCoord={latCoord} longCoord={longCoord} zip={zip} city={city} state={state} stateAbbreviation={stateAbbreviation} opposite={opposite} OppLat={OppLat} OppLong={OppLong} clearOpposite={clearOpposite} />
                <Divider />
            </Drawer>
        </Box>
    </>
  );
}
