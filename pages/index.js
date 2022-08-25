import Head from 'next/head';
import * as React from 'react';
import Button from '@mui/material/Button';

export default function Home() {

  return (
    <>
      <Head>
        <title>Zip Code</title>
        <meta name="description" content="zip code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Button style={{ background: 'red' }} variant="contained">
          Hello World
        </Button>
      </div>
    </>
  );
}
