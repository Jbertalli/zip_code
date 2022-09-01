import React, { useEffect } from "react";

const LOCAL_STORAGE_KEY_ZIP = 'UserZip';
const LOCAL_STORAGE_KEY_CITY = 'UserCity';
const LOCAL_STORAGE_KEY_LAT = 'UserLatitude';

export default function Local({ setZip, zip, setCity, city, latCoord, setLatCoord }) {

    //zip
    useEffect(() => {
        const storedZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ZIP))
        if (storedZip) setZip(storedZip)
      }, []);
  
      useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_ZIP, 
        JSON.stringify(zip))
      }, [zip]);

      //city
      useEffect(() => {
        const storedCity = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CITY))
        if (storedCity) setCity(storedCity)
      }, [])
  
      useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_CITY, 
        JSON.stringify(city))
      }, [city]);

      //latitude
      useEffect(() => {
        const storedLat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LAT))
        if (storedLat) setLatCoord(storedLat)
      }, [])
  
      useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_LAT, 
        JSON.stringify(latCoord))
      }, [latCoord]);

    return (
        <>
            &nbsp;
        </>
    );
}
