import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
              State_Abbreviation: doc.data().State_Abbreviation
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
      
      console.log(dbId);
      console.log(dbZip);
      console.log(dbCity);
      console.log(dbLatitude);
      console.log(dbLongitude);
      console.log(dbOppositeLatitude);
      console.log(dbOppositeLongitude);
      console.log(dbState);
      console.log(dbStateAbbreviation);

    return (
        <>
            <Head>
                <title>User Information</title>
                <meta name="description" content="history" />
            </Head>
            <div style={{ position: 'absolute', zIndex: '10000', right: '33vw', top: '5px' }}>
                <Tabs>
                    <Link href='/' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Home" />
                    </Link>
                    <Link href='/antinode_map' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                    </Link>
                    <Link href='/history' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="User Information" />
                    </Link>
                </Tabs>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '400', position: 'absolute', zIndex: '10000000', color: 'white', left: '16px', top: '21px' }}>
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
            </div>
        </>
    );
}
