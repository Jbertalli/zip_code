import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
import reverse from 'reverse-geocode';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TagIcon from '@mui/icons-material/Tag';
import HeightIcon from '@mui/icons-material/Height';
import PlaceIcon from '@mui/icons-material/Place';
import ClearIcon from '@mui/icons-material/Clear';
import styles from '../styles/zip.module.css';
import Map from '../components/map';
import ZipClose from '../components/close_buttons/zipClose';
import CityClose from '../components/close_buttons/cityClose';
import LatClose from '../components/close_buttons/latClose';

const API_endpoint = process.env.API_ENDPOINT;
const API_key = process.env.API_KEY;

export default function Home() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [responseData, setResponseData] = useState({});
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [latCoord, setLatCoord] = useState('');
    const [longCoord, setLongCoord] = useState('');
    const [state, setState] = useState('');
    const [stateAbbreviation, setStateAbbreviation] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        })

        //fetch data with axios
        let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
        axios.get(finalAPIEndPoint)
          .then((response) => {
            setResponseData(response.data);
            // console.log(response.data);
          })
    }, [latitude, longitude])

    // syracuse coordinates for testing
    // let zipCode = reverse.lookup(43.0481, -76.1474, 'us');
    let zipCode = reverse.lookup(latitude, longitude, 'us');
    // console.log(zipCode);
    // console.log(zipCode.zipcode);

    function handleClear() {
      setZip('');
      setCity('');
      setLatCoord('');
      setLongCoord('');
      setState('');
      setStateAbbreviation('');
      console.log('%c cleared', 'color: red');
    }

  return (
    <>
      <Head>
        <title>Zip Code</title>
        <meta name="description" content="zip code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <center style={{ marginTop: '2%' }}>
        <h1>
          Where the Heck am I?
        </h1>
      </center>
      {/* <Container maxWidth="lg">
        <table>
          <tr>
            <td>
              <Button onClick={() => setZip(zipCode.zipcode)} className={styles.button} variant="contained">
                <TagIcon fontSize="small" />&nbsp;
                Zip Code
              </Button>
            </td>
            <td>
              <h1 className={styles.text}>{zip}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <Button onClick={() => setCity(zipCode.city)} className={styles.button} variant="contained">
                <LocationCityIcon fontSize="small" />&nbsp;
                City
              </Button>
            </td>
            <td>
              <h1 className={styles.text}>{city}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <Button onClick={() => setLatCoord(zipCode.latitude)} className={styles.button} variant="contained">
                <HeightIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
                Latitude
              </Button>
            </td>
            <td>
              <h1 className={styles.text}>{latCoord}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <Button onClick={() => setLongCoord(zipCode.longitude)} className={styles.button} variant="contained">
                <HeightIcon fontSize="small" />&nbsp;
                Longitude
              </Button>
            </td>
            <td>
              <h1 className={styles.text}>{longCoord}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <Button onClick={() => setState(zipCode.state)} className={styles.button} variant="contained">
                <PlaceIcon fontSize="small" />&nbsp;
                State
              </Button>
            </td>
            <td>
              <h1 className={styles.text}>{state}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <Button onClick={() => setStateAbbreviation(zipCode.state_abbr)} className={styles.button} variant="contained">
                <PlaceIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
                State Abbreviation
              </Button>
            </td>
            <td>
              <h1 className={styles.text}>{stateAbbreviation}</h1>
            </td>
          </tr>
        </table>
      </Container> */}
      <Container maxWidth="lg" style={{ marginTop: '2%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={() => setZip(zipCode.zipcode)} className={styles.button} variant="contained">
            <TagIcon fontSize="small" />&nbsp;
            Zip Code
          </Button>
          <Button onClick={() => setCity(zipCode.city)} className={styles.button} variant="contained">
            <LocationCityIcon fontSize="small" />&nbsp;
            City
          </Button>
          <Button onClick={() => setLatCoord(zipCode.latitude)} className={styles.button} variant="contained">
            <HeightIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
            Latitude
          </Button>
          <Button onClick={() => setLongCoord(zipCode.longitude)} className={styles.button} variant="contained">
            <HeightIcon fontSize="small" />&nbsp;
            Longitude
          </Button>
          <Button onClick={() => setState(zipCode.state)} className={styles.button} variant="contained">
            <PlaceIcon fontSize="small" />&nbsp;
            State
          </Button>
          <Button onClick={() => setStateAbbreviation(zipCode.state_abbr)} className={styles.button} variant="contained">
            <PlaceIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
            State Abbreviation
          </Button>
          <Button onClick={handleClear} className={styles.clearButton} variant="container">
            <ClearIcon fontSize="small" />&nbsp;
            Clear all
          </Button>
        </div>
        <div>
            <div>
              <h1>{zip}</h1>
              <ZipClose zip={zip} setZip={setZip} />
            </div>
            <div>
              <h1>{city}</h1>
              <CityClose city={city} setCity={setCity} />
            </div>
            <div>
              <h1>{latCoord}</h1>
              <LatClose latCoord={latCoord} setLatCoord={setLatCoord} />
            </div>
            

            
            <h1>{longCoord}</h1>
            <h1>{state}</h1>
            <h1>{stateAbbreviation}</h1>
        </div>
        <div>
            <Button 
              variant="contained"
              className={styles.button}
            >
                Opposite
            </Button>
            <h1>{parseFloat(latCoord) - (parseFloat(latCoord) * 2)}</h1>
            <h1>{parseFloat(longCoord) + 180}</h1>
        </div>
      </Container>
      <Container>
        <Map latCoord={latCoord} longCoord={longCoord} />
      </Container>
    </>
  );
}
