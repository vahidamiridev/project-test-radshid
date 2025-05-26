'use client';

import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import useCarStore from '@/stores/useCarStore';
import { useTranslation } from 'react-i18next';

const Cars = () => {
  const { carsInfo, loading, error } = useCarStore();
  const { t } = useTranslation("translation");




  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <CircularProgress color="success" />
          <Typography mt={2}>{t("carsPage.loadingCars")}</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Typography color="error" variant="h6" mt={10} textAlign="center">
          {t("carsPage.errorLoadingCars", { error })}
        </Typography>
      );
    }

    if (carsInfo.length === 0) {
      return (
        <Typography variant="h6" mt={10} textAlign="center">
          {t("carsPage.noCarsFound")}
        </Typography>
      );
    }

    return (
      <Box
        mt={4}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
      >
        {carsInfo.map((car, index) => (
          <Box
            key={`${car.id}-${index}`}
            sx={{
              width: 200,
              height: 200,
              cursor: "pointer",
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              boxShadow: '0 2px 8px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              }
            }}
          >
            <Typography variant="h6" textAlign="center">
               { car.title}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mt={10} textAlign="center">
        {t("carsPage.carListTitle")}
      </Typography>
      {renderContent()}
    </Container>
  );
};

export default Cars;
