import React, { useEffect } from 'react';

const LOCAL_STORAGE_KEY_UPDATE_ZIP = 'UpdateZip';

export default function LocalDB({ updateZip, setUpdateZip }) {

    useEffect(() => {
        const storedUpdateZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE_ZIP))
        if (storedUpdateZip) setUpdateZip(storedUpdateZip)
      }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE_ZIP, 
        JSON.stringify(updateZip))
    }, [updateZip]);

    return (
        <>
            &nbsp;
        </>
    );
}
