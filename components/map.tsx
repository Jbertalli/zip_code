import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import styles from '../styles/zip.module.css';

const libraries: string[] = ["places"];
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

export default function Map({ latCoord, longCoord }): any {

//   console.log(latCoord);
//   console.log(longCoord);

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
    <Container maxWidth="xl" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%' }}>
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

function Locate({ panTo }): any {
  return (
    <>
      <div>
        <Button
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
          <LocationOnIcon fontSize="small" />&nbsp;
          Current Location
        </Button>
      </div>
      {/* (parseFloat(position.coords.latitude) - (parseFloat(position.coords.latitude) * 2))
      (parseFloat(position.coords.longitude) + 180) */}
      <div>
        <Button
          className={styles.button}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: (parseFloat(position.coords.latitude) - (parseFloat(position.coords.latitude) * 2)),
                  lng: (parseFloat(position.coords.longitude) + 180),
                });
              },
              () => null
            );
          }}
        >
          <FlipCameraAndroidIcon fontSize="small" />&nbsp;
          Opposite Location
        </Button>
      </div>
    </>
  );
}

function Search({ panTo }): any {
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

  const handleInput = (e): void => {
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
