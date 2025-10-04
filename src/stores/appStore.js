import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        // UI State
        sidebarOpen: false,
        notifications: [],
        searchQuery: '',
        searchResults: [],
        
        // User Preferences
        preferences: {
          language: 'en',
          currency: 'USD',
          timezone: 'UTC',
          notifications: true,
          autoRefresh: true,
          refreshInterval: 30000, // 30 seconds
        },
        
        // App State
        loading: false,
        error: null,
        online: navigator.onLine,
        
        // Actions
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        setSearchQuery: (query) => set({ searchQuery: query }),
        
        setSearchResults: (results) => set({ searchResults: results }),
        
        addNotification: (notification) => set((state) => ({
          notifications: [...state.notifications, {
            id: Date.now(),
            timestamp: new Date(),
            ...notification
          }]
        })),
        
        removeNotification: (id) => set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        })),
        
        clearNotifications: () => set({ notifications: [] }),
        
        updatePreferences: (updates) => set((state) => ({
          preferences: { ...state.preferences, ...updates }
        })),
        
        setLoading: (loading) => set({ loading }),
        
        setError: (error) => set({ error }),
        
        setOnline: (online) => set({ online }),
        
        // Utility actions
        resetApp: () => set({
          sidebarOpen: false,
          notifications: [],
          searchQuery: '',
          searchResults: [],
          loading: false,
          error: null,
        }),
      }),
      {
        name: 'intelliroute-app-store',
        partialize: (state) => ({
          preferences: state.preferences,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: 'intelliroute-store',
    }
  )
);

// Selectors for better performance with stable references
export const useSidebar = () => {
  const isOpen = useAppStore((state) => state.sidebarOpen);
  const toggle = useAppStore((state) => state.toggleSidebar);
  return { isOpen, toggle };
};

export const useNotifications = () => {
  const notifications = useAppStore((state) => state.notifications);
  const add = useAppStore((state) => state.addNotification);
  const remove = useAppStore((state) => state.removeNotification);
  const clear = useAppStore((state) => state.clearNotifications);
  return { notifications, add, remove, clear };
};

export const useSearch = () => {
  const query = useAppStore((state) => state.searchQuery);
  const results = useAppStore((state) => state.searchResults);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const setResults = useAppStore((state) => state.setSearchResults);
  return { query, results, setQuery, setResults };
};

export const usePreferences = () => {
  const preferences = useAppStore((state) => state.preferences);
  const update = useAppStore((state) => state.updatePreferences);
  return { preferences, update };
};