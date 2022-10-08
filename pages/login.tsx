import Head from 'next/head';
import Header from '../components/Header';
import Auth from '../components/Auth';
import React, { useState, useEffect } from 'react';

export default function Login() {
    const [transform, setTransform] = useState<string>('0%');

    useEffect(() => {
        if (window.innerWidth > 440) {
            setTransform('0%');
        } else {
            setTransform('-5%');
        }

        const updateMedia = () => {
            if (window.innerWidth > 440) {
                setTransform('0%');
            } else {
                setTransform('-5%');
            }
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    return (
        <>  
            <Head>
                <title>Login</title>
                <meta name="description" content="login" />
            </Head>
            <div style={{ display: 'flex', justifyContent: 'center', transform: `translate(${transform})` }}>
                <div style={{ position: 'absolute', zIndex: '10000', top: '5px' }}>
                    <Header />
                </div>
            </div>
            <div>
                <Auth />
            </div>
        </>
    );
}
