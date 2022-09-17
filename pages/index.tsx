import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import reverse from 'reverse-geocode';
import Container from '@mui/material/Container';
import Map from '../components/map';
import ZipClose from '../components/close_buttons/zipClose';
import CityClose from '../components/close_buttons/cityClose';
import LatClose from '../components/close_buttons/latClose';
import LongClose from '../components/close_buttons/longClose';
import StateClose from '../components/close_buttons/stateClose';
import AbbrClose from '../components/close_buttons/abbrClose';
import firebase from '../firebase/clientApp';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, getDocs, setDoc, deleteDoc, deleteField, updateDoc, collection, Timestamp } from 'firebase/firestore';
import Auth from '../components/Auth';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Local from '../components/localStorage';
import { getAuth } from '@firebase/auth';
import SideMenu from '../components/SideMenu';
import Draggable from 'react-draggable';
import OppLatClose from '../components/close_buttons/OppLatClose';
import OppLongClose from '../components/close_buttons/OppLongClose';
import ZipText from '../components/textTernary/zipTextTernary';
import CityText from '../components/textTernary/cityTextTernary';
import LatitudeText from '../components/textTernary/latitudeTextTernary';
import LongitudeText from '../components/textTernary/longitudeTextTernary';
import OppositeLatitudeText from '../components/textTernary/oppositeLatitudeTextTernary';
import OppositeLongitudeText from '../components/textTernary/oppositeLongitudeTextTernary';
import StateText from '../components/textTernary/stateTextTernary';
import StateAbbreviationText from '../components/textTernary/StateAbbrTextTernary';

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

// const auth = getAuth();
// const CurrentUser = auth.currentUser;
// console.log(CurrentUser.displayName);

const API_endpoint: string = process.env.API_ENDPOINT;
const API_key: string = process.env.API_KEY;

