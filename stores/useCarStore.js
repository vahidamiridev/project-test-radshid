import { create } from 'zustand'
import api from '@/lib/axios'

// ⬇️ استور مدیریت خودروها و مسیر حرکت هر خودرو
const useCarStore = create((set, get) => ({
  selectedCar: null,                  // خودروی انتخاب‌شده
  selectedCarAvlIds: '',              // شناسه AVL خودرو (برای API)
  carsInfo: [],                       // لیست همه خودروها
  vehiclePositions: {},               // مسیر حرکت هر خودرو (Map از avlId به آرایه نقاط)
  loading: false,
  error: null,

  // ⬇️ انتخاب یک خودرو خاص و اطمینان از آماده بودن مسیر آن
  setSelectedCar: (car) => {
    const avlId = `${car.avlId}`;
    const currentPositions = get().vehiclePositions;

    // اگر مسیر این خودرو هنوز ذخیره نشده، مقداردهی اولیه خالی انجام بده
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

  // ⬇️ اضافه کردن یک نقطه جدید به مسیر خودرو (حداکثر ۴ نقطه نگه می‌داریم)
  addVehiclePosition: (avlId, newPosition) => {
    const positions = get().vehiclePositions[avlId] || [];
    const updated = [newPosition, ...positions].slice(0, 4); // فقط ۴ نقطه آخر نگه داشته میشه

    set((state) => ({
      vehiclePositions: {
        ...state.vehiclePositions,
        [avlId]: updated,
      },
    }));
  },

  // ⬇️ گرفتن لیست خودروها از سرور
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
          [`${firstCar.avlId}`]: [], // مقداردهی اولیه مسیر برای اولین خودرو
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
