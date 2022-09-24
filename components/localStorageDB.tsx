import React, { useEffect } from 'react';

const LOCAL_STORAGE_KEY_UPDATE_ZIP = 'UpdateZip';
const LOCAL_STORAGE_KEY_UPDATE_CITY = 'UpdateCity';

export default function LocalDB({ updateZip, setUpdateZip, updateCity, setUpdateCity }) {

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

    return (
        <>
            &nbsp;
        </>
    );
}
