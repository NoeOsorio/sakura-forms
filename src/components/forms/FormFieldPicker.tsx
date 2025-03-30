// Define the field types
type FieldType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'checkbox' 
  | 'radio' 
  | 'select' 
  | 'textarea' 
  | 'date'
  | 'scale'
  | 'file'
  | 'signature';

interface FieldOption {
  type: FieldType;
  label: string;
  icon: string;
  description: string;
}

interface FormFieldPickerProps {
  onSelect: (type: FieldType) => void;
}

const FormFieldPicker = ({ onSelect }: FormFieldPickerProps) => {
  // Define all available field types
  const fieldOptions: FieldOption[] = [
    { 
      type: 'text', 
      label: 'Texto', 
      icon: 'Aa', 
      description: 'Campo de texto corto' 
    },
    { 
      type: 'textarea', 
      label: 'Texto largo', 
      icon: '¶', 
      description: 'Respuesta en párrafos' 
    },
    { 
      type: 'email', 
      label: 'Email', 
      icon: '✉️', 
      description: 'Correo electrónico' 
    },
    { 
      type: 'phone', 
      label: 'Teléfono', 
      icon: '📱', 
      description: 'Número telefónico' 
    },
    { 
      type: 'number', 
      label: 'Número', 
      icon: '#', 
      description: 'Valor numérico' 
    },
    { 
      type: 'date', 
      label: 'Fecha', 
      icon: '📅', 
      description: 'Selector de fecha' 
    },
    { 
      type: 'checkbox', 
      label: 'Casillas', 
      icon: '☑️', 
      description: 'Selección múltiple' 
    },
    { 
      type: 'radio', 
      label: 'Opción única', 
      icon: '⭕', 
      description: 'Selección única' 
    },
    { 
      type: 'select', 
      label: 'Desplegable', 
      icon: '▼', 
      description: 'Lista de opciones' 
    },
    { 
      type: 'scale', 
      label: 'Escala', 
      icon: '⭐', 
      description: 'Valoración 1-10' 
    },
    { 
      type: 'file', 
      label: 'Archivo', 
      icon: '📎', 
      description: 'Subir documentos' 
    },
    { 
      type: 'signature', 
      label: 'Firma', 
      icon: '✍️', 
      description: 'Firma digital' 
    },
  ];

  // Group field options by category
  const basicFields = fieldOptions.filter(f => 
    ['text', 'textarea', 'email', 'phone', 'number'].includes(f.type));
  
  const choiceFields = fieldOptions.filter(f => 
    ['checkbox', 'radio', 'select'].includes(f.type));
  
  const advancedFields = fieldOptions.filter(f => 
    ['date', 'scale', 'file', 'signature'].includes(f.type));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Campos básicos</h3>
        <div className="space-y-2">
          {basicFields.map((field) => (
            <button
              key={field.type}
              onClick={() => onSelect(field.type)}
              className="w-full flex items-center p-2 hover:bg-teal-50 rounded-md text-left transition-colors"
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-teal-100 text-teal-700 rounded mr-2">
                {field.icon}
              </span>
              <div>
                <p className="font-medium text-gray-800">{field.label}</p>
                <p className="text-xs text-gray-500">{field.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Selección</h3>
        <div className="space-y-2">
          {choiceFields.map((field) => (
            <button
              key={field.type}
              onClick={() => onSelect(field.type)}
              className="w-full flex items-center p-2 hover:bg-teal-50 rounded-md text-left transition-colors"
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-700 rounded mr-2">
                {field.icon}
              </span>
              <div>
                <p className="font-medium text-gray-800">{field.label}</p>
                <p className="text-xs text-gray-500">{field.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Avanzado</h3>
        <div className="space-y-2">
          {advancedFields.map((field) => (
            <button
              key={field.type}
              onClick={() => onSelect(field.type)}
              className="w-full flex items-center p-2 hover:bg-teal-50 rounded-md text-left transition-colors"
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded mr-2">
                {field.icon}
              </span>
              <div>
                <p className="font-medium text-gray-800">{field.label}</p>
                <p className="text-xs text-gray-500">{field.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormFieldPicker; 