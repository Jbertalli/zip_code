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
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../components/Header';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase/clientApp';

auth;
const db = getFirestore();

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

export default function SideMenu(values) {

  const {
    zipCode,
    setZip,
    setCity,
    setLatCoord,
    setLongCoord,
    setState,
    setStateAbbreviation,
    handleClear,
    opposite,
    addZip,
    deleteZip,
    addCity,
    deleteCity,
    addLat,
    deleteLat,
    addLong,
    deleteLong,
    addState,
    deleteState,
    addStateAbbr,
    deleteAbbr,
    addDocument,
    deleteAll,
    addOppLat,
    addOppLong,
    deleteOppositeLat,
    deleteOppositeLong,
    weather,
    weatherData,
    setWeatherData,
    currentTemp,
    setCurrentTempData,
    tempRange,
    setTempRangeData,
    addWeather,
    deleteWeather,
    addCurrentTemp,
    deleteCurrentTemp,
    addTempRange,
    deleteTempRange,
  } = values;

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [desktop, setDesktop] = useState<boolean>(true);

  useEffect(() => {
    if (window.innerWidth > 440) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 440) {
        setDesktop(true);
      } else {
        setDesktop(false);
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

  let nameHeader;

  if (user?.displayName == null) {
    nameHeader = `${user?.email}'s`;
  } else {
    nameHeader = `${user.displayName}'s`;
  }

  const [emptyDatabase, setEmptyDatabase] = useState<boolean>(false);

  const currentUser = auth.currentUser?.uid;

  async function getData() {
    const docRef = doc(db, '/users/' + currentUser + 'Data');
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        setEmptyDatabase(true);
        console.log('Document exists');
    } else {
        setEmptyDatabase(false);
        console.log('No document data');
      }
  }

  useEffect(() => {
    if(!!user) {
      getData();
    } else {
      console.log('Cannot get data from user');
    }
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {loading && (
          <div
            style={{
              position: 'absolute',
              zIndex: '10000',
              transform: 'scale(0.8) translateY(10px)',
              top: '5px',
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center' 
        }}
      >
        <div 
          style={{ 
            position: 'absolute', 
            zIndex: '100000', 
            top: '5px', 
            background: '#313e4c', 
            border: '2px solid red',
            width: '100vw'
          }}
        >
          <Header />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{
            top: desktop ? null : '53px',
            width: desktop ? null : '48px',
            left: desktop ? null : '0px',
            background: '#313e4c'
          }}
        >
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
          ) : null}
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: '#313e4c',
              color: 'white',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            {desktop ? (
              <>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    position: 'absolute',
                    zIndex: '10000000',
                    color: 'white',
                    left: '16px',
                    top: '21px',
                  }}
                >
                  <span style={{ width: '500px' }}>
                    {user ? <>{nameHeader}&nbsp;</> : null} Dashboard
                  </span>
                </div>
              </>
            ) : null}
            <IconButton
              onClick={handleDrawerClose}
              style={{ color: 'white', transform: desktop ? 'translateY(1px)' : 'translateY(52px)' }}
            >
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div style={{ transform: desktop ? 'translateY(0px)' : 'translateY(25px)' }}>
            {user ? (
              <>
                <Database
                  addZip={addZip}
                  addCity={addCity}
                  addLat={addLat}
                  addLong={addLong}
                  addState={addState}
                  addStateAbbr={addStateAbbr}
                  addDocument={addDocument}
                  deleteZip={deleteZip}
                  addOppLat={addOppLat}
                  addOppLong={addOppLong}
                  deleteCity={deleteCity}
                  deleteLat={deleteLat}
                  deleteLong={deleteLong}
                  deleteOppositeLat={deleteOppositeLat}
                  deleteOppositeLong={deleteOppositeLong}
                  deleteState={deleteState}
                  deleteAbbr={deleteAbbr}
                  deleteAll={deleteAll}
                  addWeather={addWeather}
                  deleteWeather={deleteWeather}
                  addCurrentTemp={addCurrentTemp}
                  deleteCurrentTemp={deleteCurrentTemp}
                  addTempRange={addTempRange}
                  deleteTempRange={deleteTempRange}
                  emptyDatabase={emptyDatabase}
                  getData={getData}
                />
                <Divider />
              </>
            ) : null}
            <UI_Buttons
              zipCode={zipCode}
              setZip={setZip}
              setCity={setCity}
              setLatCoord={setLatCoord}
              setLongCoord={setLongCoord}
              setState={setState}
              setStateAbbreviation={setStateAbbreviation}
              handleClear={handleClear}
              opposite={opposite}
              weather={weather}
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              currentTemp={currentTemp}
              setCurrentTempData={setCurrentTempData}
              tempRange={tempRange}
              setTempRangeData={setTempRangeData}
            />
            <Divider />
          </div>
        </Drawer>
      </div>
    </>
  );
}
