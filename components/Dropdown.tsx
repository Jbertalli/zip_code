import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Auth from '../components/Auth';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

const SignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

export default function Dropdown({ user }) {

  console.log(user);

  return (
    <>
    <Button>
        <Auth />
    </Button>
    <Button onClick={SignOut} style={{ color: 'white', fontSize: '14px', fontWeight: 500, background: 'red', borderRadius: '2px', width: '185px', height: '40px', transform: 'translate(24px, -5px)' }}>
        <LogoutIcon fontSize="small" />&nbsp;
        Log Out
    </Button>
    </>
  );
}
