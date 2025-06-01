'use client';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import useCarStore from '@/stores/useCarStore';
import React, { useEffect, useState } from 'react';

const MapComponent = () => {

  const {
    selectedCarAvlIds,
    vehiclePositions,
    addVehiclePosition,
  } = useCarStore();

  const [positions, setPositions] = useState(vehiclePositions);

  useEffect(() => {
    console.log('changessssssss')
    setPositions(vehiclePositions);
  }, [vehiclePositions]);

  const icon = new L.icon({
    iconUrl: '/img/azar-on.png',
    iconSize: [50, 50],
  });

  const dotIcon = new L.divIcon({
    className: 'custom-icon',
    html: '<div class="custom-circle"></div>',
    iconSize: [100, 100],
    iconAnchor: [50, 50],
  });

  const allCarKeys = Object.keys(positions);

  const getPolylineColor = (index) => {
    switch (index) {
      case 0: return { color: 'rgb(255, 0, 0, 0.1)', weight: 5 };
      case 1: return { color: 'rgba(255, 0, 0, 0.25)', weight: 4 };
      case 2: return { color: 'rgba(255, 0, 0, 0.5)', weight: 3 };
      default: return { color: 'rgba(255, 0, 0, 1)', weight: 2 };
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%", right: 0 }}>
      <MapContainer center={[32.65946803213527, 51.648447228835416]} zoom={7} style={{ width: '100%', height: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {allCarKeys.map((carKey) => {
          const currentPositions = positions[carKey] || [];

          const lines = currentPositions.slice(0, -1).map((start, index) => {
            const end = currentPositions[index + 1];
            return (
              <Polyline
                key={`${carKey}-line-${index}`}  // به هر خط یک key خاص بدهید
                positions={[start, end]}
                pathOptions={getPolylineColor(index)}
              />
            );
          });

          return (
            <React.Fragment key={carKey}>
              {currentPositions.map((position, index) => {
                return (
                  <Marker key={`${carKey}-marker-${index}`} position={position} icon={icon}>
                    <Popup>موقعیت خودرو {index + 1} - {carKey}</Popup>
                  </Marker>
                );
              })}

              {lines}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
