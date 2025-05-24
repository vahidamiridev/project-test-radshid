// Header.js
'use client'
import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const AppBar = ({ title }) => {


    useEffect(()=>{

    })


  return (
    <Box sx={{ textAlign: 'center', padding: 1, backgroundColor: 'white', color: 'white', height:"5rem" ,borderRadius:'5px', boxShadow:"0px 0px 25px 3px rgba(0,0,0,0.1)"}}>
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
};

export default AppBar;
