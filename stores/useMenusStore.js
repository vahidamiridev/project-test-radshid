import { create } from 'zustand'

const useMenusStore = create((set, get) => ({
    isDrawerOpen: false,
    toggleDrawer: () => {
        set({ isDrawerOpen: !get().isDrawerOpen });
    },
}))

export default useMenusStore;



