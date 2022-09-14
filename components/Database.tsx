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
                    DB Zip
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addCity(city)}>
                    DB City
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addLat(latitude)}>
                    DB Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addLong(longitude)}>
                    DB Longitude
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => addOppLat(OppLat)}>
                    DB Opposite Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addOppLong(OppLong)}>
                    DB Opposite Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addState(state)}>
                    DB State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addStateAbbr(stateAbbreviation)}>
                    DB State Abbreviation
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => addDocument(zip, city, latCoord, longCoord, OppLat, OppLong, state, stateAbbreviation)}>
                    DB All
                </ListItemButton>
            </ListItem>
        </List>
    );
}
