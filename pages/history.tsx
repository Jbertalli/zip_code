import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getFirestore, getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@firebase/auth';
import Header from '../components/Header';
import { Table, TableCell, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../firebase/clientApp';

auth;
const db = getFirestore();

export default function History() {
  const [user, loading] = useAuthState(getAuth());
  const [desktop, setDesktop] = useState(false);
  const [showZip, setShowZip] = useState<string>('');
  const [showCity, setShowCity] = useState<string>('');
  const [showLatitude, setShowLatitude] = useState<string>('');
  const [showLongitude, setShowLongitude] = useState<string>('');
  const [showOpposite_Latitude, setShowOpposite_Latitude] = useState<string>('');
  const [showOpposite_Longitude, setShowOpposite_Longitude] = useState<string>('');
  const [showState, setShowState] = useState<string>('');
  const [showState_Abbreviation, setShowState_Abbreviation] = useState<string>('');
  const [showWeather, setShowWeather] = useState<string>('');
  const [showCurrentTemp, setShowCurrentTemp] = useState<string>('');
  const [showTempRange, setShowTempRange] = useState<string>('');
  const router = useRouter();

  const currentUser = auth.currentUser?.uid;
  console.log(currentUser);

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

//   let logged = async () => {
//     const colRef = collection(db, 'location');
//     const docsSnap = await getDocs(colRef);
//     docsSnap.forEach((doc) => {
//       // console.log(doc.data());
//       setUserInfo(
//         docsSnap.docs.map((doc) => ({
//           id: doc.id,
//           Zip: doc.data().Zip,
//           City: doc.data().City,
//           Latitude: doc.data().Latitude,
//           Longitude: doc.data().Longitude,
//           Opposite_Latitude: doc.data().Opposite_Latitude,
//           Opposite_Longitude: doc.data().Opposite_Longitude,
//           State: doc.data().State,
//           State_Abbreviation: doc.data().State_Abbreviation,
//           Weather: doc.data().Weather,
//           CurrentTemp: doc.data().CurrentTemp,
//           TempRange: doc.data().TempRange,
//         }))
//       );
//     });
//   };

//   useEffect(() => {
//     logged();
//   }, []);
  
  async function getData() {
    // const docRef = doc(db, 'users', currentUser);
    const docRef = doc(db, '/users/' + currentUser + 'Data');
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      // console.log('User:', docSnap.data().user);
      console.log('Document zip:', docSnap.data().Zip);
      console.log('Document city:', docSnap.data().City);
      console.log('Document latitude:', docSnap.data().Latitude);
      console.log('Document longitude:', docSnap.data().Longitude);
      console.log('Document opposite_Latitude:', docSnap.data().Opposite_Latitude);
      console.log('Document opposite_Longitude:', docSnap.data().Opposite_Longitude);
      console.log('Document state:', docSnap.data().State);
      console.log('Document state_Abbreviation:', docSnap.data().State_Abbreviation);
      console.log('Document weather:', docSnap.data().Weather);
      console.log('Document currentTemp:', docSnap.data().CurrentTemp);
      console.log('Document tempRange:', docSnap.data().TempRange);
      setShowZip(docSnap.data().Zip);
      setShowCity(docSnap.data().City);
      setShowLatitude(docSnap.data().Latitude);
      setShowLongitude(docSnap.data().Longitude);
      setShowOpposite_Latitude(docSnap.data().Opposite_Latitude);
      setShowOpposite_Longitude(docSnap.data().Opposite_Longitude);
      setShowState(docSnap.data().State);
      setShowState_Abbreviation(docSnap.data().State_Abbreviation);
      setShowWeather(docSnap.data().Weather);
      setShowCurrentTemp(docSnap.data().CurrentTemp);
      setShowTempRange(docSnap.data().TempRange);
    } else {
      console.log('No document data');
    }
  }

//   let dbId = userInfo?.[0]?.id;
//   let dbZip = userInfo?.[0]?.Zip;
//   let dbCity = userInfo?.[0]?.City;
//   let dbLatitude = userInfo?.[0]?.Latitude;
//   let dbLongitude = userInfo?.[0]?.Longitude;
//   let dbOppositeLatitude = userInfo?.[0]?.Opposite_Latitude;
//   let dbOppositeLongitude = userInfo?.[0]?.Opposite_Longitude;
//   let dbState = userInfo?.[0]?.State;
//   let dbStateAbbreviation = userInfo?.[0]?.State_Abbreviation;
//   let dbWeather = userInfo?.[0]?.Weather;
//   let dbTemp = userInfo?.[0]?.CurrentTemp;
//   let dbRange = userInfo?.[0]?.TempRange;

  //   console.log(dbId);
  //   console.log(dbZip);
  //   console.log(dbCity);
  //   console.log(dbLatitude);
  //   console.log(dbLongitude);
  //   console.log(dbOppositeLatitude);
  //   console.log(dbOppositeLongitude);
  //   console.log(dbState);
  //   console.log(dbStateAbbreviation);
  //   console.log(dbWeather);
  //   console.log(dbTemp);
  //   console.log(dbRange);

  useEffect(() => {
    // view cookie length for debugging
    // console.log(document.cookie);
    // console.log(document.cookie.length);
    if (typeof window !== 'undefined') {
      if (document.cookie.length > 46) {
        console.log('Authenticated!');
      } else {
        router.push('/login');
      }
    } else {
      console.log('window == undefined');
    }
  }, []);

  // console.log(user?.email);
  // console.log(user.displayName);

  let nameHeader;

  if (user?.displayName == null) {
    nameHeader = `${user?.email}'s`;
  } else {
    nameHeader = `${user.displayName}'s`;
  }

  useEffect(() => {
    getData();
  }, []);

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   };

  return (
    <>
      <Head>
        <title>User Information</title>
        <meta name="description" content="history" />
      </Head>
      {user ? (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
            <Header />
            </div>
        </div>
        {loading ? (
            <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                style={{
                    position: 'absolute',
                    transform: 'translateY(45vh) scale(2.0)',
                }}
                >
                    <CircularProgress />
                </div>
            </div>
            </>
        ) : (
            <>
            <div 
                style={{ 
                    transform: desktop ? 'translateY(18%)' : 'translate(6%, 8%)'
                }}
                onMouseEnter={getData}
                onMouseLeave={getData}
            >
                <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    transform: 'translate(25px, 10%)',
                }}
                >
                <span
                    style={{
                    fontSize: desktop ? '40px' : '30px',
                    fontWeight: '300',
                    width: desktop ? '550px' : '500px',
                    }}
                >
                    {user ? <>{nameHeader}&nbsp;</> : null} Information
                </span>
                </div>
                <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    transform: desktop ? 'translate(0px)' : 'scale(0.8) translateY(-100px)',
                }}
                >
                <Table
                    style={{
                    width: '50%',
                    maxWidth: '700px',
                    minWidth: '300px',
                    padding: '10px',
                    }}
                >
                    <TableRow>
                    <TableCell />
                    <TableCell />
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Zip Code
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbZip} */}
                        {showZip}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        City
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbCity} */}
                        {showCity}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Latitude
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbLatitude} */}
                        {showLatitude}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Longitude
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbLongitude} */}
                        {showLongitude}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Antinode Latitude
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbOppositeLatitude} */}
                        {showOpposite_Latitude}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Antinode Longitude
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbOppositeLongitude} */}
                        {showOpposite_Longitude}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        State
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbState} */}
                        {showState}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        State Abbreviation
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbStateAbbreviation} */}
                        {showState_Abbreviation}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Weather
                    </TableCell>
                    <TableCell
                        style={{
                        transform: 'translate(2vw)',
                        fontSize: '25px',
                        textTransform: 'capitalize',
                        }}
                    >
                        {/* {dbWeather} */}
                        {showWeather}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Current Temperature
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbTemp} */}
                        {showCurrentTemp}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        style={{ transform: 'translate(3vw)', fontSize: '25px' }}
                    >
                        Temperature Range
                    </TableCell>
                    <TableCell
                        style={{ transform: 'translate(2vw)', fontSize: '25px' }}
                    >
                        {/* {dbRange} */}
                        {showTempRange}
                    </TableCell>
                    </TableRow>
                </Table>
                </div>
            </div>
            </>
        )}
      </>
      ): null}
    </>
  );
}
