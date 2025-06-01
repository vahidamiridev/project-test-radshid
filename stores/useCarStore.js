import { create } from "zustand";
import api from "@/lib/axios";

const useCarStore = create((set, get) => ({
  selectedCars: [],
  selectedCarAvlIds: [],
  carsInfo: [],
  vehiclePositions: {},
  loading: false,
  error: null,

  toggleCarSelection: (car, callback) => {
    const { selectedCars, selectedCarAvlIds, vehiclePositions } = get();
    const avlId = `${car.avlId}`;
    const alreadySelected = selectedCars.some((c) => c.id === car.id);

    if (alreadySelected) {
      set({
        selectedCars: selectedCars.filter((c) => c.id !== car.id),
        selectedCarAvlIds: selectedCarAvlIds.filter((id) => id !== avlId),
      });
    } else {
      if (!vehiclePositions[avlId]) {
        set({
          vehiclePositions: {
            ...vehiclePositions,
            [avlId]: [],
          },
        });
      }

      set({
        selectedCars: [...selectedCars, car],
        selectedCarAvlIds: [...selectedCarAvlIds, avlId],
      });
    }
    console.log("string : " + get().selectedCarAvlIds.join(",")) //...........
    if (callback) callback(get().selectedCarAvlIds)
  },

  addVehiclePosition: (avlId, newPosition) => {
    const positions = get().vehiclePositions[avlId] || [];

    const updated = [...positions, newPosition].slice(0, 4);

    set((state) => ({
      vehiclePositions: {
        ...state.vehiclePositions,
        [avlId]: updated,
      },
    }));

    console.log(` vehiclePositions  ` ,  get().vehiclePositions);
    console.log(`Updated vehiclePositions for ${avlId}:`, get().vehiclePositions[avlId]);
  }
  ,

  fetchCars: async () => {
    const cars = get().carsInfo;
    if (cars.length > 0) return;

    set({ loading: true, error: null });

    try {
      const res = await api.get("v1/cars");
      set({
        carsInfo: res.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || "خطا در دریافت خودروها",
        loading: false,
      });
    }
  },
}));

export default useCarStore;
