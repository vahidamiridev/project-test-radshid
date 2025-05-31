'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { shallow } from 'zustand/shallow';
import { Box } from '@mui/material';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '@/lib/axios';
import useCarStore from '@/stores/useCarStore';

const AutoFitBounds = ({ allPositions }) => {
  const map = useMap();

  useEffect(() => {
    const flatPositions = allPositions.flat().filter(pos => Array.isArray(pos) && pos.length === 2);
    if (flatPositions.length > 0) {
      map.fitBounds(flatPositions);
    }
  }, [allPositions]);

  return null;
};

const MapComponent = () => {
  const {
    selectedCarAvlIds,
    vehiclePositions,
    addVehiclePosition,
  } = useCarStore(
    (state) => ({
      selectedCarAvlIds: state.selectedCarAvlIds || [],
      vehiclePositions: state.vehiclePositions,
      addVehiclePosition: state.addVehiclePosition,
    }),
    shallow
  );

  const avlIdsString = useMemo(() => selectedCarAvlIds.join(','), [selectedCarAvlIds]);

  const [startTime, setStartTime] = useState(null);
  const [lastFetchedInterval, setLastFetchedInterval] = useState(null);
  const intervalRef = useRef(null);
  const prevAvlIdsRef = useRef('');

  const fetchPositions = async () => {
    try {
      const { data } = await api.get('v2/points', {
        params: {
          avlIds: avlIdsString,
          convertedToLocal: true,
        },
      });

      data.forEach((item) => {
        const newPosition = [item.latitude, item.longitude];
        if (item.avlId && newPosition[0] && newPosition[1]) {
          addVehiclePosition(`${item.avlId}`, newPosition);
        }
      });
    } catch (error) {
      toast.error('خطا در دریافت موقعیت خودروها');
    }
  };

  useEffect(() => {
    
    if (!avlIdsString) {
      clearInterval(intervalRef.current);
      setStartTime(null);
      setLastFetchedInterval(null);
      return;
    }

    // Reset interval only if selection changed
    if (avlIdsString !== prevAvlIdsRef.current) {
      clearInterval(intervalRef.current);
      setStartTime(Date.now());
      setLastFetchedInterval(null);
      prevAvlIdsRef.current = avlIdsString;

      fetchPositions(); // initial fetch
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const secondsPassed = Math.floor((now - startTime) / 1000);
        if (secondsPassed % 5 === 0 && secondsPassed !== lastFetchedInterval) {
          setLastFetchedInterval(secondsPassed);
          fetchPositions();
        }
      }, 1000); // check every second
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [avlIdsString]);

  const dotIcon = L.divIcon({
    html: `<div style="width: 10px; height: 10px; background-color: green; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 3px #000;"></div>`,
    iconSize: [5, 5],
    iconAnchor: [5, 5],
  });

  const icon = new L.Icon({
    iconUrl: '/img/azar-on.png',
    iconSize: [50, 50],
  });

  const allPositions = selectedCarAvlIds.map((avlId) => vehiclePositions[avlId] || []);

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer
        center={[32.659, 51.648]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {allPositions.some((arr) => arr.length > 0) && (
          <AutoFitBounds allPositions={allPositions} />
        )}

        {selectedCarAvlIds.map((avlId, carIndex) => {
          const positions = vehiclePositions[avlId] || [];

          return (
            <div key={avlId}>
              {positions.map((position, index) => (
                <Marker
                  key={index}
                  position={position}
                  icon={index === positions.length - 1 ? icon : dotIcon}
                >
                  <Popup>خودرو {avlId} - موقعیت {index + 1}</Popup>
                </Marker>
              ))}

              {positions.slice(0, -1).map((start, index) => {
                const end = positions[index + 1];
                return (
                  <Polyline
                    key={`line-${avlId}-${index}`}
                    positions={[start, end]}
                    pathOptions={{
                      color: `hsl(${carIndex * 60}, 100%, 50%)`,
                      weight: 3,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </MapContainer>

      {selectedCarAvlIds.length === 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
        >
          هیچ خودرویی انتخاب نشده است
        </Box>
      )}
    </Box>
  );
};

export default MapComponent;
