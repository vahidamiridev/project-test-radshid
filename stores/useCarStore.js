import { create } from 'zustand'
import api from '@/lib/axios'

const useCarStore = create((set, get) => ({
  selectedCar: null,
  carsInfo: [],
  loading: false,
  error: null,
  setSelectedCar: (car) => {
    set({ selectedCar: car });
  },
  fetchCars: async () => {
    const cars = get().carsInfo;
    if (cars.length > 0) return;
    set({ loading: true, error: null });
    try {
      const res = await api.get('v1/cars');
      set({ carsInfo: res.data, loading: false ,selectedCar:res.data[0]  });
    } catch (error) {
      set({ error: error.message || 'خطا در دریافت خودروها', loading: false });
    }
  }

}))

export default useCarStore;



