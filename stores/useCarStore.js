import { create } from 'zustand'
import api from '@/lib/axios'

const  useCarStore = create((set, get) => ({
  carsInfo: [],
  loading: false,
  error: null,
  fetchCars: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.get('v1/cars')
      set({ carsInfo: [...get().carsInfo, ...res.data], loading: false }) // اصلاح شده
      console.log(res.data)
    } catch (error) {
      set({ error: error.message || 'خطا در دریافت خودروها', loading: false })
    }
  }
}))

export default useCarStore;