'use client';

import React, { useEffect } from 'react';
import useWeatherStore from '@/stores/useWeatherStore';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import { useTranslation } from 'react-i18next';

const WeatherCard = () => {
  const { weather, loading, error, fetchWeather } = useWeatherStore();
  const { t } = useTranslation('translation');

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">❌ {error}</Typography>;
  if (!weather) return null;

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 5, boxShadow: 6, borderRadius: 4, width: "350px" }}>
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
          {/* <Typography variant="h6">
            {weather.weather[0].description}
          </Typography> */}
        </Box>
        <Typography variant="body1">
          🌡 {t('weather.temperature')}: {weather.main.temp}{t('weather.unit.temperature')}
        </Typography>
        <Typography variant="body1">
          💧 {t('weather.humidity')}: {weather.main.humidity}{t('weather.unit.humidity')}
        </Typography>
        <Typography variant="body1">
          🌬 {t('weather.windSpeed')}: {weather.wind.speed} {t('weather.unit.wind')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
