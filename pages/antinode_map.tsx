import Head from 'next/head';
import React, { useState, useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
import NodeMap from '../components/Nodemap';
import AntinodeMap from '../components/Antinodemap';
import Header from '../components/Header';
import MobileNodeMap from '../components/MobileNodeMap';
import MobileAntinodeMap from '../components/MobileAntinodeMap';
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

export default function Antinode() {
  const [desktop, setDesktop] = useState(false);

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

  return (
    <>
      <Head>
        <title>Antinode</title>
        <meta name="description" content="antinode" />
      </Head>
      {desktop ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
              <Header />
            </div>
          </div>
          <div
            style={{
              background: '#313e4c',
              width: '100%',
              height: '20px',
              position: 'absolute',
              zIndex: '10',
              top: '65px',
              borderTop: '.5px solid #FFFFFF90',
            }}
          />
          <div
            style={{
              fontSize: '15px',
              fontWeight: '300',
              opacity: '0.8',
              transform: 'translateY(65.5px)',
              position: 'absolute',
              zIndex: '10',
            }}
          >
            <div
              style={{
                position: 'absolute',
                transform: 'translate(20vw)',
                width: '300px',
              }}
            >
              Current Location
            </div>
            <div
              style={{
                position: 'absolute',
                transform: 'translate(70vw)',
                width: '300px',
              }}
            >
              Antinode Location
            </div>
          </div>
          <div>
            <NodeMap />
          </div>
          <div>
            <AntinodeMap />
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'absolute',
                zIndex: '10000',
                top: '5px',
                transform: 'translate(-21px, -5px) scale(0.88)',
              }}
            >
              <Header />
            </div>
          </div>
          <div>
            <div
              style={{
                background: '#313e4c',
                width: '100%',
                height: '20px',
                position: 'absolute',
                zIndex: '10',
                top: '45px',
                borderTop: '.5px solid #FFFFFF90',
                borderBottom: '.5px solid #FFFFFF90',
              }}
            />
            <div
              style={{
                fontSize: '15px',
                fontWeight: '300',
                position: 'absolute',
                zIndex: '10',
                transform: 'translate(50%, 45px)',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Current Location
            </div>
            <MobileNodeMap />
          </div>
          <div>
            <MobileAntinodeMap />
          </div>
        </>
      )}
    </>
  );
}
