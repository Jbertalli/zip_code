import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY_UPDATE_ZIP = 'UpdateZip';
const LOCAL_STORAGE_KEY_UPDATE_CITY = 'UpdateCity';
const LOCAL_STORAGE_KEY_UPDATE_LATITUDE = 'UpdateLatitude';
const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE = 'UpdateLongitude';
const LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE = 'UpdateAntinodeLatitude';
const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE = 'UpdateAntinodeLongitude';
const LOCAL_STORAGE_KEY_UPDATE_STATE = 'UpdateState';
const LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION = 'UpdateStateAbbreviation';

export default function Database({ latCoord, longCoord, zip, city, state, stateAbbreviation, addZip, addCity, addLat, latitude, addLong, longitude, addState, addStateAbbr, addDocument, deleteZip, addOppLat, OppLat, addOppLong, OppLong, dbId, dbZip, dbCity, dbLatitude, dbLongitude, dbOppositeLatitude, dbOppositeLongitude, dbState, dbStateAbbreviation, deleteCity, deleteLat, deleteLong, deleteOppositeLat, deleteOppositeLong, deleteState, deleteAbbr }) {
    const [updateZip, setUpdateZip] = useState(null);
    const [updateCity, setUpdateCity] = useState(null);
    const [updateLatitude, setUpdateLatitude] = useState(null);
    const [updateLongitude, setUpdateLongitude] = useState(null);
    const [updateAntinodeLatitude, setUpdateAntinodeLatitude] = useState(null);
    const [updateAntinodeLongitude, setUpdateAntinodeLongitude] = useState(null);
    const [updateState, setUpdateState] = useState(null);
    const [updateStateAbbreviation, setUpdateStateAbbreviation] = useState(null);

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

    useEffect(() => {
        const storedUpdateAntinodeLatitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE))
        if (storedUpdateAntinodeLatitude) setUpdateAntinodeLatitude(storedUpdateAntinodeLatitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE, 
        JSON.stringify(updateAntinodeLatitude))
    }, [updateAntinodeLatitude]);

    console.log(updateAntinodeLatitude);

    useEffect(() => {
        const storedUpdateAntinodeLongitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE))
        if (storedUpdateAntinodeLongitude) setUpdateAntinodeLongitude(storedUpdateAntinodeLongitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE, 
        JSON.stringify(updateAntinodeLongitude))
    }, [updateAntinodeLongitude]);

    console.log(updateAntinodeLongitude);

    useEffect(() => {
        const storedUpdateState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_STATE))
        if (storedUpdateState) setUpdateState(storedUpdateState)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_STATE, 
        JSON.stringify(updateState))
    }, [updateState]);

    console.log(updateState);

    useEffect(() => {
        const storedUpdateStateAbbreviation = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION))
        if (storedUpdateStateAbbreviation) setUpdateStateAbbreviation(storedUpdateStateAbbreviation)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION, 
        JSON.stringify(updateStateAbbreviation))
    }, [updateStateAbbreviation]);

    console.log(updateStateAbbreviation);

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
            {updateAntinodeLatitude ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteOppositeLat(OppLat), setUpdateAntinodeLatitude(false)}}>
                        Delete Antinode Latitude
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addOppLat(OppLat), setUpdateAntinodeLatitude(true)}}>
                        Save Antinode Latitude
                    </ListItemButton>
                </ListItem>
            </>
            )}
            {updateAntinodeLongitude ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteOppositeLong(OppLong), setUpdateAntinodeLongitude(false)}}>
                        Delete Antinode Longitude
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addOppLong(OppLong), setUpdateAntinodeLongitude(true)}}>
                        Save Antinode Longitude
                    </ListItemButton>
                </ListItem>
            </>
            )}
            {updateState ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteState(state), setUpdateState(false)}}>
                        Delete State
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addState(state), setUpdateState(true)}}>
                        Save State
                    </ListItemButton>
                </ListItem>
            </>
            )}
            {updateStateAbbreviation ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteAbbr(stateAbbreviation), setUpdateStateAbbreviation(false)}}>
                        Delete State Abbreviation
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addStateAbbr(stateAbbreviation), setUpdateStateAbbreviation(true)}}>
                        Save State Abbreviation
                    </ListItemButton>
                </ListItem>
            </>
            )}


            

            





            
            <ListItem disablePadding>
                <ListItemButton onClick={() => addDocument(zip, city, latCoord, longCoord, OppLat, OppLong, state, stateAbbreviation)}>
                    Save All
                </ListItemButton>
            </ListItem>
        </List>
    );
}
