'use client';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import api from '@/lib/axios';
import useCarStore from '@/stores/useCarStore';
import { toast } from 'react-toastify';

const MapComponent = () => {

  const {
    selectedCarAvlIds,
    vehiclePositions,
    addVehiclePosition,
  } = useCarStore();

  // ⬇️ آیکون سفارشی برای نمایش خودرو روی نقشه
  const icon = new L.icon({
    iconUrl: '/img/azar-on.png',
    iconSize: [50, 50],
  });

  // ⬇️ گرفتن موقعیت خودرو از API هر ۵ ثانیه
// useEffect(() => {
//   if (selectedCarAvlIds.length === 0) return;

//   const fetchInitialPosition = async () => {
//     try {
//       const { data } = await api.get('v2/points', {
//         params: {
//           avlIds: selectedCarAvlIds.join(','),
//           convertedToLocal: true,
//         },
//       });
//       console.log("Fetched vehicle positions:", data);
//       data.forEach((item) => {
//         const avlId = `${item.avlId}`;
//         const newPosition = [item.latitude, item.longitude];

//         // اگر موقعیت جدید وجود ندارد یا متفاوت است، اضافه کن
//         if (!vehiclePositions[avlId] || !vehiclePositions[avlId].some(pos => pos[0] === newPosition[0] && pos[1] === newPosition[1])) {
//           addVehiclePosition(avlId, newPosition);
//         }
//       })
//     }catch (error) {
//       console.error("Error fetching vehicle position:", error);
//       toast.error('خطا در دریافت موقعیت خودرو. لطفاً اتصال دستگاه را بررسی کنید.');
//     }
//   };

//   // ⬅️ این اجرا میشه بلافاصله بعد از انتخاب خودرو
//   fetchInitialPosition();

//   const interval = setInterval(fetchInitialPosition, 5000);

//   return () => clearInterval(interval);
// }, [selectedCarAvlIds]);


  // ⬇️ گرفتن مسیرهای این خودرو (فقط مسیر خودرو انتخاب‌شده فعلی)
  const currentPositions = vehiclePositions[selectedCarAvlIds] || [];


  const getPolylineColor = (index) => {
    switch (index) {
      case 0: return { color: 'rgba(0, 0, 0, 1)', weight: 5 };
      case 1: return { color: 'rgba(0, 0, 0, 0.5)', weight: 4 };
      case 2: return { color: 'rgba(0, 0, 0, 0.25)', weight: 3 };
      default: return { color: 'rgba(0, 0, 0, 0.1)', weight: 2 };
    }
  };

  // ⬇️ ایجاد خطوط بین نقاط مسیر
  const lines = currentPositions.slice(0, -1).map((start, index) => {
    const end = currentPositions[index + 1];
    
    return (
      <Polyline
        key={index}
        positions={[start, end]}
        pathOptions={getPolylineColor(index)}
      />
    );
  });

  return (
    <Box sx={{ width: "100%", height: "100%", right: 0 }}>
      <MapContainer center={[32.65946803213527, 51.648447228835416]} zoom={7} style={{ width: '100%', height: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {/* ⬇️ نمایش نقاط موقعیت خودرو */}
        {currentPositions.map((position, index) => (
          <Marker key={index} position={position} icon={icon}>
            <Popup>موقعیت خودرو {index + 1}</Popup>
          </Marker>
        ))}

        {/* ⬇️ نمایش خطوط مسیر */}
        {lines}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
