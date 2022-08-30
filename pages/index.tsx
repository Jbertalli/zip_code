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
import firebase from '../firebase/clientApp';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocs, setDoc, deleteDoc, deleteField, updateDoc, collection, Timestamp  } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const clientCredential = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// console.log(clientCredentials);

const app = initializeApp(clientCredential);
const db = getFirestore();

const API_endpoint: string = process.env.API_ENDPOINT;
const API_key: string = process.env.API_KEY;

export default function Home() {
    const [latitude, setLatitude] = useState<number | undefined>();
    const [longitude, setLongitude] = useState<number | undefined>();
    const [responseData, setResponseData] = useState({});
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [latCoord, setLatCoord] = useState('');
    const [longCoord, setLongCoord] = useState('');
    const [state, setState] = useState('');
    const [stateAbbreviation, setStateAbbreviation] = useState('');
    const [OppLat, setOppLat] = useState<number | undefined>();
    const [OppLong, setOppLong] = useState<number | undefined>();

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
       console.log("Current user:", user);
       console.log(user.displayName);
        const uid = user.uid;
      } else {
        console.log("No user signed in");
      }
    });

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

    function clearOpposite() {
      setOppLat(null);
      setOppLong(null);
    }

    // console.log data
    const logged = async () => {
      const colRef = collection(db, "location");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        console.log(doc.data());
      })
    }
    
    useEffect(() => {
      logged();
    }, [])

    // console.log(user.displayName);

    // Create new document from within code
    const addDocument = async (Zip: number, City: string, Latitude: number, Longitude: number, State: string, State_Abbreviation: string) => {
      await setDoc(doc(db, "location", "User Data3"), {
        Zip,
        City,
        Latitude,
        Longitude,
        State,
        State_Abbreviation,
      });
    }

    const addZip = async(Zip: number) => {
      await setDoc(doc(db, "location", "User Data2"), {
        Zip,
      });
    }

    const addCity = async(City: string) => {
      await setDoc(doc(db, "location", "User Data2"), {
        City,
      })
    }

    const addLat = async(Latitude: number) => {
      await setDoc(doc(db, "location", "User Data2"), {
        Latitude,
      })
    }

    const addLong = async(Longitude: number) => {
      await setDoc(doc(db, "location", "User Data2"), {
        Longitude,
      })
    }

    const addState = async(State: string) => {
      await setDoc(doc(db, "location", "User Data2"), {
        State,
      })
    }

    const addStateAbbr = async(State_Abbreviation: string) => {
      await setDoc(doc(db, "location", "User Data2"), {
        State_Abbreviation,
      })
    }

    const deleteAll = async (Zip: number, City: string, Latitude: number, Longitude: number, State: string, State_Abbreviation: string) => {
      await updateDoc(doc(db, "location", "User Data3"), {
        Zip: deleteField(),
        City: deleteField(),
        Latitude: deleteField(),
        Longitude: deleteField(),
        State: deleteField(),
        State_Abbreviation: deleteField(),
      });
    }

    const zipRef = doc(db, "location", "User Data2");

    const deleteZip = async(Zip: number) => {
      await updateDoc(zipRef, {
        Zip: deleteField()
      })
    }

    const cityRef = doc(db, "location", "User Data2");

    const deleteCity = async(City: string) => {
      await updateDoc(cityRef, {
        City: deleteField()
      })
    }

    const latRef = doc(db, "location", "User Data2");

    const deleteLat = async(Latitude: number) => {
      await updateDoc(latRef, {
        Latitude: deleteField()
      })
    }

    const longRef = doc(db, "location", "User Data2");

    const deleteLong = async(Longitude: number) => {
      await updateDoc(longRef, {
        Longitude: deleteField()
      })
    }

    const stateRef = doc(db, "location", "User Data2");

    const deleteState = async(State: string) => {
      await updateDoc(stateRef, {
        State: deleteField()
      })
    }

    const abbrRef = doc(db, "location", "User Data2");

    const deleteAbbr = async(State_Abbreviation: string) => {
      await updateDoc(abbrRef, {
        State_Abbreviation: deleteField()
      })
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
<Button onClick={() => addDocument(zip, city, latCoord, longCoord, state, stateAbbreviation)} className={styles.dbButtons}>db All</Button>
<Button onClick={() => addZip(zip)} className={styles.dbButtons}>db Zip</Button>
<Button onClick={() => addCity(city)} className={styles.dbButtons}>db City</Button>
<Button onClick={() => addLat(latitude)} className={styles.dbButtons}>db Latitude</Button>
<Button onClick={() => addLong(longitude)} className={styles.dbButtons}>db Longitude</Button>
<Button onClick={() => addState(state)} className={styles.dbButtons}>db State</Button>
<Button onClick={() => addStateAbbr(stateAbbreviation)} className={styles.dbButtons}>db State Abbr</Button>

<Button onClick={() => deleteAll(zip, city, latCoord, longCoord, state, stateAbbreviation)} className={styles.clearButton}>Delete All</Button>
<Button onClick={() => deleteZip(zip)} className={styles.clearButton}>Delete Zip</Button>
<Button onClick={() => deleteCity(city)} className={styles.clearButton}>Delete City</Button>
<Button onClick={() => deleteLat(latitude)} className={styles.clearButton}>Delete Latitude</Button>
<Button onClick={() => deleteLong(longitude)} className={styles.clearButton}>Delete Longitude</Button>
<Button onClick={() => deleteState(state)} className={styles.clearButton}>Delete State</Button>
<Button onClick={() => deleteAbbr(stateAbbreviation)} className={styles.clearButton}>Delete State Abbr</Button>
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
