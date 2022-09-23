import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY_UPDATEZIP = 'UpdateZip';

export default function Database({ latCoord, longCoord, zip, city, state, stateAbbreviation, addZip, addCity, addLat, latitude, addLong, longitude, addState, addStateAbbr, addDocument, deleteZip, addOppLat, OppLat, addOppLong, OppLong, dbId, dbZip, dbCity, dbLatitude, dbLongitude, dbOppositeLatitude, dbOppositeLongitude, dbState, dbStateAbbreviation }) {
    const [updateZip, setUpdateZip] = useState(null);

    console.log(dbId);
    console.log(dbZip);
    console.log(dbCity);
    console.log(dbLatitude);
    console.log(dbLongitude);
    console.log(dbOppositeLatitude);
    console.log(dbOppositeLongitude);
    console.log(dbState);
    console.log(dbStateAbbreviation);

    useEffect(() => {
        const storedUpdateZip = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_UPDATEZIP))
        if (storedUpdateZip) setUpdateZip(storedUpdateZip)
      }, [])
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_UPDATEZIP, 
        JSON.stringify(updateZip))
    }, [updateZip]);

    console.log(updateZip);

    // useEffect(() => {
    //     if (!!dbZip) {
    //         setUpdateZip()
    //     } else if (!dbZip) {
    //         setUpdateZip()
    //     } else {
    //         return;
    //     }
    // }, [])
    
    return (
        <List>
            {/* {!!dbZip ? ( */}
            {updateZip ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteZip(zip), setUpdateZip(false)}}>
                        Delete Zip
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addZip(zip), setUpdateZip(true)}}>
                        DB Zip
                    </ListItemButton>
                </ListItem>
            </>
            )}
            <ListItem disablePadding>
                <ListItemButton onClick={() => addZip(zip)}>
                    Save Zip Code
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addCity(city)}>
                    Save City
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addLat(latitude)}>
                    Save Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addLong(longitude)}>
                    Save Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addOppLat(OppLat)}>
                    Save Antinode Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addOppLong(OppLong)}>
                    Save Antinode Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addState(state)}>
                    Save State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addStateAbbr(stateAbbreviation)}>
                    Save State Abbreviation
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addDocument(zip, city, latCoord, longCoord, OppLat, OppLong, state, stateAbbreviation)}>
                    Save All
                </ListItemButton>
            </ListItem>
        </List>
    );
}
