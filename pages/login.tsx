import Head from 'next/head';
import Header from '../components/Header';
import Auth from '../components/Auth';

export default function Login() {

    return (
        <>  
            <Head>
                <title>Login</title>
                <meta name="description" content="login" />
            </Head>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
