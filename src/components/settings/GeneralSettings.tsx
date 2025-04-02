import { UserSettings } from '../../hooks/useSettings';
import Card from '../shared/Card';
import Select from '../shared/Select';

interface GeneralSettingsProps {
  settings: UserSettings;
  onUpdate: (settings: Partial<UserSettings>) => void;
}

const GeneralSettings = ({ settings, onUpdate }: GeneralSettingsProps) => {
  const themes = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
    { value: 'system', label: 'Sistema' },
  ];

  const languages = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
  ];

  const timezones = [
    { value: 'America/Mexico_City', label: 'Ciudad de México (GMT-6)' },
    { value: 'America/New_York', label: 'Nueva York (GMT-5)' },
    { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6">Preferencias Generales</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tema
          </label>
          <Select
            value={settings.theme}
            onChange={(value: string) => onUpdate({ theme: value as UserSettings['theme'] })}
            options={themes}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idioma
          </label>
          <Select
            value={settings.language}
            onChange={(value: string) => onUpdate({ language: value as UserSettings['language'] })}
            options={languages}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zona horaria
          </label>
          <Select
            value={settings.timezone}
            onChange={(value: string) => onUpdate({ timezone: value })}
            options={timezones}
          />
        </div>
      </div>
    </Card>
  );
};

export default GeneralSettings; 