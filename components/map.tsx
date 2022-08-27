// import React, { useState, useCallback } from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '70vw',
//   height: '70vh'
// };

// const center = {
//   lat: 43.0481,
//   lng: -73.1474
// };

// function MyComponent({ latCoord, longCoord }) {

//   console.log(latCoord);
//   console.log(longCoord);

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyBEQ-ARtxsdwKqfkMjCxo4RF4YN3k1xP5g'
//   })

//   const [map, setMap] = useState(null);

//   const onLoad = useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);
//     setMap(map)
//   }, [])

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={15}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <>
        
//         </>
//       </GoogleMap>
//     ) : <>
    
//         </>
// }

// export default React.memo(MyComponent)





// import React, { useState, useEffect } from "react";
// import GoogleMapReact from 'google-map-react';
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function Map({ latCoord, longCoord }){

//   console.log(latCoord);
//   console.log(longCoord);

//   const defaultProps = {
//     center: {
//       lat: 40.73,
//       lng: -73.93
//     },
//     zoom: 10
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyBEQ-ARtxsdwKqfkMjCxo4RF4YN3k1xP5g" }}
//         defaultCenter={defaultProps.center}
//         // center={}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent
//           lat={43.0481}
//           lng={-73.1474}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }



import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styles from '../styles/zip.module.css';

const libraries = ["places"];
const mapContainerStyle = {
  height: "80vh",
  width: "80vw",
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

  console.log(latCoord);
  console.log(longCoord);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEQ-ARtxsdwKqfkMjCxo4RF4YN3k1xP5g",
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
    <Container maxWidth="xl" style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
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
    </Container>
  );
}

function Locate({ panTo }) {
  return (
    <Button
      variant="contained"
      className={styles.button}
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
    >
      Location
    </Button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 40.73, lng: () => -73.93 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
