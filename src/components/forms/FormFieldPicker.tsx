import { 
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  CheckIcon,
  ListBulletIcon,
  ChevronDownIcon,
  StarIcon,
  PaperClipIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

import { FieldType } from '../../types';

interface FieldOption {
  type: FieldType;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  color: string;
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
      icon: DocumentTextIcon, 
      description: 'Campo de texto corto',
      color: 'text-blue-600 bg-blue-50'
    },
    { 
      type: 'textarea', 
      label: 'Texto largo', 
      icon: ChatBubbleBottomCenterTextIcon, 
      description: 'Respuesta en párrafos',
      color: 'text-purple-600 bg-purple-50'
    },
    { 
      type: 'email', 
      label: 'Email', 
      icon: EnvelopeIcon, 
      description: 'Correo electrónico',
      color: 'text-green-600 bg-green-50'
    },
    { 
      type: 'phone', 
      label: 'Teléfono', 
      icon: PhoneIcon, 
      description: 'Número telefónico',
      color: 'text-orange-600 bg-orange-50'
    },
    { 
      type: 'number', 
      label: 'Número', 
      icon: CalculatorIcon, 
      description: 'Valor numérico',
      color: 'text-red-600 bg-red-50'
    },
    { 
      type: 'date', 
      label: 'Fecha', 
      icon: CalendarDaysIcon, 
      description: 'Selector de fecha',
      color: 'text-teal-600 bg-teal-50'
    },
    { 
      type: 'checkbox', 
      label: 'Casillas', 
      icon: CheckIcon, 
      description: 'Selección múltiple',
      color: 'text-indigo-600 bg-indigo-50'
    },
    { 
      type: 'radio', 
      label: 'Opción única', 
      icon: ListBulletIcon, 
      description: 'Selección única',
      color: 'text-rose-600 bg-rose-50'
    },
    { 
      type: 'select', 
      label: 'Desplegable', 
      icon: ChevronDownIcon, 
      description: 'Lista de opciones',
      color: 'text-fuchsia-600 bg-fuchsia-50'
    },
    { 
      type: 'scale', 
      label: 'Escala', 
      icon: StarIcon, 
      description: 'Valoración 1-10',
      color: 'text-amber-600 bg-amber-50'
    },
    { 
      type: 'file', 
      label: 'Archivo', 
      icon: PaperClipIcon, 
      description: 'Subir documentos',
      color: 'text-cyan-600 bg-cyan-50'
    },
    { 
      type: 'signature', 
      label: 'Firma', 
      icon: PencilIcon, 
      description: 'Firma digital',
      color: 'text-emerald-600 bg-emerald-50'
    },
  ];

  // Group field options by category
  const basicFields = fieldOptions.filter(f => 
    ['text', 'textarea', 'email', 'phone', 'number'].includes(f.type));
  
  const choiceFields = fieldOptions.filter(f => 
    ['checkbox', 'radio', 'select'].includes(f.type));
  
  const advancedFields = fieldOptions.filter(f => 
    ['date', 'scale', 'file', 'signature'].includes(f.type));

  const renderField = (field: FieldOption) => (
    <button
      key={field.type}
      onClick={() => onSelect(field.type)}
      className="flex items-center p-3 hover:bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
    >
      <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg mr-3 ${field.color}`}>
        <field.icon className="w-5 h-5" />
      </span>
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-800">{field.label}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{field.description}</p>
      </div>
    </button>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Campos básicos</h3>
        <div className="grid grid-cols-2 gap-3">
          {basicFields.map(renderField)}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Selección</h3>
        <div className="grid grid-cols-2 gap-3">
          {choiceFields.map(renderField)}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Avanzado</h3>
        <div className="grid grid-cols-2 gap-3">
          {advancedFields.map(renderField)}
        </div>
      </div>
    </div>
  );
};

export default FormFieldPicker; 