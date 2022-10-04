import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header() {
    const [homeColor, setHomeColor] = useState('');
    const [antinodeColor, setAntinodeColor] = useState('');
    const [historyColor, setHistoryColor] = useState('');
    const [loginColor, setLoginColor] = useState('');
    // const [homeUnderline, setHomeUnderline] = useState('');
    // const [antinodeUnderline, setAntinodeUnderline] = useState('');
    // const [historyUnderline, setHistoryUnderline] = useState('');
    // textDecoration: `${homeUnderline}`
    // textDecoration: `${antinodeUnderline}`
    // textDecoration: `${historyUnderline}`

    const [user] = useAuthState(getAuth());
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        if (router.pathname === '/') {
            setHomeColor('#FFFFFF20');
            // setHomeUnderline('underline');
        } else if (router.pathname === '/antinode_map') {
            setAntinodeColor('#FFFFFF20');
            // setAntinodeUnderline('underline');
        } else if (router.pathname === '/history') {
            setHistoryColor('#FFFFFF20');
            // setHistoryUnderline('underline');
        } else if (router.pathname === '/login') {
            setLoginColor('#FFFFFF20');
        } else {
            return;
        }
    }, []);

    const SignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push('/login');
            document.cookie = 'name=; expires=Thu, 01 Jan 1970';
            console.log("%c signed out", "color: red");
        }).catch((error) => {
            // An error happened.
            console.log("Error", error);
        });
    }

    return (
        <>
            <Tabs>
                <Link href='/' passHref>
                    <Tab style={{ background: `${homeColor}`, fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Home" />
                </Link>
                <Link href='/antinode_map' passHref>
                    <Tab style={{ background: `${antinodeColor}`, fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                </Link>
                {user ? (
                <>
                    <Link href='/history' passHref>
                        <Tab style={{ background: `${historyColor}`, fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="User Information" />
                    </Link>
                    <Tab onClick={SignOut} style={{ fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Log Out" />
                </>
                ):(
                <>
                    <Link href='/login' passHref>
                        <Tab style={{ background: `${loginColor}`, fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Login" />
                    </Link>
                </>
                )}
            </Tabs>
        </>
    );
}
