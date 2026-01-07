
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityType, MarkerItem, Toast, User, ExchangeType } from './types';
import { MAP_ITEMS, MOCK_USER } from './constants';

interface AppState {
  user: User;
  isAuthenticated: boolean;
  isVerified: boolean; // Passeport 26Connect validé
  activities: MarkerItem[];
  toasts: Toast[];
  login: () => void;
  verifyIdentity: () => void;
  addActivity: (activity: Omit<MarkerItem, 'id' | 'user' | 'participants' | 'createdAt'>) => void;
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  joinActivity: (id: string) => boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or constants
  const [activities, setActivities] = useState<MarkerItem[]>(() => {
    const saved = localStorage.getItem('26connect_activities');
    return saved ? JSON.parse(saved) : MAP_ITEMS;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist activities
  useEffect(() => {
    localStorage.setItem('26connect_activities', JSON.stringify(activities));
  }, [activities]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const verifyIdentity = () => {
    setIsVerified(true);
    addToast('Identité vérifiée avec succès ! 🇨🇭', 'success');
  };

  const addActivity = (data: Omit<MarkerItem, 'id' | 'user' | 'participants' | 'createdAt'>) => {
    const newActivity: MarkerItem = {
      ...data,
      id: Date.now().toString(),
      user: { ...MOCK_USER, isVerified: true }, // L'utilisateur connecté est vérifié
      participants: 1, 
      createdAt: Date.now(),
    };
    setActivities(prev => [newActivity, ...prev]);
    addToast('Activité créée et visible sur la carte ! 🚀', 'success');
  };

  const joinActivity = (id: string): boolean => {
    let success = false;
    setActivities(prev => prev.map(a => {
      if (a.id === id) {
        if (a.maxParticipants > 0 && a.participants >= a.maxParticipants) {
          addToast('Désolé, cette activité est complète ! 😢', 'error');
          return a;
        }
        success = true;
        return { ...a, participants: a.participants + 1 };
      }
      return a;
    }));
    
    if (success) {
      addToast('Vous avez rejoint l\'activité ! 🎉', 'success');
    }
    return success;
  };

  const addToast = (message: string, type: Toast['type']) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      user: MOCK_USER, 
      isAuthenticated,
      isVerified,
      login,
      verifyIdentity,
      activities, 
      toasts, 
      addActivity, 
      addToast, 
      removeToast,
      joinActivity 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
