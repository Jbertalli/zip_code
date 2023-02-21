import '../styles/globals.css';
import Head from 'next/head';
import { store } from '../store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { auth } from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect } from 'react';

auth;

function MyApp({ Component, pageProps }) {
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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
