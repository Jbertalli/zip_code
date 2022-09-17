import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {

    return (
        <>
            <Box sx={{ width: '100%', height: '56px' }} style={{ position: 'absolute', zIndex: '1000', background: '#313e4c' }}>
                <Tabs centered>
                    <Link href='/' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '100' }} label="Home" />
                    </Link>
                    <Link href='/antinode_map' passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '100' }} label="Antinode Map" />
                    </Link>
                </Tabs>
            </Box>
        </>
    );
}
