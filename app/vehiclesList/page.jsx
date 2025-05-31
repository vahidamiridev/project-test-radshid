'use client';

import { useEffect } from 'react';
import {
  Box, Typography, CircularProgress, Container,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import useCarStore from '@/stores/useCarStore';
import { useTranslation } from 'react-i18next';


const VehiclesList = () => {

  const { t } = useTranslation("translation");
  const { carsInfo, loading, error ,fetchCars } = useCarStore();
  
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
<TableContainer
  component={Paper}
  sx={{
    mt: 4,
    borderRadius: 3,
    overflowX: 'auto',  
    width: '100%',
  }}
>
  <Table sx={{ minWidth: 600 }}>  
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
          {t("carsPage.tableHeaders.index")}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
          {t("carsPage.tableHeaders.title")}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
          {t("carsPage.tableHeaders.phone")}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
          {t("carsPage.tableHeaders.plate")}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
          {t("carsPage.tableHeaders.driverName")}
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {carsInfo.map((car, index) => (
        <TableRow key={car.id} hover>
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell align="center">{car.title}</TableCell>
          <TableCell align="center">{car.simPhone || '-'}</TableCell>
          <TableCell align="center">{car.plateChar || '-'}</TableCell>
          <TableCell align="center">{car.driverName || '-'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

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

export default VehiclesList;
