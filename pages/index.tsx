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
import { getFirestore, doc, getDocs, setDoc, deleteField, updateDoc, collection, Timestamp } from 'firebase/firestore';
// import Auth from '../components/Auth';
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
import WeatherText from '../components/textTernary/weatherTextTernary';
import WeatherClose from '../components/close_buttons/weatherClose';
import CurrentTempText from '../components/textTernary/currentTempTextTernary';
import CurrentTempClose from '../components/close_buttons/currentTempClose';
import TempRangeText from '../components/textTernary/tempRangeTextTernary';
import TempRangeClose from '../components/close_buttons/tempRangeClose';

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
    const [weatherData, setWeatherData] = useState<string>('');
    const [currentTempData, setCurrentTempData] = useState<string>('');
    const [tempRangeData, setTempRangeData] = useState<string>('');
    const [userInfo, setUserInfo] = useState([]);
    const [scale, setScale] = useState<string>('translate(22px, 6px)');
    const [flex, setFlex] = useState<string>('');
    const [center, setCenter] = useState<string>('');

    const auth = getAuth();
    const [user] = useAuthState(getAuth());

    useEffect(() => {
      if (window.innerWidth > 440) {
        setScale('translate(22px, 6px)');
        setFlex('');
        setCenter('');
      } else {
        setScale('translate(22px, 6px) scale(0.7)');
        setFlex('flex');
        setCenter('center');
      }

      const updateMedia = () => {
          if (window.innerWidth > 440) {
            setScale('translate(22px, 6px)');
            setFlex('');
            setCenter('');
          } else {
            setScale('translate(22px, 6px) scale(0.7)');
            setFlex('flex');
            setCenter('center');
          }
      };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

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
      setWeatherData('');
      setCurrentTempData('');
      setTempRangeData('');
      console.log('%c cleared', 'color: red');
    }

    function opposite(): void {
        let oppositeLat: string = (parseFloat(latCoord) - (parseFloat(latCoord) * 2)).toFixed(6); 
        let oppositeLong: string = (parseFloat(longCoord) + 180).toFixed(6);
        setOppLat(oppositeLat);
        setOppLong(oppositeLong);
    }

    const KelvinTemp = responseData?.main?.temp;
    const KelvinMaxTemp = responseData?.main?.temp_max;
    const KelvinMinTemp = responseData?.main?.temp_min;
    const weather = responseData?.weather?.[0]?.description;

    // console.log(responseData);
    // console.log(KelvinTemp);
    // console.log(KelvinMaxTemp);
    // console.log(KelvinMinTemp);
    // console.log(weather);

    const currentTemp = `${Math.round(1.8 * (KelvinTemp - 273) + 32)}°F`;
    // console.log(`%cCurrent Temperature: ${currentTemp}`, 'color: blue');

    const maxTemp = `${Math.round(1.8 * (KelvinMaxTemp - 273) + 32)}°F`;
    // console.log(`Maximum Temperature: ${maxTemp}`);

    const minTemp = `${Math.round(1.8 * (KelvinMinTemp - 273) + 32)}°F`;
    // console.log(`Minimum Temperature: ${minTemp}`);
  
    const tempRange = `${minTemp} - ${maxTemp}`;
    // console.log(`%cTemperature Range: ${tempRange}`, 'color: red');

    // console.log data
    let logged = async () => {
      const colRef = collection(db, "location");
      const docsSnap = await getDocs(colRef);
        docsSnap.forEach(doc => {
          // console.log(doc.data());
          setUserInfo(docsSnap.docs.map(doc => ({
            id: doc.id,
            Zip: doc.data().Zip,
            City: doc.data().City,
            Latitude: doc.data().Latitude,
            Longitude: doc.data().Longitude,
            Opposite_Latitude: doc.data().Opposite_Latitude,
            Opposite_Longitude: doc.data().Opposite_Longitude,
            State: doc.data().State,
            State_Abbreviation: doc.data().State_Abbreviation,
            Weather: doc.data().Weather,
            CurrentTemp: doc.data().CurrentTemp,
            TempRange: doc.data().TempRange,
        })))
      })
    }
    
    useEffect(() => {
      logged();
    }, []);

    let dbId = userInfo?.[0]?.id;
    let dbZip = userInfo?.[0]?.Zip;
    let dbCity = userInfo?.[0]?.City;
    let dbLatitude = userInfo?.[0]?.Latitude;
    let dbLongitude = userInfo?.[0]?.Longitude;
    let dbOppositeLatitude = userInfo?.[0]?.Opposite_Latitude;
    let dbOppositeLongitude = userInfo?.[0]?.Opposite_Longitude;
    let dbState = userInfo?.[0]?.State;
    let dbStateAbbreviation = userInfo?.[0]?.State_Abbreviation;
    let dbWeather = userInfo?.[0]?.Weather;
    let dbCurrentTemp = userInfo?.[0]?.CurrentTemp;
    let dbTempRange = userInfo?.[0]?.TempRange;

    // console.log(dbId);
    // console.log(dbZip);
    // console.log(dbCity);
    // console.log(dbLatitude);
    // console.log(dbLongitude);
    // console.log(dbOppositeLatitude);
    // console.log(dbOppositeLongitude);
    // console.log(dbState);
    // console.log(dbStateAbbreviation);
    // console.log(dbWeather);
    // console.log(dbCurrentTemp);
    // console.log(dbTempRange);

    // console.log(user.displayName);

    // Create new document from within code
    const addDocument = async (Zip: number, City: string, Latitude: number, Longitude: number, Opposite_Latitude: string, Opposite_Longitude: string, State: string, State_Abbreviation: string, Weather: string, CurrentTemp: string, TempRange: string) => {
      await setDoc(doc(db, "location", "User Data2"), {
        Zip,
        City,
        Latitude,
        Longitude,
        Opposite_Latitude,
        Opposite_Longitude,
        State,
        State_Abbreviation,
        Weather,
        CurrentTemp,
        TempRange,
        Created: Timestamp.now()
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

    const addOppLat = async(Opposite_Latitude) => {
      await setDoc(doc(db, "location", "User Data2"), {
        Opposite_Latitude,
      })
    }

    const addOppLong = async(Opposite_Longitude) => {
      await setDoc(doc(db, "location", "User Data2"), {
        Opposite_Longitude,
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

    const addWeather = async(Weather: string) => {
      await setDoc(doc(db, "location", "User Data2"), {
        Weather,
      })
    }

    const addCurrentTemp = async(CurrentTemp: string) => {
      await setDoc(doc(db, "location", "User Data2"), {
        CurrentTemp,
      })
    }

    const addTempRange = async(TempRange: string) => {
      await setDoc(doc(db, "location", "User Data2"), {
        TempRange,
      })
    }

    const deleteAll = async (Zip: number, City: string, Latitude: number, Longitude: number, State: string, State_Abbreviation: string, Opposite_Latitude: string, Opposite_Longitude: string, Weather: string, CurrentTemp: string, TempRange: string) => {
      await updateDoc(doc(db, "location", "User Data2"), {
        Zip: deleteField(),
        City: deleteField(),
        Latitude: deleteField(),
        Longitude: deleteField(),
        Opposite_Latitude: deleteField(),
        Opposite_Longitude: deleteField(),
        State: deleteField(),
        State_Abbreviation: deleteField(),
        Weather: deleteField(),
        CurrentTemp: deleteField(),
        TempRange: deleteField(),
        Created: deleteField(),
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

    const oppLatRef = doc(db, "location", "User Data2");

    const deleteOppositeLat = async(Opposite_Latitude: number) => {
      await updateDoc(oppLatRef, {
        Opposite_Latitude: deleteField()
      })
    }

    const oppLongRef = doc(db, "location", "User Data2");

    const deleteOppositeLong = async(Opposite_Longitude: number) => {
      await updateDoc(oppLongRef, {
        Opposite_Longitude: deleteField()
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

    const weatherRef = doc(db, "location", "User Data2");

    const deleteWeather = async(Weather: string) => {
      await updateDoc(weatherRef, {
        Weather: deleteField()
      })
    }

    const currentRef = doc(db, "location", "User Data2");

    const deleteCurrentTemp = async(CurrentTemp: string) => {
      await updateDoc(currentRef, {
        CurrentTemp: deleteField()
      })
    }

    const tempRangeRef = doc(db, "location", "User Data2");

    const deleteTempRange = async(TempRange: string) => {
      await updateDoc(tempRangeRef, {
        TempRange: deleteField()
      })
    }

  return (
    <>
      <Head>
        <title>Zip Code</title>
        <meta name="description" content="zip code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div style={{ position: 'relative', zIndex: '10' }}>
        <Auth />
      </div> */}
      <Local setZip={setZip} zip={zip} setCity={setCity} city={city} latCoord={latCoord} setLatCoord={setLatCoord} longCoord={longCoord} setLongCoord={setLongCoord} state={state} setState={setState} stateAbbreviation={stateAbbreviation} setStateAbbreviation={setStateAbbreviation} OppLat={OppLat} OppLong={OppLong} setOppLat={setOppLat} setOppLong={setOppLong} weatherData={weatherData} setWeatherData={setWeatherData} currentTempData={currentTempData} setCurrentTempData={setCurrentTempData} tempRangeData={tempRangeData} setTempRangeData={setTempRangeData} />
      <Container maxWidth="lg" style={{ transform: `${scale}`, display: `${flex}`, justifyContent: `${center}`, marginTop: '2%', position: 'relative', zIndex: '10' }}>
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
            <div>
              <WeatherText weatherData={weatherData} />
              <div style={{ textTransform: 'capitalize' }}>{weatherData}</div>
              <WeatherClose weatherData={weatherData} setWeatherData={setWeatherData} />
            </div>
            <div>
              <CurrentTempText currentTempData={currentTempData} />
              <div style={{ textTransform: 'capitalize' }}>{currentTempData}</div>
              <CurrentTempClose currentTempData={currentTempData} setCurrentTempData={setCurrentTempData} />
            </div>
            <div>
              <TempRangeText tempRangeData={tempRangeData} />
              <div style={{ textTransform: 'capitalize' }}>{tempRangeData}</div>
              <TempRangeClose tempRangeData={tempRangeData} setTempRangeData={setTempRangeData} />
            </div>
          </div>
        </Draggable>
      </Container>
      <SideMenu zipCode={zipCode} setZip={setZip} setCity={setCity} setLatCoord={setLatCoord} setLongCoord={setLongCoord} setState={setState} setStateAbbreviation={setStateAbbreviation} handleClear={handleClear} latCoord={latCoord} longCoord={longCoord} opposite={opposite} OppLat={OppLat} OppLong={OppLong} zip={zip} city={city} state={state} stateAbbreviation={stateAbbreviation} addZip={addZip} deleteZip={deleteZip} addCity={addCity} deleteCity={deleteCity} addLat={addLat} latitude={latitude} deleteLat={deleteLat} addLong={addLong} longitude={longitude} deleteLong={deleteLong} addState={addState} deleteState={deleteState} addStateAbbr={addStateAbbr} deleteAbbr={deleteAbbr} addDocument={addDocument} deleteAll={deleteAll} addOppLat={addOppLat} addOppLong={addOppLong} deleteOppositeLat={deleteOppositeLat} deleteOppositeLong={deleteOppositeLong} dbId={dbId} dbZip={dbZip} dbCity={dbCity} dbLatitude={dbLatitude} dbLongitude={dbLongitude} dbOppositeLatitude={dbOppositeLatitude} dbOppositeLongitude={dbOppositeLongitude} dbState={dbState} dbStateAbbreviation={dbStateAbbreviation} weather={weather} setWeatherData={setWeatherData} weatherData={weatherData} currentTemp={currentTemp} currentTempData={currentTempData} setCurrentTempData={setCurrentTempData} tempRange={tempRange} tempRangeData={tempRangeData} setTempRangeData={setTempRangeData} addWeather={addWeather} deleteWeather={deleteWeather} addCurrentTemp={addCurrentTemp} deleteCurrentTemp={deleteCurrentTemp} addTempRange={addTempRange} deleteTempRange={deleteTempRange} />
      <div style={{ transform: 'translateY(-469.7px)' }}>
        <Map latCoord={latCoord} longCoord={longCoord} />
      </div>
    </>
  );
}
