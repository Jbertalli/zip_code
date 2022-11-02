import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Database from '../components/Database';
import UI_Buttons from '../components/UI_Buttons';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../components/Header';

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

export default function SideMenu({ zipCode, setZip, setCity, setLatCoord, setLongCoord, setState, setStateAbbreviation, handleClear, latCoord, longCoord, opposite, OppLat, setOppLat, OppLong, setOppLong, zip, city, state, stateAbbreviation, addZip, deleteZip, addCity, deleteCity, addLat, latitude, deleteLat, addLong, longitude, deleteLong, addState, deleteState, addStateAbbr, deleteAbbr, addDocument, deleteAll, addOppLat, addOppLong, deleteOppositeLat, deleteOppositeLong, dbId, dbZip, dbCity, dbLatitude, dbLongitude, dbOppositeLatitude, dbOppositeLongitude, dbState, dbStateAbbreviation, weather, setWeatherData, weatherData, currentTemp, currentTempData, setCurrentTempData, tempRange, tempRangeData, setTempRangeData, addWeather, deleteWeather, addCurrentTemp, deleteCurrentTemp, addTempRange, deleteTempRange }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [top, setTop] = useState('');
  const [width, setWidth] = useState('');
  const [left, setLeft] = useState('');
  const [icon, setIcon] = useState('0px');
  const [side, setSide] = useState('0px');

  useEffect(() => {
    if (window.innerWidth > 440) {
      setIsDesktop(true);
      setTop('');
      setWidth('');
      setLeft('');
      setIcon('0px');
      setSide('0px');
    } else {
      setIsDesktop(false);
      setTop('53px');
      setWidth('48px');
      setLeft('0px');
      setIcon('52px');
      setSide('25px');
    }

    const updateMedia = () => {
        if (window.innerWidth > 440) {
          setIsDesktop(true);
          setTop('');
          setWidth('');
          setLeft('');
          setIcon('0px');
          setSide('0px');
        } else {
          setIsDesktop(false);
          setTop('53px');
          setWidth('48px');
          setLeft('0px');
          setIcon('52px');
          setSide('25px');
        }
    };
      window.addEventListener('resize', updateMedia);
      return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

    // console.log(user?.email);
    // console.log(user.displayName);

    let nameHeader;

    if (user?.displayName == null) {
        nameHeader = `${user?.email}'s`
    } else {
        nameHeader = `${user.displayName}'s`
    }

  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {loading &&
                <div style={{ position: 'absolute', zIndex: '10000', transform: 'scale(0.8) translateY(10px)', top: '5px' }}>
                    <CircularProgress />
                </div>
            }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
              <Header />
          </div>
        </div>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ top: `${top}`, width: `${width}`, left: `${left}`, background: '#313e4c', color: 'white' }}> 
                {!open ? (
                <>
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
                  </Toolbar>
                </>
                ): null}
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
                  {isDesktop ? (
                  <>
                    <div style={{ fontSize: '16px', fontWeight: '400', position: 'absolute', zIndex: '10000000', color: 'white', left: '16px', top: '21px' }}>
                      <span style={{ width: '500px' }}>
                          {user ? (
                          <>
                              {nameHeader}&nbsp;
                          </>
                          ): null} Dashboard
                      </span>
                    </div>
                  </>
                  ): null}
                    <IconButton onClick={handleDrawerClose} style={{ color: 'white', transform: `translateY(${icon})` }}> 
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                    <Divider />
                <div style={{ transform: `translateY(${side})` }}> 
                  {user ? (
                  <>
                      <Database latCoord={latCoord} longCoord={longCoord} zip={zip} city={city} state={state} stateAbbreviation={stateAbbreviation} addZip={addZip} addCity={addCity} addLat={addLat} latitude={latitude} addLong={addLong} longitude={longitude} addState={addState} addStateAbbr={addStateAbbr} addDocument={addDocument} deleteZip={deleteZip} addOppLat={addOppLat} OppLat={OppLat} addOppLong={addOppLong} OppLong={OppLong} dbId={dbId} dbZip={dbZip} dbCity={dbCity} dbLatitude={dbLatitude} dbLongitude={dbLongitude} dbOppositeLatitude={dbOppositeLatitude} dbOppositeLongitude={dbOppositeLongitude} dbState={dbState} dbStateAbbreviation={dbStateAbbreviation} deleteCity={deleteCity} deleteLat={deleteLat} deleteLong={deleteLong} deleteOppositeLat={deleteOppositeLat} deleteOppositeLong={deleteOppositeLong} deleteState={deleteState} deleteAbbr={deleteAbbr} deleteAll={deleteAll} weatherData={weatherData} addWeather={addWeather} deleteWeather={deleteWeather} currentTempData={currentTempData} addCurrentTemp={addCurrentTemp} deleteCurrentTemp={deleteCurrentTemp} tempRangeData={tempRangeData} addTempRange={addTempRange} deleteTempRange={deleteTempRange} />
                      <Divider />
                  </>
                  ): null}
                  <UI_Buttons zipCode={zipCode} setZip={setZip} setCity={setCity} setLatCoord={setLatCoord} setLongCoord={setLongCoord} setState={setState} setStateAbbreviation={setStateAbbreviation} handleClear={handleClear} latCoord={latCoord} longCoord={longCoord} zip={zip} city={city} state={state} stateAbbreviation={stateAbbreviation} opposite={opposite} OppLat={OppLat} OppLong={OppLong} weather={weather} setWeatherData={setWeatherData} weatherData={weatherData} currentTemp={currentTemp} currentTempData={currentTempData} setCurrentTempData={setCurrentTempData} tempRange={tempRange} tempRangeData={tempRangeData} setTempRangeData={setTempRangeData} />
                    <Divider />
                </div>
            </Drawer>
        </Box>
    </>
  );
}
