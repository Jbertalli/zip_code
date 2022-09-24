import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TagIcon from '@mui/icons-material/Tag';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PlaceIcon from '@mui/icons-material/Place';
import LocalDB from '../components/localStorageDB';

// const LOCAL_STORAGE_KEY_UPDATE_ZIP = 'UpdateZip';
// const LOCAL_STORAGE_KEY_UPDATE_CITY = 'UpdateCity';
// const LOCAL_STORAGE_KEY_UPDATE_LATITUDE = 'UpdateLatitude';
// const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE = 'UpdateLongitude';
// const LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE = 'UpdateAntinodeLatitude';
// const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE = 'UpdateAntinodeLongitude';
// const LOCAL_STORAGE_KEY_UPDATE_STATE = 'UpdateState';
// const LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION = 'UpdateStateAbbreviation';
// const LOCAL_STORAGE_KEY_UPDATE_ALL = 'UpdateAll';

export default function Database({ latCoord, longCoord, zip, city, state, stateAbbreviation, addZip, addCity, addLat, latitude, addLong, longitude, addState, addStateAbbr, addDocument, deleteZip, addOppLat, OppLat, addOppLong, OppLong, dbId, dbZip, dbCity, dbLatitude, dbLongitude, dbOppositeLatitude, dbOppositeLongitude, dbState, dbStateAbbreviation, deleteCity, deleteLat, deleteLong, deleteOppositeLat, deleteOppositeLong, deleteState, deleteAbbr, deleteAll }) {
    const [updateZip, setUpdateZip] = useState(null);
    const [updateCity, setUpdateCity] = useState(null);
    const [updateLatitude, setUpdateLatitude] = useState(null);
    const [updateLongitude, setUpdateLongitude] = useState(null);
    const [updateAntinodeLatitude, setUpdateAntinodeLatitude] = useState(null);
    const [updateAntinodeLongitude, setUpdateAntinodeLongitude] = useState(null);
    const [updateState, setUpdateState] = useState(null);
    const [updateStateAbbreviation, setUpdateStateAbbreviation] = useState(null);
    const [updateAll, setUpdateAll] = useState(null);

    console.log(dbId);
    console.log(dbZip);
    console.log(dbCity);
    console.log(dbLatitude);
    console.log(dbLongitude);
    console.log(dbOppositeLatitude);
    console.log(dbOppositeLongitude);
    console.log(dbState);
    console.log(dbStateAbbreviation);

    // useEffect(() => {
    //     const storedUpdateZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_ZIP))
    //     if (storedUpdateZip) setUpdateZip(storedUpdateZip)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_ZIP, 
    //     JSON.stringify(updateZip))
    // }, [updateZip]);

    // useEffect(() => {
    //     const storedUpdateCity = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_CITY))
    //     if (storedUpdateCity) setUpdateCity(storedUpdateCity)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_CITY, 
    //     JSON.stringify(updateCity))
    // }, [updateCity]);

    // useEffect(() => {
    //     const storedUpdateLatitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE))
    //     if (storedUpdateLatitude) setUpdateLatitude(storedUpdateLatitude)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE, 
    //     JSON.stringify(updateLatitude))
    // }, [updateLatitude]);

    // useEffect(() => {
    //     const storedUpdateLongitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE))
    //     if (storedUpdateLongitude) setUpdateLongitude(storedUpdateLongitude)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE, 
    //     JSON.stringify(updateLongitude))
    // }, [updateLongitude]);

    // useEffect(() => {
    //     const storedUpdateAntinodeLatitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE))
    //     if (storedUpdateAntinodeLatitude) setUpdateAntinodeLatitude(storedUpdateAntinodeLatitude)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE, 
    //     JSON.stringify(updateAntinodeLatitude))
    // }, [updateAntinodeLatitude]);

    // useEffect(() => {
    //     const storedUpdateAntinodeLongitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE))
    //     if (storedUpdateAntinodeLongitude) setUpdateAntinodeLongitude(storedUpdateAntinodeLongitude)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE, 
    //     JSON.stringify(updateAntinodeLongitude))
    // }, [updateAntinodeLongitude]);

    // useEffect(() => {
    //     const storedUpdateState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_STATE))
    //     if (storedUpdateState) setUpdateState(storedUpdateState)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_STATE, 
    //     JSON.stringify(updateState))
    // }, [updateState]);

    // useEffect(() => {
    //     const storedUpdateStateAbbreviation = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION))
    //     if (storedUpdateStateAbbreviation) setUpdateStateAbbreviation(storedUpdateStateAbbreviation)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION, 
    //     JSON.stringify(updateStateAbbreviation))
    // }, [updateStateAbbreviation]);

    // useEffect(() => {
    //     const storedUpdateAll = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_ALL))
    //     if (storedUpdateAll) setUpdateAll(storedUpdateAll)
    //   }, []);
    
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_ALL, 
    //     JSON.stringify(updateAll))
    // }, [updateAll]);

    return (
        <>
            <LocalDB updateZip={updateZip} setUpdateZip={setUpdateZip} updateCity={updateCity} setUpdateCity={setUpdateCity} updateLatitude={updateLatitude} setUpdateLatitude={setUpdateLatitude} updateLongitude={updateLongitude} setUpdateLongitude={setUpdateLongitude} updateAntinodeLatitude={updateAntinodeLatitude} setUpdateAntinodeLatitude={setUpdateAntinodeLatitude} updateAntinodeLongitude={updateAntinodeLongitude} setUpdateAntinodeLongitude={setUpdateAntinodeLongitude} updateState={updateState} setUpdateState={setUpdateState} updateStateAbbreviation={updateStateAbbreviation} setUpdateStateAbbreviation={setUpdateStateAbbreviation} updateAll={updateAll} setUpdateAll={setUpdateAll} />
            <List>
                {/* {!!dbZip ? ( */}
                {updateZip ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteZip(zip), setUpdateZip(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Zip
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addZip(zip), setUpdateZip(true)}}>
                            <TagIcon fontSize="small" />&nbsp;
                            Save Zip
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateCity ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteCity(city), setUpdateCity(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete City
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addCity(city), setUpdateCity(true)}}>
                            <LocationCityIcon fontSize="small" />&nbsp;
                            Save City
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateLatitude ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteLat(latitude), setUpdateLatitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Latitude
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addLat(latitude), setUpdateLatitude(true)}}>
                            <HeightIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
                            Save Latitude
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateLongitude ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteLong(longitude), setUpdateLongitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Longitude
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addLong(longitude), setUpdateLongitude(true)}}>
                            <HeightIcon fontSize="small" />&nbsp;
                            Save Longitude
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateAntinodeLatitude ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteOppositeLat(OppLat), setUpdateAntinodeLatitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Antinode Latitude
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addOppLat(OppLat), setUpdateAntinodeLatitude(true)}}>
                            <SyncAltIcon fontSize="small" />&nbsp;
                            Save Antinode Latitude
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateAntinodeLongitude ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteOppositeLong(OppLong), setUpdateAntinodeLongitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Antinode Longitude
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addOppLong(OppLong), setUpdateAntinodeLongitude(true)}}>
                            <SyncAltIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
                            Save Antinode Longitude
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateState ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteState(state), setUpdateState(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete State
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addState(state), setUpdateState(true)}}>
                            <PlaceIcon fontSize="small" />&nbsp;
                            Save State
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateStateAbbreviation ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteAbbr(stateAbbreviation), setUpdateStateAbbreviation(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete State Abbreviation
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addStateAbbr(stateAbbreviation), setUpdateStateAbbreviation(true)}}>
                            <PlaceIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                            Save State Abbreviation
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateAll ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteAll(zip, city, latCoord, longCoord, state, stateAbbreviation), setUpdateAll(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete All
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addDocument(zip, city, latCoord, longCoord, OppLat, OppLong, state, stateAbbreviation), setUpdateAll(true)}}>
                            <SaveAltIcon fontSize="small" />&nbsp;
                            Save All
                        </ListItemButton>
                    </ListItem>
                </>
                )}
            </List>
        </>
    );
}
