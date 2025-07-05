import { create } from 'zustand'

export const useStore = create((set) => (
    {
        collapse: false,
        openSidebar: () => set(() => ({ collapse: true })),
        closeSidebar: () => set(() => ({ collapse: false }))
    }
))

