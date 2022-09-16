import Head from 'next/head';
import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import styles from '../styles/zip.module.css';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import Map from '../components/map';
import NodeMap from '../components/Nodemap';
import AntinodeMap from '../components/Antinodemap';
import Locate from '../components/Nodemap';
import AntinodeLocate from '../components/Antinodemap';

// const libraries: string[] = ["places"];
// const mapContainerStyle = {
//   height: "95vh",
//   width: "100vw",
//     // height: "50vh",
//     // width: "100vw",
// };

// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
// };

// const center = {
//   lat: 40.73,
//   lng: -73.93
// };

export default function Antinode() {

    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: process.env.MAPS_API_KEY,
    //     libraries,
    //   });
    
    //   const [markers, setMarkers] = useState([]);
    //   const [selected, setSelected] = useState(null);
    
    //   const onMapClick = useCallback((e) => {
    //     setMarkers((current) => [
    //       ...current,
    //       {
    //         lat: e.latLng.lat(),
    //         lng: e.latLng.lng(),
    //         time: new Date(),
    //       },
    //     ]);
    //   }, []);
    
    //   const mapRef = useRef();
    //   const onMapLoad = useCallback((map) => {
    //     mapRef.current = map;
    //   }, []);
    
    //   const panTo = useCallback(({ lat, lng }) => {
    //     mapRef.current.panTo({ lat, lng });
    //     mapRef.current.setZoom(14);
    //   }, []);

    //   if (loadError) return "Error";
    //   if (!isLoaded) return "Loading...";
    
    return (
        <>
            <Head>
                <title>Antinode</title>
                <meta name="description" content="antinode" />
            </Head>
            <div style={{ position: 'absolute' }}>
                <Button
                    onClick={() => Locate()}
                    style={{ background: 'blue', color: 'white' }}
                >
                    Antinode
                </Button>
            </div>
            <div>
                <NodeMap />
            </div>
            <div>
                <AntinodeMap />
            </div>
            {/* <div style={{ fontWeight: '300', color: 'white', transform: 'translateY(40px)' }}>
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
            <div style={{ transform: 'translate(100px, 0px)', position: 'absolute', zIndex: '10' }}>
                <Locate panTo={panTo} />
            </div>
            <div style={{ transform: 'translate(300px, 00px)', position: 'absolute', zIndex: '10' }}>
                <AntinodeLocate panTo={panTo} />
            </div>
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
                <div style={{ position: 'absolute', zIndex: '1000000000', width: '50%', height: '100%', transform: 'translate(100%)' }}>
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
            </div> */}
        </>
    );
}

// function Locate({ panTo }) {
//     return (
//       <>
//         <div>
//           <Button
//             className={styles.button}
//             onClick={() => {
//               navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                   panTo({
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                   });
//                 },
//                 () => null
//               );
//             }}
//           > 
//             <LocationOnIcon fontSize="small" />&nbsp;
//             Current Location
//           </Button>
//         </div>
//       </>
//     );
//   }

// function AntinodeLocate({ panTo }) {
//     return (
//         <>
//             <div>
//                 <Button
//                     className={styles.button}
//                     onClick={() => {
//                     navigator.geolocation.getCurrentPosition(
//                         (position) => {
//                         panTo({
//                             lat: (parseFloat(position.coords.latitude) - (parseFloat(position.coords.latitude) * 2)),
//                             lng: (parseFloat(position.coords.longitude) + 180),
//                         });
//                         },
//                         () => null
//                     );
//                     }}
//                 >
//                     <FlipCameraAndroidIcon fontSize="small" />&nbsp;
//                     Opposite Location
//                 </Button>
//             </div>
//         </>
//     );
// }
