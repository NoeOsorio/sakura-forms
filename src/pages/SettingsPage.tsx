import { useSettings } from '../hooks/useSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import GeneralSettings from '../components/settings/GeneralSettings';
import Button from '../components/shared/Button';

const SettingsPage = () => {
  const { settings, updateSettings, updateNotificationSettings } = useSettings();

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios en el backend
    console.log('Guardando configuración:', settings);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Configuración</h1>
        <Button onClick={handleSave}>
          Guardar cambios
        </Button>
      </div>

      <div className="space-y-8">
        <NotificationSettings
          settings={settings}
          onUpdate={updateNotificationSettings}
        />

        <GeneralSettings
          settings={settings}
          onUpdate={updateSettings}
        />
      </div>
    </div>
  );
};

export default SettingsPage; 