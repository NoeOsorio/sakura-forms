import { RecentForm } from '../../hooks/useDashboard';
import Card from '../shared/Card';
import Button from '../shared/Button';

interface RecentFormsTableProps {
  forms: RecentForm[];
  onView: (formId: number) => void;
  onEdit: (formId: number) => void;
}

const RecentFormsTable = ({ forms, onView, onEdit }: RecentFormsTableProps) => {
  return (
    <Card title="Formularios Recientes">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-3 font-medium text-gray-500">Nombre</th>
              <th className="text-left pb-3 font-medium text-gray-500">Respuestas</th>
              <th className="text-left pb-3 font-medium text-gray-500">Última Actividad</th>
              <th className="text-right pb-3 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{form.name}</td>
                <td className="py-3">{form.responses}</td>
                <td className="py-3">{form.lastActive}</td>
                <td className="py-3 text-right">
                  <Button 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => onView(form.id)}
                  >
                    Ver
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => onEdit(form.id)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentFormsTable; 