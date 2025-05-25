'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/layout';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import useCarStore from '@/stores/useCarStore';

const Cars = () => {
  const { carsInfo, loading, error, fetchCars } = useCarStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <CircularProgress color="success" />
          <Typography mt={2}>در حال دریافت اطلاعات خودروها...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Typography color="error" variant="h6" mt={10} textAlign="center">
          خطا در دریافت اطلاعات: {error}
        </Typography>
      );
    }

    if (carsInfo.length === 0) {
      return (
        <Typography variant="h6" mt={10} textAlign="center">
          هیچ خودرویی یافت نشد!
        </Typography>
      );
    }

    return (
      <Box mt={4}>
        {carsInfo.map((car) => (
          <Box key={car.id} sx={{ p: 2, my: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">{car.title}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" mt={4} textAlign="center">
          لیست خودروها
        </Typography>
        {renderContent()}
      </Container>
    </Layout>
  );
};

export default Cars;
