import Button from '../shared/Button';
import Card from '../shared/Card';

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
    <Card 
      variant="raised" 
      padding="none"
      className={`overflow-hidden transition-all hover:translate-y-[-2px] ${isActive ? 'border-l-4 border-l-indigo-500' : 'border-l-4 border-l-gray-300'}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-medium ${isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}>
            {isActive ? 'Activo' : 'Inactivo'}
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm space-x-4 mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span>{responseCount} respuestas</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
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
    </Card>
  );
};

export default FormCard; 