import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TagIcon from '@mui/icons-material/Tag';
import HeightIcon from '@mui/icons-material/Height';
import PlaceIcon from '@mui/icons-material/Place';
import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import StraightenIcon from '@mui/icons-material/Straighten';
import AddIcon from '@mui/icons-material/Add';

export default function UI_Buttons({ zipCode, setZip, setCity, setLatCoord, setLongCoord, setState, setStateAbbreviation, handleClear, latCoord, longCoord, zip, city, state, stateAbbreviation, opposite, OppLat, OppLong, weather, setWeatherData, weatherData, currentTemp, currentTempData, setCurrentTempData, tempRange, tempRangeData, setTempRangeData }) {

    function handleAddAll(): void {
        setZip(zipCode.zipcode);
        setCity(zipCode.city);
        setLatCoord(zipCode.latitude);
        setLongCoord(zipCode.longitude);
        setState(zipCode.state);
        setStateAbbreviation(zipCode.state_abbr);
        setWeatherData(weather);
        setCurrentTempData(currentTemp);
        setTempRangeData(tempRange);
    }

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
            {(latCoord && longCoord) ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={opposite}>
                        <SyncAltIcon fontSize="small" />&nbsp;
                        Antinode
                    </ListItemButton>
                </ListItem>
            </>
            ): null}
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
            <ListItem disablePadding>
                <ListItemButton onClick={() => setWeatherData(weather)}>
                    <WbSunnyIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                    Weather
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setCurrentTempData(currentTemp)}>
                    <ThermostatIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                    Current Temperature
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setTempRangeData(tempRange)}>
                    <StraightenIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                    Temperature Range
                </ListItemButton>
            </ListItem>
            {/* {(zip && city && latCoord && longCoord && state && stateAbbreviation && OppLat && OppLong && weatherData && currentTempData && tempRangeData) ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClear()}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Clear All
                        </ListItemButton>
                    </ListItem>
                </>
            ): null} */}
            {(zip || city || latCoord || longCoord || state || stateAbbreviation || OppLat || OppLong || weatherData || currentTempData || tempRangeData) ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleClear()}>
                            <ClearIcon fontSize="small" />&nbsp;
                            Clear All
                        </ListItemButton>
                    </ListItem>
                </>
            ):(
                <>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleAddAll()}>
                            <AddIcon fontSize="small" />&nbsp;
                            Add All
                        </ListItemButton>
                    </ListItem>
                </>
            )}
        </List>
    );
}
