'use client';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import useCarStore from '@/stores/useCarStore';
import React, { useEffect, useState, useRef } from 'react';


const MapMarkers = ({ vehiclePositions }) => {
  const _map = useMap();  
  const markersRef = useRef({});
  const polylinesRef = useRef({});
    const [positions, setPositions] = useState(vehiclePositions); 

useEffect(() => {
  if (!_map) return;  // اطمینان از اینکه نقشه بارگذاری شده باشد

  setPositions(vehiclePositions);  // بروزرسانی موقعیت‌ها

  const currentCarKeys = Object.keys(vehiclePositions);

  // حذف مارکرها و خطوط اضافی
  Object.keys(markersRef.current).forEach((carKey) => {
    if (!currentCarKeys.includes(carKey)) {
      markersRef.current[carKey].forEach((marker) => {
        marker.remove(); // حذف مارکر
      });
      polylinesRef.current[carKey].forEach((polyline) => {
        polyline.remove(); // حذف خط
      });
      delete markersRef.current[carKey];
      delete polylinesRef.current[carKey];
    }
  });

  // اضافه کردن مارکرها و خطوط جدید
  currentCarKeys.forEach((carKey) => {
    const currentPositions = vehiclePositions[carKey] || [];

    if (!markersRef.current[carKey]) {
      markersRef.current[carKey] = [];
      polylinesRef.current[carKey] = [];

      currentPositions.forEach((position, index) => {
        const marker = L.marker(position, { 
          icon: new L.icon({ iconUrl: '/img/azar-on.png', iconSize: [50, 50] }) 
        })
        .addTo(_map)
        .bindPopup(`موقعیت خودرو ${index + 1} - ${carKey}`);
        markersRef.current[carKey].push(marker);
      });

      const lines = currentPositions.slice(0, -1).map((start, index) => {
        const end = currentPositions[index + 1];
        const polyline = L.polyline([start, end], { color: 'rgba(255, 0, 0, 0.5)', weight: 3 })
          .addTo(_map);
        polylinesRef.current[carKey].push(polyline);
      });
    }
  });
}, [vehiclePositions, _map]);  // به _map وابسته است


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
