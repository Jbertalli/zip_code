import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth';
// import { initializeApp } from 'firebase/app';
import Header from '../components/Header';
import { Table, TableCell, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../firebase/clientApp';

// const clientCredential = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = initializeApp(clientCredential);
auth;
const db = getFirestore();

export default function History() {
    const [userInfo, setUserInfo] = useState([]);
    const [user, loading] = useAuthState(getAuth());
    const [headerSize, setHeaderSize] = useState<string>('40px');
    const [mobileAspect, setMobileAspect] = useState<string>('translateY(22%)');
    const [mobileScale, setMobileScale] = useState<string>('translate(0px)');
    const router = useRouter();

    useEffect(() => {
        if (window.innerWidth > 440) {
            setHeaderSize('40px');
            setMobileAspect('translateY(22%)');
            setMobileScale('translate(0px)');
        } else {
            setHeaderSize('30px');
            setMobileAspect('translate(6%, 8%)');
            setMobileScale('scale(0.8) translateY(-100px)');
        }

        const updateMedia = () => {
            if (window.innerWidth > 440) {
                setHeaderSize('40px');
                setMobileAspect('translateY(22%)');
                setMobileScale('translate(0px)');
            } else {
                setHeaderSize('30px');
                setMobileAspect('translate(6%, 8%)');
                setMobileScale('scale(0.8) translateY(-100px)');
            }
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

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
      let dbTemp = userInfo?.[0]?.CurrentTemp;
      let dbRange = userInfo?.[0]?.TempRange;
      
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
        if (typeof window !== "undefined") {
            if (document.cookie.length > 46) {
                console.log('Authenticated!');
            } else {
                router.push('/login');
            }
        } else {
            console.log('window == undefined');
        }
    }, [])
    
    // console.log(user?.email);
    // console.log(user.displayName);

    let nameHeader;

    if (user?.displayName == null) {
        nameHeader = `${user?.email}'s`
    } else {
        nameHeader = `${user.displayName}'s`
    }

    return (
        <>
            <Head>
                <title>User Information</title>
                <meta name="description" content="history" />
            </Head>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
                    <Header />
                </div>
            </div>
            {loading ? (
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', transform: 'translateY(45vh) scale(2.0)' }}>
                        <CircularProgress />
                    </div>
                </div>
            </>
            ):(
            <>
                <div style={{ transform: `${mobileAspect}` }}>
                    <div style={{ display: 'flex', justifyContent: 'center', transform: 'translate(25px, 10%)' }}>
                        <span style={{ fontSize: `${headerSize}`, fontWeight: '300', width: '500px' }}>
                            {user ? (
                            <>
                                {nameHeader}&nbsp;
                            </>
                            ): null} Information
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', transform: `${mobileScale}` }}>
                        <Table style={{ width: '50%', maxWidth: '700px', minWidth: '300px', padding: '10px' }}>
                            <TableRow>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Zip Code
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbZip}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    City
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbCity}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Latitude
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbLatitude}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Longitude
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbLongitude}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Antinode Latitude
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbOppositeLatitude}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Antinode Longitude
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbOppositeLongitude}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    State
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbState}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    State Abbreviation
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbStateAbbreviation}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Weather
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px', textTransform: 'capitalize' }}>
                                    {dbWeather}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Current Temperature
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbTemp}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ transform: 'translate(3vw)', fontSize: '25px' }}>
                                    Temperature Range
                                </TableCell>
                                <TableCell style={{ transform: 'translate(2vw)', fontSize: '25px' }}>
                                    {dbRange}
                                </TableCell>
                            </TableRow>
                        </Table>
                    </div>
                </div>
            </>
            )}
        </>
    );
}
