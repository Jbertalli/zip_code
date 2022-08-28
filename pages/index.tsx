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
import LongClose from '../components/close_buttons/longClose';
import StateClose from '../components/close_buttons/stateClose';
import AbbrClose from '../components/close_buttons/abbrClose';

const API_endpoint: string = process.env.API_ENDPOINT;
const API_key: string = process.env.API_KEY;

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
    const [OppLat, setOppLat] = useState('');
    const [OppLong, setOppLong] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        })

        //fetch data with axios
        let finalAPIEndPoint: string = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
        axios.get(finalAPIEndPoint)
          .then((response) => {
            setResponseData(response.data);
            // console.log(response.data);
          })
    }, [latitude, longitude])

    // syracuse coordinates for testing
    // let zipCode = reverse.lookup(43.0481, -76.1474, 'us');
    let zipCode: any = reverse.lookup(latitude, longitude, 'us');
    // console.log(zipCode);
    // console.log(zipCode.zipcode);

    function handleClear(): void {
      setZip('');
      setCity('');
      setLatCoord('');
      setLongCoord('');
      setState('');
      setStateAbbreviation('');
      console.log('%c cleared', 'color: red');
    }

    function opposite(): void {
        let oppositeLat: number = (parseFloat(latCoord) - (parseFloat(latCoord) * 2)); 
        let oppositeLong: number = (parseFloat(longCoord) + 180);
        setOppLat(oppositeLat);
        setOppLong(oppositeLong);
    }

    function clearOpposite(): void {
      setOppLat('');
      setOppLong('');
    }

  return (
    <>
      <Head>
        <title>Zip Code</title>
        <meta name="description" content="zip code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
        <h1>
          Where the Heck am I?
        </h1>
      </div>
      <Container maxWidth="lg" style={{ marginTop: '2%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={() => setZip(zipCode.zipcode)} className={styles.button}>
            <TagIcon fontSize="small" />&nbsp;
            Zip Code
          </Button>
          <Button onClick={() => setCity(zipCode.city)} className={styles.button}>
            <LocationCityIcon fontSize="small" />&nbsp;
            City
          </Button>
          <Button onClick={() => setLatCoord(zipCode.latitude)} className={styles.button}>
            <HeightIcon fontSize="small" style={{ transform: 'rotate(90deg)' }} />&nbsp;
            Latitude
          </Button>
          <Button onClick={() => setLongCoord(zipCode.longitude)} className={styles.button}>
            <HeightIcon fontSize="small" />&nbsp;
            Longitude
          </Button>
          <Button onClick={() => setState(zipCode.state)} className={styles.button}>
            <PlaceIcon fontSize="small" />&nbsp;
            State
          </Button>
          <Button onClick={() => setStateAbbreviation(zipCode.state_abbr)} className={styles.button}>
            <PlaceIcon fontSize="small" style={{ transform: 'scale(0.7)'}} />&nbsp;
            State Abbreviation
          </Button>
          <Button onClick={handleClear} className={styles.clearButton}>
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
            <div>
              <h1>{longCoord}</h1>
              <LongClose longCoord={longCoord} setLongCoord={setLongCoord} />
            </div>
            <div>
              <h1>{state}</h1>
              <StateClose state={state} setState={setState} />
            </div>
            <div>
              <h1>{stateAbbreviation}</h1>
              <AbbrClose stateAbbreviation={stateAbbreviation} setStateAbbreviation={setStateAbbreviation} />
            </div>
        </div>
        <div>
          {(latCoord && longCoord) ? (
          <>
            <Button
              className={styles.button}
              onClick={opposite}
              style={{ marginRight: '20px' }}
            >
                Opposite
            </Button>
            {(OppLat && OppLong) ? (
            <>
              <Button
                className={styles.clearButton}
                onClick={clearOpposite}
              >
                Clear Opposite
              </Button>
            </>
            ):(
            <>
              &nbsp;
            </>
            )}
            <h1>{OppLat}</h1>
            <h1>{OppLong}</h1>
          </>
          ):(
          <>
            &nbsp;
          </>
          )}
        </div>
      </Container>
      <Container>
        <Map latCoord={latCoord} longCoord={longCoord} />
      </Container>
    </>
  );
}
