import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const clientCredential = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(clientCredential);
const db = getFirestore();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function History() {
    const [userInfo, setUserInfo] = useState([]);
    const [user] = useAuthState(getAuth());

    let logged = async () => {
        const colRef = collection(db, "location");
        const docsSnap = await getDocs(colRef);
          docsSnap.forEach(doc => {
            // console.log(doc.data());
            setUserInfo(docsSnap.docs.map(doc => ({
              id: doc.id,
              Zip: doc.data().Zip,
              City: doc.data().City,
              Latitude: doc.data().Latitude,
              Longitude: doc.data().Longitude,
              Opposite_Latitude: doc.data().Opposite_Latitude,
              Opposite_Longitude: doc.data().Opposite_Longitude,
              State: doc.data().State,
              State_Abbreviation: doc.data().State_Abbreviation
          })))
        })
      }
      
      useEffect(() => {
        logged();
      }, []);
  
      let dbId = userInfo?.[0]?.id;
      let dbZip = userInfo?.[0]?.Zip;
      let dbCity = userInfo?.[0]?.City;
      let dbLatitude = userInfo?.[0]?.Latitude;
      let dbLongitude = userInfo?.[0]?.Longitude;
      let dbOppositeLatitude = userInfo?.[0]?.Opposite_Latitude;
      let dbOppositeLongitude = userInfo?.[0]?.Opposite_Longitude;
      let dbState = userInfo?.[0]?.State;
      let dbStateAbbreviation = userInfo?.[0]?.State_Abbreviation;
      
      console.log(dbId);
      console.log(dbZip);
      console.log(dbCity);
      console.log(dbLatitude);
      console.log(dbLongitude);
      console.log(dbOppositeLatitude);
      console.log(dbOppositeLongitude);
      console.log(dbState);
      console.log(dbStateAbbreviation);

    return (
        <>
            <Head>
                <title>User Information</title>
                <meta name="description" content="history" />
            </Head>
            <div style={{ position: 'absolute', zIndex: '10000', right: '33vw', top: '5px' }}>
                <Tabs>
                    <Link href='/' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Home" />
                    </Link>
                    <Link href='/antinode_map' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                    </Link>
                    <Link href='/history' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="User Information" />
                    </Link>
                </Tabs>
            </div>
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
                {/* <div>
                    {dbId}
                </div> */}
                <div>
                    {dbZip}
                </div>
                <div>
                    {dbCity}
                </div>
                <div>
                    {dbLatitude}
                </div>
                <div>
                    {dbLongitude}
                </div>
                <div>
                    {dbOppositeLatitude}
                </div>
                <div>
                    {dbOppositeLongitude}
                </div>
                <div>
                    {dbState}
                </div>
                <div>
                    {dbStateAbbreviation}
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                            <StyledTableCell align="right">Calories</StyledTableCell>
                            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
