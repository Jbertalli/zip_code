import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import reverse from 'reverse-geocode';

// const libraries: string[] = ["places"];
const libraries: any = ["places"];
const mapContainerStyle = {
  height: "40.5vh",
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

export default function MobileNodeMap() {
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

    //   if (loadError) return "Error";
    //   if (!isLoaded) return "Loading...";
    if (loadError) return;
    if (!isLoaded) return;
    
    return (
        <>
            <Locate panTo={panTo} />
            <div style={{ transform: 'translateY(-299px)' }}>
                <div style={{ position: 'absolute', zIndex: '1000000000' }}>
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
                                // icon={{
                                //     origin: new window.google.maps.Point(0, 0),
                                //     anchor: new window.google.maps.Point(15, 15),
                                //     scaledSize: new window.google.maps.Size(30, 30),
                                // }}
                            />
                        ))}
                        <Marker
                            position={{ 
                                lat: latitude,
                                lng: longitude
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
      return (
        <></>
      );
  }
