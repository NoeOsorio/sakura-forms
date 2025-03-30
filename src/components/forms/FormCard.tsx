import Button from '../shared/Button';

interface FormCardProps {
  id: number;
  title: string;
  description: string;
  responseCount: number;
  lastUpdated: string;
  isActive?: boolean;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const FormCard = ({
  id,
  title,
  description,
  responseCount,
  lastUpdated,
  isActive = true,
  onView,
  onEdit,
  onDelete
}: FormCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden border-l-4 ${isActive ? 'border-teal-500' : 'border-gray-300'}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
          </div>
          <div className={`rounded-full px-2 py-1 text-xs font-medium ${isActive ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-700'}`}>
            {isActive ? 'Activo' : 'Inactivo'}
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm space-x-4 mb-4">
          <div className="flex items-center">
            <span className="mr-1">📊</span>
            <span>{responseCount} respuestas</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🕒</span>
            <span>Actualizado: {lastUpdated}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {onView && (
            <Button 
              variant="secondary" 
              onClick={() => onView(id)}
              className="flex-1"
            >
              Ver
            </Button>
          )}
          {onEdit && (
            <Button 
              variant="outline" 
              onClick={() => onEdit(id)}
              className="flex-1"
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="danger" 
              onClick={() => onDelete(id)}
              className="flex-1"
            >
              Eliminar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCard; 