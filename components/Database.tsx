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
                        <ListItemButton onClick={() => {deleteAll(zip, city, latCoord, longCoord, state, stateAbbreviation), setUpdateAll(false), setUpdateZip(false), setUpdateCity(false), setUpdateLatitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete All
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addDocument(zip, city, latCoord, longCoord, OppLat, OppLong, state, stateAbbreviation), setUpdateAll(true), setUpdateZip(true), setUpdateCity(true), setUpdateLatitude(true)}}>
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
