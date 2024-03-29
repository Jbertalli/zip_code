import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import NodeMap from '../components/Nodemap';
import AntinodeMap from '../components/Antinodemap';
import Header from '../components/Header';
import MobileNodeMap from '../components/MobileNodeMap';
import MobileAntinodeMap from '../components/MobileAntinodeMap';
import { auth } from '../firebase/clientApp';
import MobileHeader from '../components/MobileHeader';
import disableScroll from 'disable-scroll';

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

  disableScroll.off();

  return (
    <>
      <Head>
        <title>Antinode Map</title>
        <meta name="description" content="antinode" />
      </Head>
      {desktop ? (
        <>
          <div
            style={{
                top: '0px',
                height: '100%',
                marginTop: '0px'
            }}
          >
            <Header />
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
          <MobileHeader />
          <div>
            <div
              style={{
                background: '#313e4c',
                width: '100%',
                height: '20px',
                position: 'absolute',
                zIndex: '10',
                top: '54px',
                borderTop: '.5px solid #FFFFFF90',
                borderBottom: '.5px solid #FFFFFF90'
              }}
            />
            <div
              style={{
                fontSize: '15px',
                fontWeight: '300',
                position: 'absolute',
                zIndex: '10',
                transform: 'translate(50%, 54px)',
                width: '50%',
                display: 'flex',
                justifyContent: 'center'
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
