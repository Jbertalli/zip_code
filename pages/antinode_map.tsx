import Head from 'next/head';
import React, { useState, useEffect } from "react";
import NodeMap from '../components/Nodemap';
import AntinodeMap from '../components/Antinodemap';
import Header from '../components/Header';

export default function Antinode() {
    const [isDesktop, setIsDesktop] = useState(false);
 
    useEffect(() => {
        if (window.innerWidth > 440) {
            setIsDesktop(true);
        } else {
            setIsDesktop(false);
        }

        const updateMedia = () => {
        if (window.innerWidth > 440) {
            setIsDesktop(true);
        } else {
            setIsDesktop(false);
        }
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);
    
    return (
        <>
            <Head>
                <title>Antinode</title>
                <meta name="description" content="antinode" />
            </Head>
            {isDesktop ? (
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
                        <Header />
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
            ):(
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
                        <Header />
                    </div>
                </div>
                <div style={{ background: '#313e4c', width: '100%', height: '20px', position: 'absolute', zIndex: '10', top: '65px', borderTop: '.5px solid #FFFFFF90', borderBottom: '.5px solid #FFFFFF90' }} />
                <div style={{ fontSize: '15px', fontWeight: '300', position: 'absolute', zIndex: '10', transform: 'translate(50%, 65px)', width: '50%', display: 'flex', justifyContent: 'center' }}>
                    Current Location
                </div>
                <div style={{ background: '#313e4c', width: '100%', height: '20px', position: 'absolute', zIndex: '10', top: '48vh', borderTop: '.5px solid #FFFFFF90', borderBottom: '.5px solid #FFFFFF90' }} />
                <div style={{ fontSize: '15px', fontWeight: '300', position: 'absolute', zIndex: '10', transform: 'translate(50%, 48vh)', width: '50%', display: 'flex', justifyContent: 'center' }}>
                    Antinode Location
                </div>
                <div>
                    <NodeMap />
                </div>
                <div>
                    <AntinodeMap />
                </div>
            </>
            )}
        </>
    );
}
