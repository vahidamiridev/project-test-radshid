'use client';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

const MapComponent = () => {
  const [vehiclePositions, setVehiclePositions] = useState([]);
  const icon = new L.icon({
    iconUrl: '/img/azar-on.png',
    iconSize: [50, 50],
  });

  
  const fromDate = '2025-05-25T00:00:00Z'; 
  const toDate = '2025-05-26T00:00:00Z'; 
  const avlIds = '12,1,3'; 
  const convertedToLocal = true; 

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     api.get('v1/avl/points', {
  //       params: {
  //         From: fromDate,  
  //         To: toDate,      
  //         avlIds: avlIds,   
  //         convertedToLocal: convertedToLocal, 
  //       },
  //     })
  //       .then((response) => {
  //         const newPosition = response.data.position; 
  //         setVehiclePositions((prevPositions) => {
  //           const updatedPositions = [newPosition, ...prevPositions].slice(0, 4);
  //           return updatedPositions;
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching vehicle position:", error);
  //       });
  //   }, 5000);
  //   console.log("vehiclePositions: " + vehiclePositions)
  //   return () => clearInterval(interval); 
  // }, [fromDate, toDate, avlIds, convertedToLocal]);

  const getPolylineColor = (index) => {
    switch (index) {
      case 0:
        return { color: 'rgba(0, 0, 0, 1)', weight: 5 }; 
      case 1:
        return { color: 'rgba(0, 0, 0, 0.5)', weight: 4 }; 
      case 2:
        return { color: 'rgba(0, 0, 0, 0.25)', weight: 3 };
      default:
        return { color: 'rgba(0, 0, 0, 0.25)', weight: 3 };
    }
  };

  const lines = vehiclePositions.slice(0, -1).map((start, index) => {
    const end = vehiclePositions[index + 1];
    return (
      <Polyline
        key={index}
        positions={[start, end]}
        pathOptions={getPolylineColor(index)} // رنگ خط بر اساس ایندکس
      />
    );
  });

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'fixed', top: '64px', right: 0 }}>
      <MapContainer center={[35.6892, 51.3]} zoom={12} style={{ width: '100%', height: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        
        {vehiclePositions.map((position, index) => (
          <Marker key={index} position={position} icon={icon}>
            <Popup>موقعیت خودرو {index + 1}</Popup>
          </Marker>
        ))}
        
        {lines}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
