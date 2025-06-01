'use client';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import useCarStore from '@/stores/useCarStore';
import React, { useEffect, useState, useRef } from 'react';

const MapMarkers = ({ vehiclePositions }) => {
  const _map = useMap();  
  const markersRef = useRef({});
  const polylinesRef = useRef({});

  const customIcon = new L.Icon({
    iconUrl: '/img/azar-on.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  useEffect(() => {
    if (!_map) return;

    const currentCarKeys = Object.keys(vehiclePositions);

    // حذف مارکرها و خطوط قدیمی برای خودروهایی که دیگر وجود ندارند
    Object.keys(markersRef.current).forEach(function (carKey) {
      if (!currentCarKeys.includes(carKey)) {
        markersRef.current[carKey].forEach(function (marker) {
          marker.remove();
        });
        polylinesRef.current[carKey].forEach(function (polyline) {
          polyline.remove();
        });
        delete markersRef.current[carKey];
        delete polylinesRef.current[carKey];
      }
    });

    // رندر مجدد مارکرها و مسیرها
    currentCarKeys.forEach(function (carKey) {
      const currentPositions = vehiclePositions[carKey] || [];

      // حذف قبلی‌ها
      if (markersRef.current[carKey]) {
        markersRef.current[carKey].forEach(function (marker) {
          marker.remove(); // حذف مارکر قبلی
        });
        polylinesRef.current[carKey].forEach(function (polyline) {
          polyline.remove(); // حذف خطوط قبلی
        });
      }

      // برای خودرو جدید: ایجاد آرایه‌های جدید برای مارکرها و خطوط
      markersRef.current[carKey] = [];
      polylinesRef.current[carKey] = [];

      // افزودن مارکرها
      currentPositions.forEach(function (position, index) {
        const marker = L.marker(position, {
          icon: customIcon,
        })
          .addTo(_map)
          .bindPopup('موقعیت خودرو ' + (index + 1) + ' - ' + carKey);
        markersRef.current[carKey].push(marker);
      });

      // افزودن polyline بین نقاط
      for (let i = 0; i < currentPositions.length - 1; i++) {
        const start = currentPositions[i];
        const end = currentPositions[i + 1];
        const polyline = L.polyline([start, end], {
          color: 'rgba(255, 0, 0, 0.5)',
          weight: 3,
        }).addTo(_map);
        polylinesRef.current[carKey].push(polyline);
      }
    });
  }, [vehiclePositions, _map]);

  return null;
};

const MapComponent = () => {
  const { vehiclePositions } = useCarStore();

  return (
    <Box sx={{ width: "100%", height: "100%", right: 0 }}>
      <MapContainer 
        center={[32.65946803213527, 51.648447228835416]} 
        zoom={7} 
        style={{ width: '100%', height: '100%' }} 
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <MapMarkers vehiclePositions={vehiclePositions} /> 
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
