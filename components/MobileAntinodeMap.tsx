import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import reverse from 'reverse-geocode';

// const libraries: string[] = ["places"];
const libraries: any = ["places"];
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

const API_endpoint: string = process.env.API_ENDPOINT;
const API_key: string = process.env.API_KEY;

export default function MobileAntinodeMap() {
    const [latitude, setLatitude] = useState<number>(null);
    const [longitude, setLongitude] = useState<number>(null);
    const [responseData, setResponseData] = useState<any>({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        })

        //fetch data with axios
        let finalAPIEndPoint: string = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
        axios.get(finalAPIEndPoint)
          .then((response) => {
            setResponseData(response.data);
            // console.log(response.data);
          })
    }, [latitude, longitude])

    let zipCode: any = reverse.lookup(latitude, longitude, 'us');
    // console.log(zipCode.latitude);
    // console.log(zipCode.longitude);
    // console.log(zipCode);

    const latitudeMarker = (parseFloat(zipCode.latitude) - (parseFloat(zipCode.latitude) * 2));
    const longitudeMarker = (parseFloat(zipCode.longitude) + 180);
    // console.log(latitudeMarker);
    // console.log(longitudeMarker);

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

        // if (loadError) return "Error";
        // if (!isLoaded) return "Loading...";
        if (loadError) return;
        if (!isLoaded) return;
    
    return (
        <>
            <MobileAntinodeLocate panTo={panTo} />
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
                                // icon={{
                                //     origin: new window.google.maps.Point(0, 0),
                                //     anchor: new window.google.maps.Point(15, 15),
                                //     scaledSize: new window.google.maps.Size(30, 30),
                                // }}
                            />
                        ))}
                        <Marker
                            position={{ 
                                lat: +latitudeMarker,
                                lng: +longitudeMarker
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

export function MobileAntinodeLocate({ panTo }) {
    navigator.geolocation.getCurrentPosition(
        (position: any) => {
            panTo({
                lat: (parseFloat(position.coords.latitude) - (parseFloat(position.coords.latitude) * 2)),
                lng: (parseFloat(position.coords.longitude) + 180),
            });
        },
        () => null
    );
    return (
        <></>
    );
}
        