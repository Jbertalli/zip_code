import Head from 'next/head';
import Link from 'next/link';
import React from "react";
import Button from '@mui/material/Button';
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
                    <Tabs>
                        <Link href='/' passHref>
                            <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Home" />
                        </Link>
                        <Link href='/antinode_map' passHref>
                            <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                        </Link>
                        <Link href='/history' passHref>
                            <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="User Information" />
                        </Link>
                    </Tabs>
                </div>
            </div>
            <div style={{ background: '#313e4c', width: '100%', height: '20px', position: 'absolute', zIndex: '10', top: '65px', borderTop: '.5px solid #FFFFFF90' }} />
            <div style={{ fontSize: '15px', fontWeight: '300', opacity: '0.8', transform: 'translateY(65.5px)', position: 'absolute', zIndex: '10' }}>
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
