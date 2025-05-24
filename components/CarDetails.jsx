'use client'
import React, { useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import AppBar from "@/components/AppBar"
import axios from 'axios';



const CarDetails = ({ car }) => {


useEffect(()=>{
  try {
    const response =  axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: 'Isfahan',
          appid: 'd42f1f1936167278177d6435cdd8a66c',
          units: 'metric',
          lang: 'fa',
        },
      }
    );

    console.log('آب و هوای اصفهان:', response.data);
    return response.data;
  } catch (error) {
    console.error('خطا در دریافت اطلاعات آب و هوا:', error.response?.data || error.message);
  }
} , [])


  return (

    <>
    <Box sx={{ flex: 1, padding: 1  }}>
     <AppBar sx={{  padding: 2  }}/>
         <Divider  />
      <Typography variant="h5" gutterBottom >
        وضعیت خودرو: {car.name}
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        🚗 مدل: {car.name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        📍 موقعیت فعلی: تهران، خیابان آزادی
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        🔋 سطح باتری: ۸۲٪
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        📶 وضعیت GPS: متصل
      </Typography>
    </Box>
    </>
  );
};

export default CarDetails;
