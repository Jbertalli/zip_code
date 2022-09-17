import Head from 'next/head';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';

export default function History() {

    const clientCredential = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(clientCredential);
    const [user] = useAuthState(getAuth());

    return (
        <>
            <Head>
                <title>User History</title>
                <meta name="description" content="history" />
            </Head>
            <div style={{ fontSize: '16px', fontWeight: '400', position: 'absolute', zIndex: '10000000', color: 'white', left: '16px', top: '21px' }}>
                <span>
                    {user ? (
                    <>
                        {user.displayName}'s{' '}
                    </>
                    ): null}
                </span>
                <span>
                    Information
                </span>
            </div>
        </>
    );
}
