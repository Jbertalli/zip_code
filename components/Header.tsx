import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header() {
    const [homeColor, setHomeColor] = useState<string>('');
    const [antinodeColor, setAntinodeColor] = useState<string>('');
    const [historyColor, setHistoryColor] = useState<string>('');
    const [loginColor, setLoginColor] = useState<string>('');
    const [mobileHeader, setMobileHeader] = useState<string>('25px');
    const [transform, setTransform] = useState<string>('0%');
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
        if (window.innerWidth > 440) {
            setMobileHeader('25px');
            setTransform('0%');
        } else {
            setMobileHeader('10.8px');
            setTransform('5%');
        }

        const updateMedia = () => {
            if (window.innerWidth > 440) {
                setMobileHeader('25px');
                setTransform('0%');
            } else {
                setMobileHeader('10.8px');
                setTransform('5%');
            }
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

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
            <div style={{ transform: `translate(${transform}` }}>
            {/* <Tabs> */}
                <Link href='/' passHref>
                    <Tab style={{ background: `${homeColor}`, fontSize: `${mobileHeader}`, fontWeight: '400', textTransform: 'none' }} label="Home" />
                </Link>
                <Link href='/antinode_map' passHref>
                    <Tab style={{ background: `${antinodeColor}`, fontSize: `${mobileHeader}`, fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                </Link>
                {user ? (
                <>
                    <Link href='/history' passHref>
                        <Tab style={{ background: `${historyColor}`, fontSize: `${mobileHeader}`, fontWeight: '400', textTransform: 'none' }} label="User Info" />
                    </Link>
                    <Tab onClick={SignOut} style={{ fontSize: `${mobileHeader}`, fontWeight: '400', textTransform: 'none' }} label="Log Out" />
                </>
                ):(
                <>
                    <Link href='/login' passHref>
                        <Tab style={{ background: `${loginColor}`, fontSize: `${mobileHeader}`, fontWeight: '400', textTransform: 'none' }} label="Login" />
                    </Link>
                </>
                )}
            {/* </Tabs> */}
            </div>
        </>
    );
}
