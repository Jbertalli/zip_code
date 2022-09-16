import React, { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    return (
        <>
            <Box sx={{ width: '100%' }} style={{ position: 'absolute', zIndex: '1000', background: '#313e4c', transform: 'translateY(1170px)' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '100' }} label="Home" />
                    <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '100' }} label="Current Location" />
                    <Link href="/antinode_map" passHref>
                        <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '100' }} label="Antinode Map" />
                    </Link>
                </Tabs>
            </Box>
        </>
    );
}
