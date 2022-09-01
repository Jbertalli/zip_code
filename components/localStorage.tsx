import React, { useEffect } from "react";

const LOCAL_STORAGE_KEY_ZIP = 'UserZip';

export default function Local({ setZip, zip }) {

    useEffect(() => {
        const storedZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ZIP))
        if (storedZip) setZip(storedZip)
      }, []);
  
      useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_ZIP, 
        JSON.stringify(zip))
      }, [zip]);

    return (
        <>
            &nbsp;
        </>
    );
}
