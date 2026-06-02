import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

type UIState = {
  theme: Theme
  sidebarCollapsed: boolean
  mobileNavOpen: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebarCollapsed: () => void
  setMobileNavOpen: (open: boolean) => void
  toggleMobileNav: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      sidebarCollapsed: false,
      mobileNavOpen: false,

      setTheme: (theme) => set({ theme }),

      toggleTheme: () =>
        set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),

      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      toggleSidebarCollapsed: () =>
        set({ sidebarCollapsed: !get().sidebarCollapsed }),

      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),

      toggleMobileNav: () => set({ mobileNavOpen: !get().mobileNavOpen }),
    }),
    {
      name: 'grocerygo-ui',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
)

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}
