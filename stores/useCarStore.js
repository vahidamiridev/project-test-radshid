import { create } from 'zustand'
import api from '@/lib/axios'

const useCarStore = create((set, get) => ({
  selectedCar: null,                 
  selectedCarAvlIds: '',           
  carsInfo: [],                     
  vehiclePositions: {},         
  loading: false,
  error: null,

  setSelectedCar: (car) => {
    const avlId = `${car.avlId}`;
    const currentPositions = get().vehiclePositions;

    if (!currentPositions[avlId]) {
      set((state) => ({
        vehiclePositions: {
          ...state.vehiclePositions,
          [avlId]: [],
        },
      }));
    }

    set({ selectedCar: car, selectedCarAvlIds: avlId });
  },

  addVehiclePosition: (avlId, newPosition) => {
    const positions = get().vehiclePositions[avlId] || [];
    const updated = [newPosition, ...positions].slice(0, 4); 

    set((state) => ({
      vehiclePositions: {
        ...state.vehiclePositions,
        [avlId]: updated,
      },
    }));
  },

  fetchCars: async () => {
    const cars = get().carsInfo;
    if (cars.length > 0) return;

    set({ loading: true, error: null });

    try {
      const res = await api.get('v1/cars');
      const firstCar = res.data[0];

      set({
        carsInfo: res.data,
        loading: false,
        selectedCar: firstCar,
        selectedCarAvlIds: `${firstCar.avlId}`,
        vehiclePositions: {
          [`${firstCar.avlId}`]: [], 
        },
      });
    } catch (error) {
      set({
        error: error.message || 'خطا در دریافت خودروها',
        loading: false,
      });
    }
  }
}));

export default useCarStore;
