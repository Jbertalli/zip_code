import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// const libraries: string[] = ["places"];
const libraries = ["places"];
const mapContainerStyle = {
    height: "50vh",
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

export default function MobileAntinodeMap() {

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
          mapRef.current.setZoom(5);
        }, []);

        if (loadError) return "Error";
        if (!isLoaded) return "Loading...";
    
    return (
        <>
            <AntinodeLocate panTo={panTo} />
            <div style={{ transform: 'translateY(-29px)' }}>
                <div style={{ position: 'absolute', zIndex: '1000000000', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(364px)' }}>
                        <div style={{ background: '#313e4c', width: '100%', height: '20px', position: 'absolute', zIndex: '10', borderTop: '.5px solid #FFFFFF90', borderBottom: '.5px solid #FFFFFF90' }} />
                        <div style={{ fontSize: '15px', fontWeight: '300', position: 'absolute', zIndex: '10', width: '50%', display: 'flex', justifyContent: 'center' }}>
                            Antinode Location
                        </div>
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

export function AntinodeLocate({ panTo }) {

    navigator.geolocation.getCurrentPosition(
        (position) => {
            panTo({
                lat: (parseFloat(position.coords.latitude) - (parseFloat(position.coords.latitude) * 2)),
                lng: (parseFloat(position.coords.longitude) + 180),
            });
        },
        () => null
    );
}
        