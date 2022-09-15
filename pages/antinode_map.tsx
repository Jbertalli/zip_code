import Head from 'next/head';
import Map from '../components/map';
import Button from '@mui/material/Button';

export default function Antinode() {
    return (
        <>
            <Head>
                <title>Antinode</title>
                <meta name="description" content="antinode" />
            </Head>
            {/* <div style={{ position: 'absolute' }}>
                <Button style={{ background: 'blue', color: 'white', width: '50vw', height: '5vh' }}>
                    Antinode
                </Button>
            </div> */}
            <div>
                <div style={{ color: 'red', position: 'absolute', fontSize: '50px' }}>
                    Current Location
                </div>
                <div style={{ color: 'red', position: 'absolute', fontSize: '50px', transform: 'translate(50vw)' }}>
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
