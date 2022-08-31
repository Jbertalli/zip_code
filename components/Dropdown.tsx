import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Auth from '../components/Auth';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dropdown() {

  return (
    <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
      <FormControl style={{ width: '160px'}}>
        <InputLabel>Authentication</InputLabel>
        <Select
          labelId="authentication"
          id="authentication"
        >
          <MenuItem>
          <Auth />
          </MenuItem>
          <MenuItem>
          <Button style={{ color: 'white', fontSize: '14px', fontWeight: 500, background: 'red', borderRadius: '2px', width: '185px', height: '40px', transform: 'translate(24px, -5px)' }}>
              <LogoutIcon fontSize="small" />&nbsp;
              Log Out
          </Button>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
