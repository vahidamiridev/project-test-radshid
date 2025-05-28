'use client';

import { useEffect } from 'react';
import useWeatherStore from '@/stores/useWeatherStore';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import SpeedIcon from '@mui/icons-material/Speed';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WavesIcon from '@mui/icons-material/Waves';
import TerrainIcon from '@mui/icons-material/Terrain';
import { useTranslation } from 'react-i18next';

const WeatherCard = () => {
  const { weather, loading, error, fetchWeather } = useWeatherStore();
  const { t } = useTranslation('translation');

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return (    <Box sx={{ mx: 'auto', mt: 5 }} align="center">
    <CircularProgress sx={{ mt: 4 }} />
  </Box>);
  if (error) return <Typography color="error">❌ {t("errors.wheather.noData")}</Typography>;
  if (!weather) return null;

  const mainData = weather.main;

  const detailItems = [
    {
      label: t('weather.feelsLike'),
      value: mainData.feels_like,
      icon: <DeviceThermostatIcon color="warning" />,
      unit: t('weather.unit.temperature')
    },
    {
      label: t('weather.pressure'),
      value: mainData.pressure,
      icon: <CompressIcon color="primary" />,
      unit: t('weather.unit.pressure')
    },
    {
      label: t('weather.humidity'),
      value: mainData.humidity,
      icon: <OpacityIcon color="info" />,
      unit: t('weather.unit.humidity')
    },
    {
      label: t('weather.tempMin'),
      value: mainData.temp_min,
      icon: <WavesIcon color="success" />,
      unit: t('weather.unit.temperature')
    },
    {
      label: t('weather.tempMax'),
      value: mainData.temp_max,
      icon: <WavesIcon color="error" />,
      unit: t('weather.unit.temperature')
    },
    {
      label: t('weather.seaLevel'),
      value: mainData.sea_level,
      icon: <SpeedIcon color="secondary" />,
      unit: t('weather.unit.pressure')
    },
    {
      label: t('weather.groundLevel'),
      value: mainData.grnd_level,
      icon: <TerrainIcon color="secondary" />,
      unit: t('weather.unit.pressure')
    },
  ];

  return (
    <Box sx={{ mx: 'auto', mt: 5 }} align="center">
      <Card sx={{
        boxShadow: 6,
        borderRadius: 4,
        width: '100%',
        maxWidth: { xs: '100%', sm: 400 },
        mx: 'auto',
      }} >
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            {t('weather.title')}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
            {weather.weather[0].main === 'Clear' ? (
              <WbSunnyIcon color="warning" />
            ) : (
              <CloudIcon color="action" />
            )}
          </Box>
          <Typography variant="body1">
            🌡 {t('weather.temperature')}: {mainData.temp}{t('weather.unit.temperature')}
          </Typography>
          <Typography variant="body1">
            💧 {t('weather.humidity')}: {mainData.humidity}{t('weather.unit.humidity')}
          </Typography>
          <Typography variant="body1">
            🌬 {t('weather.windSpeed')}: {weather.wind.speed} {t('weather.unit.wind')}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2} mt={6} justifyContent="center" columns={{ xs: 4, sm: 8, md: 12 }}>
        {detailItems.map((item, index) => (
          <Grid key={index} span={{ xs: 4, sm: 4, md: 4 }}>
            <Card sx={{ borderRadius: 3, textAlign: 'center', py: 2, minWidth: "13rem" }}>
              <Box>{item.icon}</Box>
              <Typography variant="subtitle2" mt={1}>{item.label}</Typography>
              <Typography variant="h6">{item.value} {item.unit}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default WeatherCard;
