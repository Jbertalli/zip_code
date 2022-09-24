import React, { useEffect } from 'react';

const LOCAL_STORAGE_KEY_UPDATE_ZIP = 'UpdateZip';
const LOCAL_STORAGE_KEY_UPDATE_CITY = 'UpdateCity';
const LOCAL_STORAGE_KEY_UPDATE_LATITUDE = 'UpdateLatitude';
const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE = 'UpdateLongitude';
const LOCAL_STORAGE_KEY_UPDATE_LATITUDE_ANTINODE = 'UpdateAntinodeLatitude';
const LOCAL_STORAGE_KEY_UPDATE_LONGITUDE_ANTINODE = 'UpdateAntinodeLongitude';

export default function LocalDB({ updateZip, setUpdateZip, updateCity, setUpdateCity, updateLatitude, setUpdateLatitude, updateLongitude, setUpdateLongitude, updateAntinodeLatitude, setUpdateAntinodeLatitude, updateAntinodeLongitude, setUpdateAntinodeLongitude }) {

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

    return (
        <>
            &nbsp;
        </>
    );
}
