import React, { useEffect } from 'react';

const LOCAL_STORAGE_KEY_UPDATE_ZIP = 'UpdateZip';
const LOCAL_STORAGE_KEY_UPDATE_CITY = 'UpdateCity';
const LOCAL_STORAGE_KEY_UPDATE_LATITUDE = 'UpdateLatitude';
const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE = 'UpdateLongitude';
const LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE = 'UpdateAntinodeLatitude';
const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE = 'UpdateAntinodeLongitude';
const LOCAL_STORAGE_KEY_UPDATE_STATE = 'UpdateState';
const LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION = 'UpdateStateAbbreviation';
const LOCAL_STORAGE_KEY_UPDATE_WEATHER = 'UpdateWeather';
const LOCAL_STORAGE_KEY_UPDATE_ALL = 'UpdateAll';

export default function LocalDB({ updateZip, setUpdateZip, updateCity, setUpdateCity, updateLatitude, setUpdateLatitude, updateLongitude, setUpdateLongitude, updateAntinodeLatitude, setUpdateAntinodeLatitude, updateAntinodeLongitude, setUpdateAntinodeLongitude, updateState, setUpdateState, updateStateAbbreviation, setUpdateStateAbbreviation, updateAll, setUpdateAll, updateWeather, setUpdateWeather, updateCurrentTemp, setUpdateCurrentTemp }) {

    useEffect(() => {
        const storedUpdateZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_ZIP))
        if (storedUpdateZip) setUpdateZip(storedUpdateZip)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_ZIP, 
        JSON.stringify(updateZip))
    }, [updateZip]);

    useEffect(() => {
        const storedUpdateCity = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_CITY))
        if (storedUpdateCity) setUpdateCity(storedUpdateCity)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_CITY, 
        JSON.stringify(updateCity))
    }, [updateCity]);

    useEffect(() => {
        const storedUpdateLatitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE))
        if (storedUpdateLatitude) setUpdateLatitude(storedUpdateLatitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE, 
        JSON.stringify(updateLatitude))
    }, [updateLatitude]);

    useEffect(() => {
        const storedUpdateLongitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE))
        if (storedUpdateLongitude) setUpdateLongitude(storedUpdateLongitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE, 
        JSON.stringify(updateLongitude))
    }, [updateLongitude]);

    useEffect(() => {
        const storedUpdateAntinodeLatitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE))
        if (storedUpdateAntinodeLatitude) setUpdateAntinodeLatitude(storedUpdateAntinodeLatitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE, 
        JSON.stringify(updateAntinodeLatitude))
    }, [updateAntinodeLatitude]);

    useEffect(() => {
        const storedUpdateAntinodeLongitude = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE))
        if (storedUpdateAntinodeLongitude) setUpdateAntinodeLongitude(storedUpdateAntinodeLongitude)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE, 
        JSON.stringify(updateAntinodeLongitude))
    }, [updateAntinodeLongitude]);

    useEffect(() => {
        const storedUpdateState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_STATE))
        if (storedUpdateState) setUpdateState(storedUpdateState)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_STATE, 
        JSON.stringify(updateState))
    }, [updateState]);

    useEffect(() => {
        const storedUpdateStateAbbreviation = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION))
        if (storedUpdateStateAbbreviation) setUpdateStateAbbreviation(storedUpdateStateAbbreviation)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_STATE_ABBREVIATION, 
        JSON.stringify(updateStateAbbreviation))
    }, [updateStateAbbreviation]);

    useEffect(() => {
        const storedUpdateAll = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_ALL))
        if (storedUpdateAll) setUpdateAll(storedUpdateAll)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_ALL, 
        JSON.stringify(updateAll))
    }, [updateAll]);

    useEffect(() => {
        const storedUpdateWeather = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_WEATHER))
        if (storedUpdateWeather) setUpdateWeather(storedUpdateWeather)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_WEATHER, 
        JSON.stringify(updateWeather))
    }, [updateWeather]);

    // console.log(updateZip);
    // console.log(updateCity);
    // console.log(updateLatitude);
    // console.log(updateLongitude);
    // console.log(updateAntinodeLatitude);
    // console.log(updateAntinodeLongitude);
    // console.log(updateState);
    // console.log(updateStateAbbreviation);
    // console.log(updateWeather);
    // console.log(updateAll);

    return (
        <>
            &nbsp;
        </>
    );
}
