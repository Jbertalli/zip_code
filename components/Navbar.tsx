import React, { useState } from 'react';
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
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }} style={{ position: 'absolute', zIndex: '10000000000000', background: '#313e4c' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '100' }} label="Current Location" />
                    <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '100' }} label="Antinode Map" />
                </Tabs>
            </Box>
        </>
    );
}
