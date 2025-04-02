import { FieldType } from '../../types';

interface FieldTypeOption {
  type: FieldType;
  icon: string;
  label: string;
  description: string;
}

interface FieldTypePickerProps {
  onSelect: (type: FieldType) => void;
}

const fieldTypes: FieldTypeOption[] = [
  { 
    type: 'text', 
    icon: 'Aa', 
    label: 'Texto corto', 
    description: 'Para respuestas breves como nombre, ciudad, etc.' 
  },
  { 
    type: 'textarea', 
    icon: '¶', 
    label: 'Texto largo', 
    description: 'Para respuestas extensas como comentarios o descripciones.' 
  },
  { 
    type: 'email', 
    icon: '@', 
    label: 'Email', 
    description: 'Campo con validación específica para correos electrónicos.' 
  },
  { 
    type: 'phone', 
    icon: '📞', 
    label: 'Teléfono', 
    description: 'Para números de teléfono con formato específico.' 
  },
  { 
    type: 'number', 
    icon: '#', 
    label: 'Número', 
    description: 'Para valores numéricos como edad, cantidad, etc.' 
  },
  { 
    type: 'date', 
    icon: '📅', 
    label: 'Fecha', 
    description: 'Para seleccionar fechas como cumpleaños o citas.' 
  },
  { 
    type: 'select', 
    icon: '▼', 
    label: 'Desplegable', 
    description: 'Lista desplegable para seleccionar una opción.' 
  },
  { 
    type: 'radio', 
    icon: '○', 
    label: 'Opción única', 
    description: 'Botones de radio para seleccionar una sola opción.' 
  },
];

const FieldTypePicker = ({ onSelect }: FieldTypePickerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fieldTypes.map((fieldType) => (
        <div 
          key={fieldType.type}
          onClick={() => onSelect(fieldType.type)}
          className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md cursor-pointer transition-all"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mr-4">
            {fieldType.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-md font-medium text-gray-800">{fieldType.label}</h3>
            <p className="text-sm text-gray-500">{fieldType.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FieldTypePicker; 