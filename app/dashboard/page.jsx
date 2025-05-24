'use client'
import React, { useState } from 'react';
import { Box } from '@mui/material';
import CarList, { Car } from '@/components/CarsList';
import CarDetails from '@/components/CarDetails';
import ProtectedRoute from '@/components/ProtectedRoute';

const carList = [
  { id: 1, title: 'داشبورد ' },
  { id: 2, title: 'خودروها' },
  { id: 3, title: 'نقشه ' },
];

const CarStatusPage = () => {
  const [selectedCar, setSelectedCar] = useState(carList[0]);

  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
        <CarList
          cars={carList}
          selectedCarId={selectedCar.id}
          onSelect={(car) => setSelectedCar(car)}
        />
        <CarDetails car={selectedCar} />
      </Box>
    </ProtectedRoute>
  );
};

export default CarStatusPage;
