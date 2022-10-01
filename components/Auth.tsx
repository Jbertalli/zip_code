import React, { useState } from "react";
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase/clientApp';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setPersistence, browserSessionPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '@mui/material/Button';
import styles from '../styles/zip.module.css';
import FocusLock from 'react-focus-lock';
// import LogoutIcon from '@mui/icons-material/Logout';

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

    const [user, loading] = useAuthState(auth);
    // const user = auth.currentUser;
    // console.log(user);

    // const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = 'name=Signed In';
        console.log("%c Current user:", "color: green", user);
        // const uid = user.uid;
      } else {
        console.log("%c No user signed in", "color: red");
      }
    });

    // const SignOut = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //         document.cookie = 'name=; expires=Thu, 01 Jan 1970';
    //         console.log("%c signed out", "color: red");
    //     }).catch((error) => {
    //         // An error happened.
    //         console.log("Error", error);
    //     });
    // }

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
            console.log('You are registered');
            router.push('/');
        })
        .catch((error) => {
            console.log(error, "You are not registered");
            setError("Invalid email or password");
        });
    }

    return (
      <> 
        <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(10vh)' }}>
            <div style={{ fontSize: '3em', fontWeight: '200', position: 'absolute', border: '1px solid white', borderRadius: '8px', height: '50vh', width: '20vw', maxWidth: '600px', minWidth: '236px' }}>
                {/* <div>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3vh 0vw 0vh 0vw' }}>
                        Login Form
                    </div>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>
                                Email
                            </label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label>
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <input 
                                type="submit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div> */}
                <div style={{ fontSize: '.4em', display: 'flex', justifyContent: 'center', padding: '2vh 0vw 0vh 0vw' }}>
                    Login with Email
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(10vh)', minWidth: '100px' }}>
                    {/* {!user ? (
                    <> */}
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
                                    zIndex: '100000',
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
                    {/* </>
                    ):(
                    <>
                        <Button 
                            onClick={SignOut} 
                            style={{ 
                                color: 'white', 
                                fontSize: '14px', 
                                fontWeight: '500', 
                                background: 'red', 
                                borderRadius: '2px', 
                                width: '185px', 
                                height: '40px', 
                                margin: '10px',
                                display: 'flex'
                            }}>
                            <LogoutIcon fontSize="small" />&nbsp;
                            Log Out
                        </Button>
                    </>
                    )} */}
                </div>
            </div>
        </div>
        <div>
            {account ? (
            <>

            </>
            ):(
            <>

            </>
            )}
        </div>
      </>
    );
}

export default SignInScreen;
