import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase/clientApp';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from '@firebase/auth';
// import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import styles from '../styles/zip.module.css';

//Configure FirebaseUI
const uiConfig = {
    // Redirect / after successful signin
    signInSuccessUrl: "/",
    // Display GitHub auth providers
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
};

function SignInScreen() {

    const auth = getAuth();

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
    
    const user = auth.currentUser;
    // console.log(user);

    const signInWithGoogle = () => {
        setPersistence(auth, browserSessionPersistence);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((re) => {
            console.log(re);
            // router.push('/');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
      <> 
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ fontSize: '3em', fontWeight: '200', position: 'absolute', transform: 'translateY(5vh)', border: '1px solid white', height: '50vh', width: '20vw', maxWidth: '600px', minWidth: '236px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', minWidth: '100px' }}>
                    Login Form
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(2vh)', minWidth: '100px' }}>
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
      </>
    );
}

export default SignInScreen;
