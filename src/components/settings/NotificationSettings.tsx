import { UserSettings } from '../../hooks/useSettings';
import Card from '../shared/Card';
import Switch from '../shared/Switch';

interface NotificationSettingsProps {
  settings: UserSettings;
  onUpdate: (type: keyof UserSettings['notifications'], value: boolean) => void;
}

const NotificationSettings = ({ settings, onUpdate }: NotificationSettingsProps) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6">Notificaciones</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notificaciones por correo</h3>
            <p className="text-sm text-gray-500">Recibe actualizaciones por correo electrónico</p>
          </div>
          <Switch
            checked={settings.notifications.email}
            onChange={(checked: boolean) => onUpdate('email', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notificaciones push</h3>
            <p className="text-sm text-gray-500">Recibe notificaciones en tu dispositivo móvil</p>
          </div>
          <Switch
            checked={settings.notifications.push}
            onChange={(checked: boolean) => onUpdate('push', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notificaciones de escritorio</h3>
            <p className="text-sm text-gray-500">Recibe notificaciones en tu navegador</p>
          </div>
          <Switch
            checked={settings.notifications.desktop}
            onChange={(checked: boolean) => onUpdate('desktop', checked)}
          />
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings; 