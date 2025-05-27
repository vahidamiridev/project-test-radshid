'use client'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Box } from '@mui/material';
const MapComponent = () => {
  const icon = new L.icon({
    iconUrl: '/img/azar-on.png',
    iconSize: [50, 50]
  })
  return (
    <Box sx={{ width: '100%', height: '100%' , position:'fixed' , top:"64px" , right:0 }}>
      <MapContainer center={[35.6892, 51.3]} zoom={12} style={{ width: '100%', height: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker position={[35.6892, 51.3890]} icon={icon}>
          <Popup>
            آذرخش
          </Popup>
        </Marker>
      </MapContainer>
    </Box>

  );
};
export default MapComponent
