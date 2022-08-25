import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
import reverse from 'reverse-geocode';
import Button from '@mui/material/Button';

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = `0a6c7a4e56dfa967793cbd7761dde032`;

export default function Home() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [responseData, setResponseData] = useState({});
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        })

        //fetch data with axios
        let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
        axios.get(finalAPIEndPoint)
          .then((response) => {
            setResponseData(response.data);
            // console.log(response.data);
          })
    }, [latitude, longitude])

    // syracuse coordinates for testing
    // let zipCode = reverse.lookup(43.0481, -76.1474, 'us');
    let zipCode = reverse.lookup(latitude, longitude, 'us');
    // console.log(zipCode);
    // console.log(zipCode.zipcode);

  return (
    <>
      <Head>
        <title>Zip Code</title>
        <meta name="description" content="zip code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button style={{ background: 'blue' }} variant="contained">
        Hello World
      </Button>
      <div>
          {/* <h1>{responseData.name}</h1> */}
          <h1>{zipCode.zipcode}</h1>
          <h1>{zipCode.city}</h1>
          <h1>{zipCode.latitude}</h1>
          <h1>{zipCode.longitude}</h1>
          <h1>{zipCode.state}</h1>
          <h1>{zipCode.state_abbr}</h1>
      </div>
    </>
  );
}
