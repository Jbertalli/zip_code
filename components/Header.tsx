import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Header() {
    const [homeColor, setHomeColor] = useState('');
    const [antinodeColor, setAntinodeColor] = useState('');
    const [historyColor, setHistoryColor] = useState('');
    const [homeUnderline, setHomeUnderline] = useState('');
    const [antinodeUnderline, setAntinodeUnderline] = useState('');
    const [historyUnderline, setHistoryUnderline] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (router.pathname === '/') {
            setHomeColor('#FFFFFF20');
            setHomeUnderline('underline');
        } else if (router.pathname === '/antinode_map') {
            setAntinodeColor('#FFFFFF20');
            setAntinodeUnderline('underline');
        } else if (router.pathname === '/history') {
            setHistoryColor('#FFFFFF20');
            setHistoryUnderline('underline');
        } else {
            return;
        }
    }, []);
      
    return (
        <>
            <Tabs>
                <Link href='/' passHref>
                    <Tab style={{ background: `${homeColor}`, textDecoration: `${homeUnderline}`, fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Home" />
                </Link>
                <Link href='/antinode_map' passHref>
                    <Tab style={{ background: `${antinodeColor}`, textDecoration: `${antinodeUnderline}`, fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                </Link>
                <Link href='/history' passHref>
                    <Tab style={{ background: `${historyColor}`, textDecoration: `${historyUnderline}`, fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="User Information" />
                </Link>
            </Tabs>
        </>
    );
}
