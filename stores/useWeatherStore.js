// useWeatherStore.js
import { create } from 'zustand';

const useWeatherStore = create((set, get) => ({
  weather: null,
  loading: false,
  error: null,

  fetchWeather: async () => {
    const { weather } = get();

    if (weather) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Esfahan,IR&appid=2564391e0e10100c0acb450b095f49dd&units=metric&lang=fa'
      );
      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error(data.message || 'خطا در دریافت اطلاعات');
      }

      set({ weather: data });
    } catch (error) {
      console.error('Weather Fetch Error:', error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useWeatherStore;
