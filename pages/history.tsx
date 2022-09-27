import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import Header from '../components/Header';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const clientCredential = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(clientCredential);
const db = getFirestore();

export default function History() {
    const [userInfo, setUserInfo] = useState([]);
    const [user] = useAuthState(getAuth());

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
    console.log(dbRange);

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
            <div style={{ margin: '65px 15% 0px 15%', display: 'flex', justifyContent: 'center', color: 'black' }}>
                <table style={{ border: '1px solid black', padding: '3%', background: 'rgb(255, 255, 255, 0.8)' }}>
                    <tr>
                        <th>
                            Category
                        </th>
                        <th>
                            <span>
                                {user ? (
                                <>
                                    {user.displayName}'s{' '}
                                </>
                                ): null}
                            </span>
                            <span>
                                Information
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            Zip Code
                        </td>
                        <td>
                            {dbZip}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            City
                        </td>
                        <td>
                            {dbCity}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Latitude
                        </td>
                        <td>
                            {dbLatitude}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Longitude
                        </td>
                        <td>
                            {dbLongitude}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Antinode Latitude
                        </td>
                        <td>
                            {dbOppositeLatitude}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Antinode Longitude
                        </td>
                        <td>
                            {dbOppositeLongitude}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            State
                        </td>
                        <td>
                            {dbState}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            State Abbreviation
                        </td>
                        <td>
                            {dbStateAbbreviation}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Weather
                        </td>
                        <td style={{ textTransform: 'capitalize' }}>
                            {dbWeather}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Current Temperature
                        </td>
                        <td>
                            {dbTemp}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Temperature Range
                        </td>
                        <td>
                            {dbRange}
                        </td>
                    </tr>
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Table style={{ width: '50%' }}>
                    <TableRow>
                        <TableCell>
                            <b>
                               1 
                            </b>
                        </TableCell>
                        <TableCell>
                            <b>
                                2
                            </b>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            3
                        </TableCell>
                        <TableCell>
                            4
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            5
                        </TableCell>
                        <TableCell>
                            6
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            7
                        </TableCell>
                        <TableCell>
                            8
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            9
                        </TableCell>
                        <TableCell>
                            10
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            11
                        </TableCell>
                        <TableCell>
                            12
                        </TableCell>
                    </TableRow>
                </Table>
            </div>
        </>
    );
}
