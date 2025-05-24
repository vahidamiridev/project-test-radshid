'use client'
import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Paper } from '@mui/material';


const CarList = ({ cars, selectedCarId, onSelect }) => {
  return (
    <Paper elevation={3} sx={{ width: 250, padding: 2, bgcolor: '#f9f9f9', borderLeft: '4px solid green' }}>
     
      <Typography variant="h6" gutterBottom>
        لیست منو
      </Typography>
      <Divider />
      <List >
        {cars.map((car) => (
          <ListItem
          button={true}  
            key={car.id}
            selected={selectedCarId === car.id} // آیتم انتخاب‌شده
            onClick={() => onSelect(car)} // وقتی روی آیتم کلیک شد
            sx={{ 
              bgcolor: selectedCarId === car.id ? 'lightblue' : 'transparent', // رنگ پس‌زمینه هنگام انتخاب
              '&:hover': {
                bgcolor: 'lightgray', // تغییر رنگ هنگام هاور
              },
            }}
          >
            <ListItemText primary={car.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CarList;
