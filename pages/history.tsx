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
import MobileHeader from '../components/MobileHeader';

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
  
  async function getData() {
    const docRef = doc(db, '/users/' + currentUser + 'Data');
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
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

  let nameHeader;

  if (user?.displayName == null) {
    nameHeader = `${user?.email}'s`;
  } else {
    nameHeader = `${user.displayName}'s`;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>User Information</title>
        <meta name="description" content="history" />
      </Head>
      {desktop ? (
      <>
        <Header />
      </>
      ):(
      <>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    transform: 'translate(20px) scale(1.1)',
                    position: 'fixed',
                    zIndex: '1'
                }}
            >
                <MobileHeader />
            </div>
        </div>
      </>
      )}
      {user ? (
      <>
        {loading ? (
            <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                style={{
                    position: 'absolute',
                    transform: 'translateY(45vh) scale(2.0)'
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
                        transform: desktop ? 'translateY(12%)' : 'translate(6%, 8%)',
                        paddingBottom: desktop ? '100px': null
                    }}
                    onMouseEnter={getData}
                    onMouseLeave={getData}
                >
                    <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        transform: 'translate(25px, 10%)'
                    }}
                    >
                        <span
                            style={{
                                fontSize: desktop ? '40px' : '30px',
                                fontWeight: '300',
                                width: desktop ? '550px' : '500px'
                            }}
                        >
                            {user ? <>{nameHeader}&nbsp;</> : null} Information
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            transform: desktop ? 'translate(0px)' : 'scale(0.8) translateY(-100px)'
                        }}
                    >
                        <Table
                            style={{
                                width: '50%',
                                maxWidth: '700px',
                                minWidth: '300px',
                                padding: '10px'
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
