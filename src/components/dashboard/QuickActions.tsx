import Card from '../shared/Card';
import Button from '../shared/Button';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const QuickActions = ({ onAction }: QuickActionsProps) => {
  const actions: QuickAction[] = [
    { id: 'new_form', label: 'Crear Nuevo Formulario', icon: '✨', variant: 'primary' },
    { id: 'add_patient', label: 'Agregar Paciente', icon: '👤', variant: 'secondary' },
    { id: 'view_forms', label: 'Ver Todos los Formularios', icon: '📋', variant: 'outline' },
    { id: 'view_stats', label: 'Ver Estadísticas', icon: '📊', variant: 'outline' },
  ];

  return (
    <Card title="Acciones Rápidas">
      <div className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            className="w-full justify-start"
            onClick={() => onAction(action.id)}
          >
            <span className="mr-2">{action.icon}</span> {action.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions; 