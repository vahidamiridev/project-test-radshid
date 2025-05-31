'use client'

import dynamic from 'next/dynamic'
import { Box, CircularProgress, Typography } from '@mui/material'
import useCarStore from '@/stores/useCarStore'
import CarsListComponent from '@/components/CarsListComponent'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
})

const MapPage = () => {
  const { t } = useTranslation("translation");
  const { carsInfo, loading, error, fetchCars } = useCarStore();

  useEffect(() => {
    if (!carsInfo || carsInfo.length === 0) {
      fetchCars();
    }
  }, [carsInfo, fetchCars]);

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
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <Typography color="error" variant="h6" mt={10} textAlign="center">
            {t("carsPage.errorLoadingCars", { error })}
          </Typography>
        </Box>
      );
    }

    if (carsInfo.length === 0) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <CircularProgress color="success" />
          <Typography variant="h6" mt={10} textAlign="center">
            {t("carsPage.noCarsFound")}
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Box
          sx={{
            width: { xs: '100%', lg: '15%' },
            height: { xs: '30vh', lg: '100vh' },
            overflowY: 'auto',
            borderBottom: { xs: '1px solid #ccc', sm: 'none' }
          }}
        >
          <CarsListComponent />
        </Box>

        <Box
          sx={{
            width: { xs: '100%', lg: '85%' },
            height: { xs: '70vh', lg: '100vh' },
          }}
        >
          <MapComponent />
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default MapPage;
