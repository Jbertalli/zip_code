import React, { useState } from 'react';
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
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import StraightenIcon from '@mui/icons-material/Straighten';
import LocalDB from '../components/localStorageDB';
import { useSelector } from 'react-redux';
import { zipValue } from '../slices/zipSlice';
import { cityValue } from '../slices/citySlice';
import { latCoordValue } from '../slices/latCoordSlice';
import { longCoordValue } from "../slices/longCoordSlice";
import { stateValue } from '../slices/stateSlice';
import { stateAbbreviationValue } from "../slices/stateAbbreviationSlice";
import { OppLatValue } from '../slices/OppLatSlice';
import { OppLongValue } from '../slices/OppLongSlice';
import { weatherDataValue } from '../slices/weatherSlice';
import { currentTempDataValue } from '../slices/currentTempDataSlice';
import { tempRangeDataValue } from '../slices/tempRangeDataSlice';
import { latitudeValue } from '../slices/latitudeSlice';

export default function Database({ addZip, addCity, addLat, addLong, longitude, addState, addStateAbbr, addDocument, deleteZip, addOppLat, addOppLong, dbId, dbZip, dbCity, dbLatitude, dbLongitude, dbOppositeLatitude, dbOppositeLongitude, dbState, dbStateAbbreviation, deleteCity, deleteLat, deleteLong, deleteOppositeLat, deleteOppositeLong, deleteState, deleteAbbr, deleteAll, addWeather, deleteWeather, addCurrentTemp, deleteCurrentTemp, addTempRange, deleteTempRange }) {
    const [updateZip, setUpdateZip] = useState<any>(null);
    const [updateCity, setUpdateCity] = useState<any>(null);
    const [updateLatitude, setUpdateLatitude] = useState<any>(null);
    const [updateLongitude, setUpdateLongitude] = useState<any>(null);
    const [updateAntinodeLatitude, setUpdateAntinodeLatitude] = useState<any>(null);
    const [updateAntinodeLongitude, setUpdateAntinodeLongitude] = useState<any>(null);
    const [updateState, setUpdateState] = useState<any>(null);
    const [updateStateAbbreviation, setUpdateStateAbbreviation] = useState<any>(null);
    const [updateWeather, setUpdateWeather] = useState<any>(null);
    const [updateCurrentTemp, setUpdateCurrentTemp] = useState<any>(null);
    const [updateTempRange, setUpdateTempRange] = useState<any>(null);
    const [updateAll, setUpdateAll] = useState<any>(null);

    const zipName = useSelector(zipValue);
    const cityName = useSelector(cityValue);
    const latCoordName = useSelector(latCoordValue);
    const longCoordName = useSelector(longCoordValue);
    const stateName  = useSelector(stateValue);
    const stateAbbreviationName = useSelector(stateAbbreviationValue);
    const OppLatValueName = useSelector(OppLatValue);
    const OppLongValueName = useSelector(OppLongValue);
    const weatherDataName = useSelector(weatherDataValue);
    const currentTempDataName = useSelector(currentTempDataValue);
    const tempRangeDataName = useSelector(tempRangeDataValue);
    const latitudeName = useSelector(latitudeValue);

    // console.log(dbId);
    // console.log(dbZip);
    // console.log(dbCity);
    // console.log(dbLatitude);
    // console.log(dbLongitude);
    // console.log(dbOppositeLatitude);
    // console.log(dbOppositeLongitude);
    // console.log(dbState);
    // console.log(dbStateAbbreviation);

    return (
        <>
            <div style={{ position: 'absolute' }}>
                <LocalDB updateZip={updateZip} setUpdateZip={setUpdateZip} updateCity={updateCity} setUpdateCity={setUpdateCity} updateLatitude={updateLatitude} setUpdateLatitude={setUpdateLatitude} updateLongitude={updateLongitude} setUpdateLongitude={setUpdateLongitude} updateAntinodeLatitude={updateAntinodeLatitude} setUpdateAntinodeLatitude={setUpdateAntinodeLatitude} updateAntinodeLongitude={updateAntinodeLongitude} setUpdateAntinodeLongitude={setUpdateAntinodeLongitude} updateState={updateState} setUpdateState={setUpdateState} updateStateAbbreviation={updateStateAbbreviation} setUpdateStateAbbreviation={setUpdateStateAbbreviation} updateAll={updateAll} setUpdateAll={setUpdateAll} updateWeather={updateWeather} setUpdateWeather={setUpdateWeather} updateCurrentTemp={updateCurrentTemp} setUpdateCurrentTemp={setUpdateCurrentTemp} updateTempRange={updateTempRange} setUpdateTempRange={setUpdateTempRange} /> 
            </div>
            <List>
                {/* {!!dbZip ? ( */}
                {updateZip ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteZip(zipName), setUpdateZip(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Zip
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addZip(zipName), setUpdateZip(true)}}>
                            <TagIcon fontSize="small" />&nbsp;
                            Save Zip
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateCity ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteCity(cityName), setUpdateCity(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete City
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addCity(cityName), setUpdateCity(true)}}>
                            <LocationCityIcon fontSize="small" />&nbsp;
                            Save City
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateLatitude ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteLat(latitudeName), setUpdateLatitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Latitude
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addLat(latitudeName), setUpdateLatitude(true)}}>
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
                        <ListItemButton onClick={() => {deleteOppositeLat(OppLatValueName), setUpdateAntinodeLatitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Antinode Latitude
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addOppLat(OppLatValueName), setUpdateAntinodeLatitude(true)}}>
                            <SyncAltIcon fontSize="small" />&nbsp;
                            Save Antinode Latitude
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateAntinodeLongitude ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteOppositeLong(OppLongValueName), setUpdateAntinodeLongitude(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Antinode Longitude
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addOppLong(OppLongValueName), setUpdateAntinodeLongitude(true)}}>
                            <SyncAltIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
                            Save Antinode Longitude
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateState ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteState(stateName), setUpdateState(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete State
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addState(stateName), setUpdateState(true)}}>
                            <PlaceIcon fontSize="small" />&nbsp;
                            Save State
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateStateAbbreviation ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteAbbr(stateAbbreviationName), setUpdateStateAbbreviation(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete State Abbreviation
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addStateAbbr(stateAbbreviationName), setUpdateStateAbbreviation(true)}}>
                            <PlaceIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                            Save State Abbreviation
                        </ListItemButton>
                    </ListItem>
                </>
                )}
                {updateWeather ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteWeather(weatherDataName), setUpdateWeather(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Weather
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addWeather(weatherDataName), setUpdateWeather(true)}}>
                            <WbSunnyIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                            Save Weather
                        </ListItemButton>
                    </ListItem>
                </> 
                )}
                {updateCurrentTemp ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteCurrentTemp(currentTempDataName), setUpdateCurrentTemp(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Current Temperature
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addCurrentTemp(currentTempDataName), setUpdateCurrentTemp(true)}}>
                            <ThermostatIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                            Save Current Temperature
                        </ListItemButton>
                    </ListItem>
                </> 
                )}
                {updateTempRange ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteTempRange(tempRangeDataName), setUpdateTempRange(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete Temperature Range
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addTempRange(tempRangeDataName), setUpdateTempRange(true)}}>
                            <StraightenIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                            Save Temperature Range
                        </ListItemButton>
                    </ListItem>
                </> 
                )}
                {updateAll ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {deleteAll(zipName, cityName, latCoordName, longCoordName, stateName, stateAbbreviationName, weatherDataName, currentTempDataName, tempRangeDataName), setUpdateAll(false), setUpdateZip(false), setUpdateCity(false), setUpdateLatitude(false), setUpdateLongitude(false), setUpdateAntinodeLatitude(false), setUpdateAntinodeLongitude(false), setUpdateState(false), setUpdateStateAbbreviation(false), setUpdateWeather(false), setUpdateCurrentTemp(false), setUpdateTempRange(false)}}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Delete All
                        </ListItemButton>
                    </ListItem>
                </>
                ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {addDocument(zipName, cityName, latCoordName, longCoordName, OppLatValueName, OppLongValueName, stateName, stateAbbreviationName, weatherDataName, currentTempDataName, tempRangeDataName), setUpdateAll(true), setUpdateZip(true), setUpdateCity(true), setUpdateLatitude(true), setUpdateLongitude(true), setUpdateAntinodeLatitude(true), setUpdateAntinodeLongitude(true), setUpdateState(true), setUpdateStateAbbreviation(true), setUpdateWeather(true), setUpdateCurrentTemp(true), setUpdateTempRange(true)}}>
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
