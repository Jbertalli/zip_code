import Head from 'next/head';
import Link from 'next/link';
import React from "react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import NodeMap from '../components/Nodemap';
import AntinodeMap from '../components/Antinodemap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
            <div style={{ position: 'absolute', zIndex: '10000', right: '36vw', top: '5px' }}>
                <Tabs>
                    <Link href='/' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Home" />
                    </Link>
                    <Link href='/antinode_map' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                    </Link>
                    <Link href='/' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="User History" />
                    </Link>
                </Tabs>
            </div>
            <div style={{ position: 'absolute' }}>
                <Divider />
            </div>
            <div style={{ fontSize: '15px', fontWeight: '300', height: '20px', transform: 'translateY(0px)', position: 'absolute' }}>
                <div style={{ position: 'absolute', transform: 'translate(20vw)', width: '300px' }}>
                    Current Location
                </div>
                <div style={{ position: 'absolute', transform: 'translate(70vw)', width: '300px' }}>
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
