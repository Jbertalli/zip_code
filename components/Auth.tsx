import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase/clientApp';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setPersistence, browserSessionPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '@mui/material/Button';
import styles from '../styles/zip.module.css';
import FocusLock from 'react-focus-lock';
import Checkbox from '@mui/material/Checkbox';

//Configure FirebaseUI
const uiConfig = {
    // Redirect / after successful signin
    signInSuccessUrl: "/",
    // Display GitHub auth providers
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
};

function SignInScreen() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [account, setAccount] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    // const user = auth.currentUser;
    // console.log(user);
    const [headerSize, setHeaderSize] = useState<string>('2.1em');
    const [emailSign, setEmailSign] = useState<string>('28px');
    const [width, setWidth] = useState<string>('236px');
    const [view, setView] = useState<string>('160px');
    const [toggle, setToggle] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<string>('password');
    const [checked, setChecked] = useState<boolean>(false);
    const [sign, setSign] = useState<string>('120px');
    const [height, setHeight] = useState<string>('');

    useEffect(() => {
        if (window.innerWidth > 440) {
            setHeaderSize('2.1em');
            setEmailSign('28px');
            setWidth('236px');
            setView('160px');
            setSign('120px');
            setHeight('620px');
        } else {
            setHeaderSize('1.7em');
            setEmailSign('48px');
            setWidth('300px');
            setView('12vh');
            setSign('70px');
            setHeight('560px');
        }

        const updateMedia = () => {
            if (window.innerWidth > 440) {
                setHeaderSize('2.1em');
                setEmailSign('28px');
                setWidth('236px');
                setView('160px');
                setSign('120px');
                setHeight('620px');
            } else {
                setHeaderSize('1.7em');
                setEmailSign('48px');
                setWidth('300px');
                setView('12vh');
                setSign('70px');
                setHeight('560px');
            }
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = 'name=Signed In';
        console.log("%c Current user:", "color: green", user);
        // const uid = user.uid;
      } else {
        console.log("%c No user signed in", "color: red");
      }
    });

    const signInWithGoogle = () => {
        setPersistence(auth, browserSessionPersistence);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((re) => {
            router.push('/');
            console.log(re);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          document.cookie = 'name=Signed Up';
          router.push('/');
          console.log('logged in');
        })
        .catch((error) => {
          console.log(error, "User not found");
        });
    }

    function handleSignup(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.cookie = 'name=Signed Up';
            router.push('/');
            console.log('You are registered');
        })
        .catch((error) => {
            console.log(error, "You are not registered");
            setError("Invalid email or password");
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
      };

    return (
      <> 
        <div style={{ display: 'flex', justifyContent: 'center', transform: `translateY(${view})` }}>
            <div style={{ fontWeight: '200', position: 'absolute', border: '1px solid white', borderRadius: '8px', minHeight: `${height}`, width: '20vw', maxWidth: '600px', minWidth: `${width}` }}>
                <div style={{ fontSize: `${headerSize}`, display: 'flex', justifyContent: 'center', padding: '30px 0px 0px 0px' }}>
                    {account ? (
                    <>
                        Login to Account
                    </>
                    ):(
                    <>
                        Signup Here
                    </>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(30px)', minWidth: '100px' }}>
                    <div
                        style={{
                            maxWidth: "320px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
                    </div>
                    <div style={{ transform: 'translate(-208.8px, 85px)' }}>
                        <Button onClick={signInWithGoogle} 
                            style={{ 
                                background: '#FFFFFF', 
                                position: 'absolute',
                                zIndex: '100',
                                borderRadius: '2px', 
                                paddingLeft: '46px',
                                border: '.5px solid #80808099', 
                                color: 'black',
                                width: '185px',
                                height: '40px',
                                fontSize: '14px', 
                                fontWeight: '500',
                                textTransform: 'none',
                            }}
                        >
                            <div 
                                className={styles.google} 
                                style={{ 
                                    transform: 'translate(-86px, -41px) scale(0.07)', 
                                    position: 'absolute', 
                                    marginTop: '82px' 
                                }} 
                            />
                            Sign in with Google
                        </Button>
                    </div>
                </div>
                <div style={{ transform: `translateY(${sign})`, display: 'flex', justifyContent: 'center' }}>
                    {account ? (
                    <>
                        <div>
                            <div style={{ transform: `translateY(${emailSign})`, fontSize: '10px', color: 'white', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ background: 'white', width: '15%', height: '0.5px', transform: 'translate(-10px, 7px)' }} />
                                    or Sign in with Email
                                <div style={{ background: 'white', width: '15%', height: '0.5px', transform: 'translate(10px, 7px)' }} />
                            </div>
                            <FocusLock>
                                <form onSubmit={handleLogin} style={{ transform: 'translateY(88px)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            placeholder="Email"
                                            style={{
                                                borderRight: 'transparent',
                                                borderLeft: 'transparent',
                                                borderTop: 'transparent',
                                                borderBottom: '.5px solid gray',
                                                margin: '0px 0px 20px',
                                                padding: '4px',
                                                width: '80%',
                                                maxWidth: '300px',
                                                fontSize: '17px' ,
                                                fontWeight: '300'
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type={`${showPassword}`}
                                            placeholder="Password"
                                            style={{
                                                borderRight: 'transparent',
                                                borderLeft: 'transparent',
                                                borderTop: 'transparent',
                                                borderBottom: '.5px solid gray',
                                                margin: '7px 0px 60px',
                                                padding: '4px',
                                                width: '80%',
                                                maxWidth: '300px',
                                                fontSize: '17px' ,
                                                fontWeight: '300'
                                            }}
                                        />
                                    </div>
                                    <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
                                        {error && (
                                            <p>{error}</p>
                                        )}
                                    </div>
                                    <div style={{ position: 'absolute', transform: 'translate(10px, -50px)' }}>
                                        {toggle ? (
                                        <>
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChange}
                                                onClick={() => {setShowPassword('password'), setToggle(false)}}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <span>
                                                Hide Password
                                            </span>
                                        </>
                                        ):(
                                        <>
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChange}
                                                onClick={() => {setShowPassword('text'), setToggle(true)}}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />  
                                            <span>
                                                Show Password
                                            </span>
                                        </>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                                        {`Don't have an account?`}&nbsp;<a onClick={() => {setAccount(false), setEmail(""), setPassword("")}} style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }}>Signup</a>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px 30px' }}>
                                        <input type="submit" value="Login" className={styles.buttons} />
                                    </div>
                                </form>
                            </FocusLock>
                        </div>
                    </>
                    ):(
                    <>
                        <div>
                            <div style={{ transform: `translateY(${emailSign})`, fontSize: '10px', color: 'white', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ background: 'white', width: '15%', height: '0.5px', transform: 'translate(-10px, 7px)' }} />
                                    or Sign up with Email
                                <div style={{ background: 'white', width: '15%', height: '0.5px', transform: 'translate(10px, 7px)' }} />
                            </div>
                            <FocusLock>
                                <form onSubmit={handleSignup} style={{ transform: 'translateY(88px)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            placeholder="Email"
                                            style={{
                                                borderRight: 'transparent',
                                                borderLeft: 'transparent',
                                                borderTop: 'transparent',
                                                borderBottom: '.5px solid gray',
                                                margin: '0px 0px 20px',
                                                padding: '4px',
                                                width: '80%',
                                                maxWidth: '300px',
                                                fontSize: '17px' ,
                                                fontWeight: '300'
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type={`${showPassword}`}
                                            placeholder="Password"
                                            style={{
                                                borderRight: 'transparent',
                                                borderLeft: 'transparent',
                                                borderTop: 'transparent',
                                                borderBottom: '.5px solid gray',
                                                margin: '7px 0px 60px',
                                                padding: '4px',
                                                width: '80%',
                                                maxWidth: '300px',
                                                fontSize: '17px' ,
                                                fontWeight: '300'
                                            }}
                                        />
                                    </div>
                                    <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
                                        {error && (
                                            <p>{error}</p>
                                        )}
                                    </div>
                                    <div style={{ position: 'absolute', transform: 'translate(10px, -50px)' }}>
                                        {toggle ? (
                                        <>
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChange}
                                                onClick={() => {setShowPassword('password'), setToggle(false)}}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <span>
                                                Hide Password
                                            </span>
                                        </>
                                        ):(
                                        <>
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChange}
                                                onClick={() => {setShowPassword('text'), setToggle(true)}}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />  
                                            <span>
                                                Show Password
                                            </span>
                                        </>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                                        {`Already have an account?`}&nbsp;<a onClick={() => {setAccount(true), setEmail(""), setPassword("")}} style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }}>Login</a>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px 30px' }}>
                                        <input type="submit" value="Signup" className={styles.buttons}/>
                                    </div>
                                </form>
                            </FocusLock>
                        </div>
                    </>
                    )}
                </div>
            </div>
        </div>
      </>
    );
}

export default SignInScreen;
