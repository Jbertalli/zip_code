import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const libraries: string[] = ["places"];
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

export default function NodeMap() {

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
    
      const mapRef = useRef();
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
            <div style={{ position: 'absolute' }}>
                <Button
                    style={{ background: 'blue', color: 'white' }}
                >
                    Antinode
                </Button>
            </div>
            <div style={{ fontWeight: '300', color: 'white', transform: 'translateY(40px)' }}>
                <div style={{ background: 'white', opacity: '0.4' }}>
                    <Divider />
                </div>
                <div style={{ position: 'absolute', transform: 'translate(25vw, 3px)' }}>
                    Current Location
                </div>
                <div style={{ position: 'absolute', transform: 'translate(75vw, 3px)' }}>
                    Antinode Location
                </div>
            </div>
            <Locate panTo={panTo} />
            <div style={{ transform: 'translateY(-299px)' }}>
                <div style={{ position: 'absolute', zIndex: '1000000000', width: '50%', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(364px)' }}>
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
                </div>
            </div>
        </>
    );
}

export function Locate({ panTo }) {

    navigator.geolocation.getCurrentPosition(
        (position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null
      );
  }
