import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Tab from '@mui/material/Tab';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Header() {
  const [homeColor, setHomeColor] = useState<string>('');
  const [antinodeColor, setAntinodeColor] = useState<string>('');
  const [historyColor, setHistoryColor] = useState<string>('');
  const [loginColor, setLoginColor] = useState<string>('');
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      setHomeColor('#FFFFFF20');
    } else if (router.pathname === '/antinode_map') {
      setAntinodeColor('#FFFFFF20');
    } else if (router.pathname === '/history') {
      setHistoryColor('#FFFFFF20');
    } else if (router.pathname === '/login') {
      setLoginColor('#FFFFFF20');
    } else {
      return;
    }
  }, []);

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push('/login');
        document.cookie = 'name=; expires=Thu, 01 Jan 1970';
        console.log('%c signed out', 'color: red');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  function deleteLocal() {
    localStorage.clear();
  }

  return (
    <>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'fixed',
            zIndex: '10000'
          }}
        >
          <div 
            style={{ 
              transform: 'translateY(5px)',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Link href="/" passHref>
              <Tab
                style={{
                  background: `${homeColor}`,
                  fontSize: '25px',
                  fontWeight: '400',
                  textTransform: 'none',
                  color: 'white'
                }}
                label="Home"
              />
            </Link>
            <Link href="/antinode_map" passHref>
              <Tab
                style={{
                  background: `${antinodeColor}`,
                  fontSize: '25px',
                  fontWeight: '400',
                  textTransform: 'none',
                  color: 'white'
                }}
                label="Antinode Map"
              />
            </Link>
            {user ? (
              <>
                <Link href="/history" passHref>
                  <Tab
                    style={{
                      background: `${historyColor}`,
                      fontSize: '25px',
                      fontWeight: '400',
                      textTransform: 'none',
                      color: 'white'
                    }}
                    label="User Info"
                  />
                </Link>
                <Tab
                  onClick={() => {SignOut(), deleteLocal()}}
                  style={{
                    fontSize: '25px',
                    fontWeight: '400',
                    textTransform: 'none',
                    color: 'white'
                  }}
                  label="Log Out"
                />
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Tab
                    style={{
                      background: `${loginColor}`,
                      fontSize: '25px',
                      fontWeight: '400',
                      textTransform: 'none',
                      color: 'white'
                    }}
                    label="Login"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
