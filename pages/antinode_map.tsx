import Head from 'next/head';
import React from "react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import NodeMap from '../components/Nodemap';
import AntinodeMap from '../components/Antinodemap';
// import Locate from '../components/Nodemap';
// import AntinodeLocate from '../components/Antinodemap';

export default function Antinode() {
    
    return (
        <>
            <Head>
                <title>Antinode</title>
                <meta name="description" content="antinode" />
            </Head>
            {/* <div style={{ position: 'absolute' }}>
                <Button
                    onClick={() => {Locate(), AntinodeLocate()}}
                    style={{ background: 'blue', color: 'white' }}
                >
                    Antinode
                </Button>
            </div> */}
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
            <div>
                <NodeMap />
            </div>
            <div>
                <AntinodeMap />
            </div>
        </>
    );
}
