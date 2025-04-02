import { Link } from 'react-router-dom';
import { RecentForm } from '../../hooks/useRecentForms';
import Button from '../shared/Button';

interface RecentFormsTableProps {
  forms: RecentForm[];
}

const RecentFormsTable = ({ forms }: RecentFormsTableProps) => {
  if (forms.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        <p className="mb-4">No tienes formularios recientes</p>
        <Link to="/forms/new">
          <Button>
            Crear tu primer formulario
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left py-4 px-6 font-medium text-gray-600">Título</th>
            <th className="text-center py-4 px-6 font-medium text-gray-600">Respuestas</th>
            <th className="text-center py-4 px-6 font-medium text-gray-600">Última Actualización</th>
            <th className="text-right py-4 px-6 font-medium text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6 font-medium">{form.title}</td>
              <td className="py-4 px-6 text-center">{form.responses}</td>
              <td className="py-4 px-6 text-center text-gray-500">{form.lastUpdated}</td>
              <td className="py-4 px-6 text-right">
                <Link to={`/forms/edit/${form.id}`} className="mr-2">
                  <Button variant="outline">
                    Editar
                  </Button>
                </Link>
                <Link to={`/responses/${form.id}`}>
                  <Button variant="secondary">
                    Ver Respuestas
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentFormsTable; 