export default function Home() {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [responseData, setResponseData] = useState({});
    const [zip, setZip] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [latCoord, setLatCoord] = useState<string>('');
    const [longCoord, setLongCoord] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [stateAbbreviation, setStateAbbreviation] = useState<string>('');
    const [OppLat, setOppLat] = useState<string>('');
    const [OppLong, setOppLong] = useState<string>('');

    const auth = getAuth();
    const [user] = useAuthState(getAuth());

    useEffect(() => {
      document.body.style.overflowX = "hidden";
        return () => {
          document.body.style.overflowX = "visible";
        }
    }, []);

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //    console.log("Current user:", user);
    //    console.log(user.displayName);
    //     const uid = user.uid;
    //   } else {
    //     console.log("No user signed in");
    //   }
    // });

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
      setOppLat('');
      setOppLong('');
      console.log('%c cleared', 'color: red');
    }

    function opposite(): void {
        let oppositeLat: string = (parseFloat(latCoord) - (parseFloat(latCoord) * 2)).toFixed(6); 
        let oppositeLong: string = (parseFloat(longCoord) + 180).toFixed(6);
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
    }, []);

    // console.log(user.displayName);

    // Create new document from within code
    const addDocument = async (Zip: number, City: string, Latitude: number, Longitude: number, Opposite_Latitude: string, Opposite_Longitude: string, State: string, State_Abbreviation: string) => {
      await setDoc(doc(db, "location", "User Data3"), {
        Zip,
        City,
        Latitude,
        Longitude,
        Opposite_Latitude,
        Opposite_Longitude,
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

    const addOppLat = async(OppLat) => {
      await setDoc(doc(db, "location", "User Data2"), {
        OppLat,
      })
    }

    const addOppLong = async(OppLong) => {
      await setDoc(doc(db, "location", "User Data2"), {
        OppLong,
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

    const deleteAll = async (Zip: number, City: string, Latitude: number, Longitude: number, State: string, State_Abbreviation: string, Opposite_Latitude: string, Opposite_Longitude: string) => {
      await updateDoc(doc(db, "location", "User Data3"), {
        Zip: deleteField(),
        City: deleteField(),
        Latitude: deleteField(),
        Longitude: deleteField(),
        Opposite_Latitude: deleteField(),
        Opposite_Longitude: deleteField(),
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

    // const getZipDoc = async(Zip: number) => {
    //   let zipDocRef = doc(db, "location", "User Data2");
    //   let docSnap = await getDoc(zipDocRef);

    //   if(docSnap.exists) {
    //     alert('exists');
    //   } else {
    //     alert('No document exists');
    //   }
    // }

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

    const oppLatRef = doc(db, "location", "User Data2");

    const deleteOppositeLat = async(OppLat: number) => {
      await updateDoc(oppLatRef, {
        OppLat: deleteField()
      })
    }

    const oppLongRef = doc(db, "location", "User Data2");

    const deleteOppositeLong = async(OppLong: number) => {
      await updateDoc(oppLongRef, {
        OppLong: deleteField()
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
      <div style={{ position: 'relative', zIndex: '10' }}>
        <Auth />
      </div>
      <Local setZip={setZip} zip={zip} setCity={setCity} city={city} latCoord={latCoord} setLatCoord={setLatCoord} longCoord={longCoord} setLongCoord={setLongCoord} state={state} setState={setState} stateAbbreviation={stateAbbreviation} setStateAbbreviation={setStateAbbreviation} OppLat={OppLat} OppLong={OppLong} setOppLat={setOppLat} setOppLong={setOppLong} />
      <Container maxWidth="lg" style={{ marginTop: '2%', position: 'relative', zIndex: '10', transform: 'translate(22px, -55px)' }}>
        <Draggable>
          <div style={{ 
            color: 'white', 
            background: 'rgb(49, 62, 76, 0.8)', 
            position: 'absolute', 
            cursor: 'move', 
            fontSize: '40px', 
            fontWeight: '300', 
            padding: '15px 35px 15px 35px',
            minWidth: '345px'
          }}>
            {(zip || city || latCoord || longCoord || state || stateAbbreviation) ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '15px' }}>
                *Drag into position
              </div>
            </>
            ): null}
            <div>
              <ZipText zip={zip} />
              <div>{zip}</div>
              <ZipClose zip={zip} setZip={setZip} />
            </div>
            <div>
              <CityText city={city} />
              <div>{city}</div>
              <CityClose city={city} setCity={setCity} />
            </div>
            <div>
              <LatitudeText latCoord={latCoord} />
              <div>{latCoord}</div>
              <LatClose latCoord={latCoord} setLatCoord={setLatCoord} />
            </div>
            <div>
              <LongitudeText longCoord={longCoord} />
              <div>{longCoord}</div>
              <LongClose longCoord={longCoord} setLongCoord={setLongCoord} />
            </div>
            <div>
              <OppositeLatitudeText OppLat={OppLat} />
              <div>{OppLat}</div>
              <OppLatClose OppLat={OppLat} setOppLat={setOppLat} />
            </div>
            <div>
              <OppositeLongitudeText OppLong={OppLong} />
              <div>{OppLong}</div>
              <OppLongClose OppLong={OppLong} setOppLong={setOppLong} />
            </div>
            <div>
              <StateText state={state} />
              <div>{state}</div>
              <StateClose state={state} setState={setState} />
            </div>
            <div>
              <StateAbbreviationText stateAbbreviation={stateAbbreviation} />
              <div>{stateAbbreviation}</div>
              <AbbrClose stateAbbreviation={stateAbbreviation} setStateAbbreviation={setStateAbbreviation} />
            </div>
          </div>
        </Draggable>
      </Container>
      <SideMenu zipCode={zipCode} setZip={setZip} setCity={setCity} setLatCoord={setLatCoord} setLongCoord={setLongCoord} setState={setState} setStateAbbreviation={setStateAbbreviation} handleClear={handleClear} latCoord={latCoord} longCoord={longCoord} opposite={opposite} clearOpposite={clearOpposite} OppLat={OppLat} OppLong={OppLong} zip={zip} city={city} state={state} stateAbbreviation={stateAbbreviation} addZip={addZip} deleteZip={deleteZip} addCity={addCity} deleteCity={deleteCity} addLat={addLat} latitude={latitude} deleteLat={deleteLat} addLong={addLong} longitude={longitude} deleteLong={deleteLong} addState={addState} deleteState={deleteState} addStateAbbr={addStateAbbr} deleteAbbr={deleteAbbr} addDocument={addDocument} deleteAll={deleteAll} addOppLat={addOppLat} addOppLong={addOppLong} deleteOppositeLat={deleteOppositeLat} deleteOppositeLong={deleteOppositeLong} />
      <div style={{ transform: 'translateY(-530px)' }}>
        <Map latCoord={latCoord} longCoord={longCoord} />
      </div>
    </>
  );
}
