import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export default function Delete({ latCoord, longCoord, zip, city, state, stateAbbreviation, OppLat, OppLong, deleteZip, deleteCity, latitude, deleteLat, longitude, deleteLong, deleteState, deleteAbbr, deleteAll, deleteOppositeLat, deleteOppositeLong }) {
    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteZip(zip)}>
                    Delete Zip
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteCity(city)}>
                    Delete City
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteLat(latitude)}>
                    Delete Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteLong(longitude)}>
                    Delete Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteOppositeLat(OppLat)}>
                    Delete Opposite Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteOppositeLong(OppLong)}>
                    Delete Opposite Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteState(state)}>
                    Delete State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteAbbr(stateAbbreviation)}>
                    Delete State Abbreviation
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => deleteAll(zip, city, latCoord, longCoord, state, stateAbbreviation)}>
                    Delete All
                </ListItemButton>
            </ListItem>
        </List>
    );
}
