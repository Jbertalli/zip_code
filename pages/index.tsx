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
import { getFirestore, doc, getDocs, setDoc, deleteField, updateDoc, collection, Timestamp } from 'firebase/firestore';
import Local from '../components/localStorage';
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
import { auth } from '../firebase/clientApp';
import { store } from '../store';
import { incrementZip } from '../slices/zipSlice';
import { incrementCity } from '../slices/citySlice';
import { incrementLatCoord } from '../slices/latCoordSlice';
import { incrementLongCoord } from '../slices/longCoordSlice';
import { incrementState } from '../slices/stateSlice';
import { incrementStateAbbreviation } from '../slices/stateAbbreviationSlice';
import { incrementOppLat } from '../slices/OppLatSlice';
import { incrementOppLong } from '../slices/OppLongSlice';
import { incrementWeatherData } from '../slices/weatherSlice';
import { incrementCurrentTempData } from '../slices/currentTempDataSlice';
import { incrementTempRangeData } from '../slices/tempRangeDataSlice';
import { incrementLatitude } from '../slices/latitudeSlice';
import { incrementLongitude } from '../slices/longitudeSlice';

auth;
const db = getFirestore();

const API_endpoint: string = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_key: string = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [latitude, setLatitude] = useState<number>(null);
  const [longitude, setLongitude] = useState<number>(null);
  const [responseData, setResponseData] = useState<any>({});
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
  const [desktop, setDesktop] = useState(false);

  const currentUser = auth.currentUser?.uid;
  console.log(currentUser);

  useEffect(() => {
    store.dispatch(incrementZip(String(zip)));
    store.dispatch(incrementCity(String(city)));
    store.dispatch(incrementLatCoord(String(latCoord)));
    store.dispatch(incrementLongCoord(String(longCoord)));
    store.dispatch(incrementState(String(state)));
    store.dispatch(incrementStateAbbreviation(String(stateAbbreviation)));
    store.dispatch(incrementOppLat(String(OppLat)));
    store.dispatch(incrementOppLong(String(OppLong)));
    store.dispatch(incrementWeatherData(String(weatherData)));
    store.dispatch(incrementCurrentTempData(String(currentTempData)));
    store.dispatch(incrementTempRangeData(String(tempRangeData)));
    store.dispatch(incrementLatitude(Number(latitude)));
    store.dispatch(incrementLongitude(Number(longitude)));
  }, [
      zip ||
      city ||
      latCoord ||
      longCoord ||
      state ||
      stateAbbreviation ||
      weatherData ||
      currentTempData ||
      tempRangeData ||
      latitude ||
      longitude,
  ]);

  useEffect(() => {
    store.dispatch(incrementOppLat(String(OppLat)));
    store.dispatch(incrementOppLong(String(OppLong)));
  }, [OppLat || OppLong]);

  console.log(store.getState());

  useEffect(() => {
    if (window.innerWidth > 440) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 440) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'visible';
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    //fetch data with axios
    let finalAPIEndPoint: string = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`;
    axios.get(finalAPIEndPoint).then((response) => {
      setResponseData(response.data);
    });
  }, [latitude, longitude]);

  // syracuse coordinates for testing
  // let zipCode = reverse.lookup(43.0481, -76.1474, 'us');
  let zipCode: any = reverse.lookup(latitude, longitude, 'us');
  console.log(zipCode);

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
    let oppositeLat: string = (
      parseFloat(latCoord) -
      parseFloat(latCoord) * 2
    ).toFixed(6);
    let oppositeLong: string = (parseFloat(longCoord) + 180).toFixed(6);
    setOppLat(oppositeLat);
    setOppLong(oppositeLong);
  }

  const KelvinTemp = responseData?.main?.temp;
  const KelvinMaxTemp = responseData?.main?.temp_max;
  const KelvinMinTemp = responseData?.main?.temp_min;
  const weather = responseData?.weather?.[0]?.description;

  const currentTemp = `${Math.round(1.8 * (KelvinTemp - 273) + 32)}°F`;
  const maxTemp = `${Math.round(1.8 * (KelvinMaxTemp - 273) + 32)}°F`;
  const minTemp = `${Math.round(1.8 * (KelvinMinTemp - 273) + 32)}°F`;
  const tempRange = `${minTemp} - ${maxTemp}`;

  // Create new document from within code
  const addDocument = async (
    Zip: number,
    City: string,
    Latitude: number,
    Longitude: number,
    Opposite_Latitude: string,
    Opposite_Longitude: string,
    State: string,
    State_Abbreviation: string,
    Weather: string,
    CurrentTemp: string,
    TempRange: string
  ) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
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
      Created: Timestamp.now(),
    });
  };

  const addZip = async (Zip: number) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      Zip,
    });
  };

  const addCity = async (City: string) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      City,
    });
  };

  const addLat = async (Latitude: number) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      Latitude,
    });
  };

  const addLong = async (Longitude: number) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      Longitude,
    });
  };

  const addOppLat = async (Opposite_Latitude) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      Opposite_Latitude,
    });
  };

  const addOppLong = async (Opposite_Longitude) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      Opposite_Longitude,
    });
  };

  const addState = async (State: string) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      State,
    });
  };

  const addStateAbbr = async (State_Abbreviation: string) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      State_Abbreviation,
    });
  };

  const addWeather = async (Weather: string) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      Weather,
    });
  };

  const addCurrentTemp = async (CurrentTemp: string) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      CurrentTemp,
    });
  };

  const addTempRange = async (TempRange: string) => {
    await setDoc(doc(db, '/users/' + currentUser + 'Data'), {
      TempRange,
    });
  };

  const deleteAll = async (
    Zip: number,
    City: string,
    Latitude: number,
    Longitude: number,
    State: string,
    State_Abbreviation: string,
    Opposite_Latitude: string,
    Opposite_Longitude: string,
    Weather: string,
    CurrentTemp: string,
    TempRange: string
  ) => {
    await updateDoc(doc(db, '/users/' + currentUser + 'Data'), {
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
  };

  const zipRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteZip = async (Zip: number) => {
    await updateDoc(zipRef, {
      Zip: deleteField(),
    });
  };

  const cityRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteCity = async (City: string) => {
    await updateDoc(cityRef, {
      City: deleteField(),
    });
  };

  const latRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteLat = async (Latitude: number) => {
    await updateDoc(latRef, {
      Latitude: deleteField(),
    });
  };

  const longRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteLong = async (Longitude: number) => {
    await updateDoc(longRef, {
      Longitude: deleteField(),
    });
  };

  const oppLatRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteOppositeLat = async (Opposite_Latitude: number) => {
    await updateDoc(oppLatRef, {
      Opposite_Latitude: deleteField(),
    });
  };

  const oppLongRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteOppositeLong = async (Opposite_Longitude: number) => {
    await updateDoc(oppLongRef, {
      Opposite_Longitude: deleteField(),
    });
  };

  const stateRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteState = async (State: string) => {
    await updateDoc(stateRef, {
      State: deleteField(),
    });
  };

  const abbrRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteAbbr = async (State_Abbreviation: string) => {
    await updateDoc(abbrRef, {
      State_Abbreviation: deleteField(),
    });
  };

  const weatherRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteWeather = async (Weather: string) => {
    await updateDoc(weatherRef, {
      Weather: deleteField(),
    });
  };

  const currentRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteCurrentTemp = async (CurrentTemp: string) => {
    await updateDoc(currentRef, {
      CurrentTemp: deleteField(),
    });
  };

  const tempRangeRef = doc(db, '/users/' + currentUser + 'Data');

  const deleteTempRange = async (TempRange: string) => {
    await updateDoc(tempRangeRef, {
      TempRange: deleteField(),
    });
  };

  return (
    <>
      <Head>
        <title>Antinode Home</title>
        <meta name="description" content="zip code" />
      </Head>
      <Local
        setZip={setZip}
        setCity={setCity}
        setLatCoord={setLatCoord}
        setLongCoord={setLongCoord}
        setState={setState}
        setStateAbbreviation={setStateAbbreviation}
        setOppLat={setOppLat}
        setOppLong={setOppLong}
        setWeatherData={setWeatherData}
        setCurrentTempData={setCurrentTempData}
        setTempRangeData={setTempRangeData}
      />
      <Container
        maxWidth="lg"
        style={{
          transform: desktop ? 'translate(22px, 6px)' : 'translate(15px, 22px) scale(0.7)',
          display: desktop ? '' : 'flex',
          justifyContent: desktop ? '' : 'center',
          marginTop: '2%',
          position: 'relative',
          zIndex: '10'
        }}
      >
        <Draggable>
          <div
            style={{
              color: 'white',
              background: 'rgb(49, 62, 76, 0.8)',
              position: 'absolute',
              cursor: 'move',
              fontSize: '40px',
              fontWeight: '300',
              padding: '15px 35px 15px 35px',
              minWidth: '345px',
            }}
          >
            {zip ||
            city ||
            latCoord ||
            longCoord ||
            state ||
            stateAbbreviation ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    fontSize: '15px',
                  }}
                >
                  *Drag into position
                </div>
              </>
            ) : null}
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
              <AbbrClose
                stateAbbreviation={stateAbbreviation}
                setStateAbbreviation={setStateAbbreviation}
              />
            </div>
            <div>
              <WeatherText weatherData={weatherData} />
              <div style={{ textTransform: 'capitalize' }}>{weatherData}</div>
              <WeatherClose
                weatherData={weatherData}
                setWeatherData={setWeatherData}
              />
            </div>
            <div>
              <CurrentTempText currentTempData={currentTempData} />
              <div style={{ textTransform: 'capitalize' }}>
                {currentTempData}
              </div>
              <CurrentTempClose
                currentTempData={currentTempData}
                setCurrentTempData={setCurrentTempData}
              />
            </div>
            <div>
              <TempRangeText tempRangeData={tempRangeData} />
              <div style={{ textTransform: 'capitalize' }}>{tempRangeData}</div>
              <TempRangeClose
                tempRangeData={tempRangeData}
                setTempRangeData={setTempRangeData}
              />
            </div>
          </div>
        </Draggable>
      </Container>
      <SideMenu
        zipCode={zipCode}
        setZip={setZip}
        setCity={setCity}
        setLatCoord={setLatCoord}
        setLongCoord={setLongCoord}
        setState={setState}
        setStateAbbreviation={setStateAbbreviation}
        handleClear={handleClear}
        opposite={opposite}
        addZip={addZip}
        deleteZip={deleteZip}
        addCity={addCity}
        deleteCity={deleteCity}
        addLat={addLat}
        deleteLat={deleteLat}
        addLong={addLong}
        deleteLong={deleteLong}
        addState={addState}
        deleteState={deleteState}
        addStateAbbr={addStateAbbr}
        deleteAbbr={deleteAbbr}
        addDocument={addDocument}
        deleteAll={deleteAll}
        addOppLat={addOppLat}
        addOppLong={addOppLong}
        deleteOppositeLat={deleteOppositeLat}
        deleteOppositeLong={deleteOppositeLong}
        weather={weather}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        currentTemp={currentTemp}
        setCurrentTempData={setCurrentTempData}
        tempRange={tempRange}
        setTempRangeData={setTempRangeData}
        addWeather={addWeather}
        deleteWeather={deleteWeather}
        addCurrentTemp={addCurrentTemp}
        deleteCurrentTemp={deleteCurrentTemp}
        addTempRange={addTempRange}
        deleteTempRange={deleteTempRange}
      />
      <div style={{ transform: 'translateY(-469.7px)' }}>
        <Map
          latCoord={latCoord}
          longCoord={longCoord}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    </>
  );
}
