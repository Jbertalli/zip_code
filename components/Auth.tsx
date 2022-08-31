import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase/clientApp';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

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
       console.log("%c Current user:", "color: green", user);
        const uid = user.uid;
      } else {
        console.log("%c No user signed in", "color: red");
      }
    });

    const SignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    
    const user = auth.currentUser;
    console.log(user);

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!user ? (
            <>
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
            </>
            ):(
            <>
                <Button 
                    onClick={SignOut} 
                    style={{ 
                        color: 'white', 
                        fontSize: '14px', 
                        fontWeight: 500, 
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
            )}
        </div>
      </>
    );
}

export default SignInScreen;
