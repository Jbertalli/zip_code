import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

// const libraries: string[] = ["places"];
const libraries = ["places"];
const mapContainerStyle = {
  height: "95vh",
  width: "100vw",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 40.73,
  lng: -73.93
};

export default function Map({ latCoord, longCoord }) {
  // console.log(latCoord);
  // console.log(longCoord);
  const [transform, setTransform] = useState('translateY(477px)');
  const [top, setTop] = useState('500px');
  const [right, setRight] = useState('120px');
  const [scale, setScale] = useState('scale(1.2) rotate(180deg)');

  useEffect(() => {
    if (window.innerWidth > 440) {
      setTop('500px');
      setRight('120px');
      setScale('scale(1.2) rotate(180deg)');
    } else {
      setTop('475px');
      setRight('11%');
      setScale('scale(0.8) rotate(180deg)');
    }

    const updateMedia = () => {
        if (window.innerWidth > 440) {
          setTop('500px');
          setRight('120px');
          setScale('scale(1.2) rotate(180deg)');
        } else {
          setTop('475px');
          setRight('11%');
          setScale('scale(0.8) rotate(180deg)');
        }
    };
      window.addEventListener('resize', updateMedia);
      return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 440) {
        setTransform('translateY(477px)');
    } else {
        setTransform('translate(10px, 502px) scale(1.07, 1.03)');
    }

    const updateMedia = () => {
      if (window.innerWidth > 440) {
          setTransform('translateY(477px)');
      } else {
          setTransform('translate(10px, 502px) scale(1.07, 1.03)');
      }
    };
      window.addEventListener('resize', updateMedia);
      return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.MAPS_API_KEY,
    libraries,
  });

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
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div style={{ top: `${top}`, right: `${right}`, position: 'absolute', zIndex: '10', transform: `${scale}` }}>
        <Locate panTo={panTo} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', transform: `${transform}` }}>
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
              icon={{
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>
                  Dropped Pin
                </h2>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
}

function Locate({ panTo }) {
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
            icon={
              <MyLocationIcon />
            }
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
              );
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
                    lat: (parseFloat(position.coords.latitude) - (parseFloat(position.coords.latitude) * 2)),
                    lng: (parseFloat(position.coords.longitude) + 180),
                  });
                },
                () => null
              );
            }}
          />
        </SpeedDial>
      </Box>
    </>
  );
}
