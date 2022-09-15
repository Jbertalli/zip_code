import Head from 'next/head';
import Map from '../components/map';

export default function Antinode() {
    return (
        <>
            <Head>
                <title>Antinode</title>
                <meta name="description" content="antinode" />
            </Head>
            <div style={{ position: 'absolute' }}>
                Antinode
            </div>
            <div style={{ transform: 'translateY(-371px)' }}>
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
