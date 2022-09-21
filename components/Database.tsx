import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export default function Database({ latCoord, longCoord, zip, city, state, stateAbbreviation, addZip, addCity, addLat, latitude, addLong, longitude, addState, addStateAbbr, addDocument, deleteZip, addOppLat, OppLat, addOppLong, OppLong }) {
    
    return (
        <List>
            {/* { ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {addZip(zip), setZipClicked(false)}}>
                        DB Zip
                    </ListItemButton>
                </ListItem>
            </>
            ):(
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {deleteZip(zip), setZipClicked(true)}}>
                        Delete Zip
                    </ListItemButton>
                </ListItem>
            </>
            )} */}
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
