import Head from 'next/head';
import Map from '../components/map';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function Antinode() {
    return (
        <>
            <Head>
                <title>Antinode</title>
                <meta name="description" content="antinode" />
            </Head>
            <div style={{ position: 'absolute' }}>
                <Button style={{ background: 'blue', color: 'white' }}>
                    Antinode
                </Button>
            </div>
            <div style={{ fontWeight: '300', color: 'white', transform: 'translateY(40px)' }}>
                <div style={{ background: 'white', opacity: '0.4' }}>
                    <Divider />
                </div>
                <div style={{ position: 'absolute', transform: 'translate(25vw, 3px)' }}>
                    Current Location
                </div>
                <div style={{ position: 'absolute', transform: 'translate(75vw, 3px)' }}>
                    Antinode Location
                </div>
            </div>
            <div style={{ transform: 'translateY(-411px)' }}>
                <div style={{ position: 'absolute', zIndex: '1000000000', width: '50%', height: '100%' }}>
                    <Map />
                </div>
                <div style={{ position: 'absolute', zIndex: '1000000000', width: '50%', height: '100%', transform: 'translate(100%)' }}>
                    <Map />
                </div>
            </div>
        </>
    );
}
