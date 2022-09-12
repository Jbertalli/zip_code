import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TagIcon from '@mui/icons-material/Tag';
import HeightIcon from '@mui/icons-material/Height';
import PlaceIcon from '@mui/icons-material/Place';
import ClearIcon from '@mui/icons-material/Clear';

export default function UI_Buttons({ zipCode, setZip, setCity, setLatCoord, setLongCoord, setState, setStateAbbreviation, handleClear, latCoord, longCoord, zip, city, state, stateAbbreviation }) {
    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setZip(zipCode.zipcode)}>
                    <TagIcon fontSize="small" />&nbsp;
                    Zip
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setCity(zipCode.city)}>
                    <LocationCityIcon fontSize="small" />&nbsp;
                    City
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setLatCoord(zipCode.latitude)}>
                    <HeightIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
                    Latitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setLongCoord(zipCode.longitude)}>
                    <HeightIcon fontSize="small" />&nbsp;
                    Longitude
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setState(zipCode.state)}>
                    <PlaceIcon fontSize="small" />&nbsp;
                    State
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setStateAbbreviation(zipCode.state_abbr)}>
                    <PlaceIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                    State Abbreviation
                </ListItemButton>
            </ListItem>
            {(zip && city && latCoord && longCoord && state && stateAbbreviation) ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClear()}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Clear All
                        </ListItemButton>
                    </ListItem>
                </>
            ): null}
        </List>
    );
}