import Head from 'next/head';
import React from "react";
import Button from '@mui/material/Button';
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
            <div>
                <NodeMap />
            </div>
            <div>
                <AntinodeMap />
            </div>
        </>
    );
}
