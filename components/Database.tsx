import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY_UPDATE_ZIP = 'UpdateZip';
const LOCAL_STORAGE_KEY_UPDATE_CITY = 'UpdateCity';
const LOCAL_STORAGE_KEY_UPDATE_LATITUDE = 'UpdateLatitude';
const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE = 'UpdateLongitude';

export default function Database({ latCoord, longCoord, zip, city, state, stateAbbreviation, addZip, addCity, addLat, latitude, addLong, longitude, addState, addStateAbbr, addDocument, deleteZip, addOppLat, OppLat, addOppLong, OppLong, dbId, dbZip, dbCity, dbLatitude, dbLongitude, dbOppositeLatitude, dbOppositeLongitude, dbState, dbStateAbbreviation, deleteCity, deleteLat, deleteLong }) {
    const [updateZip, setUpdateZip] = useState(null);
    const [updateCity, setUpdateCity] = useState(null);
    const [updateLatitude, setUpdateLatitude] = useState(null);
    const [updateLongitude, setUpdateLongitude] = useState(null);

    console.log(dbId);
    console.log(dbZip);
    console.log(dbCity);
    console.log(dbLatitude);
    console.log(dbLongitude);
    console.log(dbOppositeLatitude);
    console.log(dbOppositeLongitude);
    console.log(dbState);
    console.log(dbStateAbbreviation);

    useEffect(() => {
        const storedUpdateZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_ZIP))
        if (storedUpdateZip) setUpdateZip(storedUpdateZip)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_ZIP, 
        JSON.stringify(updateZip))
    }, [updateZip]);

    console.log(updateZip);

    useEffect(() => {
        const storedUpdateCity = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_CITY))
        if (storedUpdateCity) setUpdateCity(storedUpdateCity)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_CITY, 
        JSON.stringify(updateCity))
    }, [updateCity]);

    console.log(updateCity);

    useEffect(() => {
        const storedUpdateLatitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE))
        if (storedUpdateLatitude) setUpdateLatitude(storedUpdateLatitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE, 
        JSON.stringify(updateLatitude))
    }, [updateLatitude]);

    console.log(updateLatitude);

    useEffect(() => {
        const storedUpdateLongitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE))
        if (storedUpdateLongitude) setUpdateLongitude(storedUpdateLongitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE, 
        JSON.stringify(updateLongitude))
    }, [updateLongitude]);

    console.log(updateLongitude);

    return (
        <List>
            {/* {!!dbZip ? ( */}
            {updateZip ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteZip(zip), setUpdateZip(false)}}>
                        Delete Zip
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addZip(zip), setUpdateZip(true)}}>
                        Save Zip
                    </ListItemButton>
                </ListItem>
            </>
            )}
            {updateCity ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteCity(city), setUpdateCity(false)}}>
                        Delete City
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addCity(city), setUpdateCity(true)}}>
                        Save City
                    </ListItemButton>
                </ListItem>
            </>
            )}
            {updateLatitude ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteLat(latitude), setUpdateLatitude(false)}}>
                        Delete Latitude
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addLat(latitude), setUpdateLatitude(true)}}>
                        Save Latitude
                    </ListItemButton>
                </ListItem>
            </>
            )}
            {updateLongitude ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteLong(longitude), setUpdateLongitude(false)}}>
                        Delete Longitude
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addLong(longitude), setUpdateLongitude(true)}}>
                        Save Longitude
                    </ListItemButton>
                </ListItem>
            </>
            )}

            


            






            <ListItem disablePadding>
                <ListItemButton onClick={() => addOppLat(OppLat)}>
                    Save Antinode Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addOppLong(OppLong)}>
                    Save Antinode Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addState(state)}>
                    Save State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addStateAbbr(stateAbbreviation)}>
                    Save State Abbreviation
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addDocument(zip, city, latCoord, longCoord, OppLat, OppLong, state, stateAbbreviation)}>
                    Save All
                </ListItemButton>
            </ListItem>
        </List>
    );
}
