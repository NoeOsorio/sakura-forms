import { useState } from 'react';

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  timezone: string;
}

const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    desktop: false,
  },
  theme: 'system',
  language: 'es',
  timezone: 'America/Mexico_City',
};

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  const updateNotificationSettings = (type: keyof UserSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }));
  };

  return {
    settings,
    updateSettings,
    updateNotificationSettings,
  };
}; 