import { create } from 'zustand'

const useMenusStore = create((set, get) => ({
    isDrawerOpen: false,
    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false }),
    toggleDrawer: () => {
        set({ isDrawerOpen: !get().isDrawerOpen });
    },
}))

export default useMenusStore;



