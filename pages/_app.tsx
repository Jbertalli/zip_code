import '../styles/globals.css';
import Head from 'next/head';
import { store } from '../store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { auth } from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import MobileHeader from '../components/MobileHeader';

auth;

function MyApp({ Component, pageProps }) {
  const [desktop, setDesktop] = useState<boolean>(true);
  const [user] = useAuthState(auth);
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    console.log(window.document.cookie.length);
    if (user || window.document.cookie.length > 222 || router.pathname === '/' || router.pathname === '/antinode_map') {
      console.log('Signed In or Public Page');
    } else if (user === null && window.document.cookie.length === 222 && router.pathname === '/history') {
      router.push('/login');
      console.log('Cannot access this page without logging in');
    } else {
      console.log('done');
    }
  }, [user]);

  if (user === null && router.pathname === '/history') {
    return null;
  }

  // useEffect(() => {
  //   if (window.innerWidth > 440) {
  //     setDesktop(true);
  //   } else {
  //     setDesktop(false);
  //   }

  //   const updateMedia = () => {
  //     if (window.innerWidth > 440) {
  //       setDesktop(true);
  //     } else {
  //       setDesktop(false);
  //     }
  //   };
  //   window.addEventListener('resize', updateMedia);
  //   return () => window.removeEventListener('resize', updateMedia);
  // }, []);

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          sizes="32x32"
          href="/images/antinode_logo.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/antinode_logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/antinode_logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/antinode_logo.png"
        />
      </Head>
      {/* {(isPortrait && router.pathname === '/') ? (
      <>
        <div>
          <MobileHeader /> 
        </div>
      </>
      ): null} */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
