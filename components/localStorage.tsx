import React, { useEffect } from "react";

const LOCAL_STORAGE_KEY_ZIP = 'UserZip';
const LOCAL_STORAGE_KEY_CITY = 'UserCity';

export default function Local({ setZip, zip, setCity, city }) {

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

    return (
        <>
            &nbsp;
        </>
    );
}
