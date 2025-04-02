import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

interface FormHeaderProps {
  title: string;
  isPreview: boolean;
  hasFields: boolean;
  onTogglePreview: () => void;
  onSave: () => void;
}

const FormHeader = ({ 
  title, 
  isPreview, 
  hasFields, 
  onTogglePreview, 
  onSave 
}: FormHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="py-4 px-6 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {title || 'Formulario médico'}
        </h1>
        <p className="text-sm text-gray-500">
          {isPreview ? 'Vista previa' : 'Editor de formularios médicos'}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => navigate('/forms')}
        >
          Cancelar
        </Button>
        
        {!isPreview && (
          <>
            <Button 
              variant="outline" 
              onClick={onTogglePreview}
              disabled={!hasFields}
            >
              Vista previa
            </Button>
            <Button 
              variant="primary" 
              onClick={onSave}
            >
              Guardar
            </Button>
          </>
        )}
        
        {isPreview && (
          <Button 
            variant="outline" 
            onClick={onTogglePreview}
          >
            Volver al editor
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormHeader; 