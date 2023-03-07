import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const libraries: any = ['places'];
const mapContainerStyle = {
  height: '95vh',
  width: '100vw',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 40.73,
  lng: -73.93,
};

export default function Map(values) {

  const { 
    latCoord, 
    longCoord, 
    latitude, 
    longitude 
  } = values;

  const [desktop, setDesktop] = useState<boolean>(true);
  const [map, setMap] = useState<boolean>(false);

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries,
  });

  console.log(process.env.NEXT_PUBLIC_MAPS_API_KEY);

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef<any>(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(map ? 5 : 14);
  }, [map]);

  if (loadError) return;
  if (!isLoaded) return;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: '10',
          top: desktop ? '500px' : '475px',
          right: desktop ? '120px' : '11%',
          transform: desktop ? 'scale(1.2) rotate(180deg)' : 'scale(0.8) rotate(180deg)',
        }}
      >
        <Locate panTo={panTo} setMap={setMap} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          transform: desktop ? 'translateY(477px)' : 'translate(10px, 502px) scale(1.07, 1.03)'
        }}
      >
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}
          <Marker
            position={{
              lat: 40.73,
              lng: -73.99,
            }}
          />
          <Marker
            position={{
              lat: latitude,
              lng: longitude,
            }}
          />
          <Marker
            position={{
              lat: parseFloat(latCoord) - parseFloat(latCoord) * 2,
              lng: parseFloat(longCoord) + 180,
            }}
          />
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Dropped Pin</h2>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
}

function Locate({ panTo, setMap }) {
  return (
    <>
      <Box sx={{ height: 120, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            key={'Current Location'}
            icon={<MyLocationIcon />}
            tooltipTitle={'Current Location'}
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                () => null
              ), setMap(true);
            }}
          />
          <SpeedDialAction
            key={'Antinode Location'}
            icon={<FlipCameraAndroidIcon />}
            tooltipTitle={'Antinode Location'}
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position: any) => {
                  panTo({
                    lat:
                      parseFloat(position.coords.latitude) -
                      parseFloat(position.coords.latitude) * 2,
                    lng: parseFloat(position.coords.longitude) + 180,
                  });
                },
                () => null
              ), setMap(false);
            }}
          />
        </SpeedDial>
      </Box>
    </>
  );
}
