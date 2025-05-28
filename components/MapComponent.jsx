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
  // ⬇️ گرفتن وضعیت انتخاب‌شده و مسیر هر ماشین از استور
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
useEffect(() => {
  if (!selectedCarAvlIds) return;

  const fetchInitialPosition = async () => {
    try {
      const { data } = await api.get('v2/points', {
        params: {
          avlIds: selectedCarAvlIds,
          convertedToLocal: true,
        },
      });

      const latitude = data[0]?.latitude;
      const longitude = data[0]?.longitude;

      if (!latitude || !longitude) return;

      const newPosition = [latitude, longitude];
      addVehiclePosition(selectedCarAvlIds, newPosition);
    } catch (error) {
      console.error("Error fetching vehicle position:", error);
      toast.error('خطا در دریافت موقعیت خودرو. لطفاً اتصال دستگاه را بررسی کنید.');
    }
  };

  // ⬅️ این اجرا میشه بلافاصله بعد از انتخاب خودرو
  fetchInitialPosition();

  const interval = setInterval(fetchInitialPosition, 5000);

  return () => clearInterval(interval);
}, [selectedCarAvlIds]);


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



//کامپوننت بالا  اصلی است  و تنظیمات واستیت برای هر خودرو جدا گانه انجام شده
//به علت مشکلات در بک اند  این کامپوننت به صورت دستی  نقطه دهی شده است  و خیلی ساده تا نمایش انجام شود

// 'use client';
// import L from 'leaflet';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Box } from '@mui/material';

// const MapComponent = () => {
//   // آیکون سفارشی خودرو
//   const icon = new L.icon({
//     iconUrl: '/img/azar-on.png',
//     iconSize: [50, 50],
//   });

//   // نقاط دستی برای تست (۴ نقطه از اصفهان به سمت غرب)
//   const positions = [
//     [32.659468, 51.648447], // نقطه اول
//     [32.65, 51.60],         // نقطه دوم
//     [32.64, 51.55],         // نقطه سوم
//     [32.63, 51.50],         // نقطه چهارم
//   ];

//   // رنگ‌های دلخواه برای خطوط بین هر دو نقطه
//   const colors = [
//     { color: 'red', weight: 5 },
//     { color: 'blue', weight: 4 },
//     { color: 'green', weight: 3 },
//   ];

//   // ساخت خطوط از نقاط
//   const lines = positions.slice(0, -1).map((start, index) => {
//     const end = positions[index + 1];
//     return (
//       <Polyline
//         key={index}
//         positions={[start, end]}
//         pathOptions={colors[index] || { color: 'gray', weight: 2 }}
//       />
//     );
//   });

//   return (
//     <Box sx={{ width: "100%", height: "100%" }}>
//       <MapContainer
//         center={[32.659468, 51.648447]}
//         zoom={11}
//         style={{ width: '100%', height: '100%' }}
//       >
//         <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

//         {/* مارکرها */}
//         {positions.map((position, index) => (
//           <Marker key={index} position={position} icon={icon}>
//             <Popup>نقطه {index + 1}</Popup>
//           </Marker>
//         ))}

//         {/* خطوط */}
//         {lines}
//       </MapContainer>
//     </Box>
//   );
// };

// export default MapComponent;
