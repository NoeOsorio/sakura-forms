import React, { useState } from 'react';
import { FieldType, FormField } from '../../types/form';
import { 
  TrashIcon, 
  DocumentDuplicateIcon, 
  ChevronUpIcon, 
  ChevronDownIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  ListBulletIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface FormFieldCardProps {
  field: FormField;
  isActive: boolean;
  onSelect: () => void;
  onChange: (updatedField: Partial<FormField>) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  className?: string;
}

type IconComponent = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

type FieldConfig = {
  [K in FieldType]: {
    icon: IconComponent;
    label: string;
    gradient: string;
  }
};

const fieldTypes: FieldConfig = {
  text: {
    icon: DocumentTextIcon,
    label: 'Texto',
    gradient: 'from-blue-500 to-blue-600'
  },
  textarea: {
    icon: ChatBubbleBottomCenterTextIcon,
    label: 'Área de texto',
    gradient: 'from-green-500 to-green-600'
  },
  email: {
    icon: EnvelopeIcon,
    label: 'Email',
    gradient: 'from-purple-500 to-purple-600'
  },
  phone: {
    icon: PhoneIcon,
    label: 'Teléfono',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  number: {
    icon: CalculatorIcon,
    label: 'Número',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  date: {
    icon: CalendarDaysIcon,
    label: 'Fecha',
    gradient: 'from-red-500 to-red-600'
  },
  time: {
    icon: CalendarDaysIcon,
    label: 'Hora',
    gradient: 'from-orange-500 to-orange-600'
  },
  datetime: {
    icon: CalendarDaysIcon,
    label: 'Fecha y hora',
    gradient: 'from-pink-500 to-pink-600'
  },
  select: {
    icon: ListBulletIcon,
    label: 'Selección',
    gradient: 'from-teal-500 to-teal-600'
  },
  radio: {
    icon: CheckCircleIcon,
    label: 'Radio',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  checkbox: {
    icon: CheckCircleIcon,
    label: 'Checkbox',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  scale: {
    icon: InformationCircleIcon,
    label: 'Escala',
    gradient: 'from-amber-500 to-amber-600'
  },
  file: {
    icon: DocumentTextIcon,
    label: 'Archivo',
    gradient: 'from-gray-500 to-gray-600'
  },
  signature: {
    icon: DocumentTextIcon,
    label: 'Firma',
    gradient: 'from-slate-500 to-slate-600'
  }
};

const FormFieldCard: React.FC<FormFieldCardProps> = ({
  field,
  isActive,
  onSelect,
  onChange,
  onRemove,
  onDuplicate,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  className = ''
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const fieldConfig = fieldTypes[field.type as FieldType] || fieldTypes.text;
  const IconComponent = fieldConfig.icon;

  const renderFieldProperties = () => {
    const commonProperties = (
      <>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 text-left">
            Pregunta
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onChange({ label: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="¿Cuál es tu pregunta?"
          />
        </div>

        {field.type !== 'checkbox' && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 text-left">
              Descripción (opcional)
            </label>
            <textarea
              value={field.description || ''}
              onChange={(e) => onChange({ description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Añade un texto de ayuda"
              rows={2}
            />
          </div>
        )}

        {!['checkbox', 'radio', 'select', 'file', 'signature'].includes(field.type) && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 text-left">
              Placeholder
            </label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => onChange({ placeholder: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Texto de ejemplo"
            />
          </div>
        )}
      </>
    );

    const renderSpecificProperties = () => {
      switch (field.type) {
        case 'radio':
        case 'select':
          return (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 text-left flex items-center justify-between">
                <span>Opciones</span>
                <button
                  type="button"
                  onClick={() => onChange({ options: [...(field.options || []), ''] })}
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  Agregar opción
                </button>
              </label>
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])];
                        newOptions[index] = e.target.value;
                        onChange({ options: newOptions });
                      }}
                      placeholder={`Opción ${index + 1}`}
                      className="flex-1 p-2 border border-gray-200 rounded-lg bg-white/50"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = [...(field.options || [])];
                        newOptions.splice(index, 1);
                        onChange({ options: newOptions });
                      }}
                      className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'scale':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 text-left">
                    Valor mínimo
                  </label>
                  <input
                    type="number"
                    value={field.minValue || 1}
                    onChange={(e) => onChange({ minValue: parseInt(e.target.value) })}
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 text-left">
                    Valor máximo
                  </label>
                  <input
                    type="number"
                    value={field.maxValue || 10}
                    onChange={(e) => onChange({ maxValue: parseInt(e.target.value) })}
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white/50"
                  />
                </div>
              </div>
            </div>
          );

        case 'file':
          return (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 text-left">
                Tipos de archivo permitidos
              </label>
              <div className="flex flex-wrap gap-2">
                {['image/*', 'application/pdf', '.doc,.docx', '.xls,.xlsx'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      const currentTypes = field.allowedTypes || [];
                      const newTypes = currentTypes.includes(type)
                        ? currentTypes.filter(t => t !== type)
                        : [...currentTypes, type];
                      onChange({ allowedTypes: newTypes });
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      (field.allowedTypes || []).includes(type)
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {type === 'image/*' ? 'Imágenes'
                      : type === 'application/pdf' ? 'PDF'
                      : type === '.doc,.docx' ? 'Word'
                      : 'Excel'}
                  </button>
                ))}
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="space-y-4">
        {commonProperties}
        {renderSpecificProperties()}
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={field.required || false}
            onChange={(e) => onChange({ required: e.target.checked })}
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label
            htmlFor={`required-${field.id}`}
            className="ml-2 block text-sm text-gray-700"
          >
            Campo requerido
          </label>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`relative bg-white ${className}`}
      onClick={onSelect}
    >
      <div className={`
        absolute inset-0 bg-gradient-to-r ${fieldConfig.gradient} opacity-[0.08]
        ${isActive ? 'opacity-[0.15]' : 'group-hover:opacity-[0.12]'}
      `} />

      <div className="relative">
        {/* Barra lateral con icono */}
        <div className={`
          absolute left-0 top-0 bottom-0 w-1.5
          bg-gradient-to-b ${fieldConfig.gradient}
        `} />

        <div className="pl-6 pr-4 py-6">
          <div className="flex items-start gap-6">
            {/* Icono y tipo */}
            <div className={`
              flex-none w-12 h-12 rounded-2xl bg-gradient-to-br ${fieldConfig.gradient}
              flex items-center justify-center transform transition-transform
              ${isActive ? 'scale-110' : 'group-hover:scale-105'}
            `}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>

            {/* Contenido principal */}
            <div className="flex-1 min-w-0 space-y-6">
              {isActive ? (
                <>
                  {renderFieldProperties()}
                </>
              ) : (
                <>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-medium text-left">
                        {field.label || '¿Qué quieres preguntar?'}
                      </div>
                      <span className="text-sm px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {fieldConfig.label}
                      </span>
                      {field.required && (
                        <span className="text-sm px-2 py-0.5 bg-red-50 text-red-600 rounded-full">
                          Requerido
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-1.5 text-sm">
                      <div className="text-gray-600">
                        <span className="font-medium">Tipo de campo:</span> {fieldConfig.label}
                        {(field.type === 'select' || field.type === 'radio') && field.options && (
                          <span className="ml-2 text-gray-500">
                            ({field.options.length} opciones)
                          </span>
                        )}
                      </div>
                      
                      {field.description ? (
                        <div className="text-gray-600">
                          <span className="font-medium">Descripción:</span> {field.description}
                        </div>
                      ) : (
                        <div className="text-gray-400 italic">
                          Agrega una descripción para ayudar al usuario...
                        </div>
                      )}
                      
                      {field.placeholder && (
                        <div className="text-gray-500">
                          <span className="font-medium">Ejemplo:</span> {field.placeholder}
                        </div>
                      )}
                      
                      {field.type === 'email' && (
                        <div className="text-gray-500">
                          <span className="font-medium">Formato:</span> ejemplo@dominio.com
                        </div>
                      )}
                      
                      {(field.type as FieldType) === 'phone' && (
                        <div className="text-gray-500">
                          <span className="font-medium">Formato:</span> +1234567890
                        </div>
                      )}
                      
                      {field.type === 'date' && (
                        <div className="text-gray-500">
                          <span className="font-medium">Formato:</span> DD/MM/AAAA
                        </div>
                      )}
                    </div>
                  </div>

                  {(field.type === 'select' || field.type === 'radio') && 
                   field.options && field.options.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="text-sm font-medium text-gray-700">
                        Opciones disponibles:
                      </div>
                      {field.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3 pl-2 py-1.5 bg-gray-50/50 rounded-lg">
                          <span className={`
                            w-5 h-5 rounded-full bg-gradient-to-br ${fieldConfig.gradient}
                            flex items-center justify-center text-xs font-medium text-white
                          `}>
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{option}</span>
                        </div>
                      ))}
                      {field.options.length < 2 && (
                        <div className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                          Se recomienda agregar al menos 2 opciones para este tipo de campo.
                        </div>
                      )}
                    </div>
                  )}

                  {(field.type === 'select' || field.type === 'radio') && 
                   (!field.options || field.options.length === 0) && (
                    <div className="mt-4 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                      Este campo requiere opciones. Haz clic para agregarlas.
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Acciones */}
            <div className="flex-none">
              <div className={`
                flex flex-col gap-2 p-1 rounded-2xl bg-gray-50/80
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                transition-opacity duration-200
              `}>
                {isActive && (
                  <>
                    {canMoveUp && (
                      <div className="group/tooltip relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveUp();
                          }}
                          className="p-2 text-gray-500 hover:text-gray-700"
                          aria-label="Mover campo hacia arriba"
                        >
                          <ChevronUpIcon className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                          bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 
                          transition-opacity duration-150 whitespace-nowrap pointer-events-none">
                          Mover hacia arriba
                        </div>
                      </div>
                    )}
                    {canMoveDown && (
                      <div className="group/tooltip relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveDown();
                          }}
                          className="p-2 text-gray-500 hover:text-gray-700"
                          aria-label="Mover campo hacia abajo"
                        >
                          <ChevronDownIcon className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                          bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 
                          transition-opacity duration-150 whitespace-nowrap pointer-events-none">
                          Mover hacia abajo
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div className="group/tooltip relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate();
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    aria-label="Duplicar campo"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                    bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 
                    transition-opacity duration-150 whitespace-nowrap pointer-events-none">
                    Duplicar campo
                  </div>
                </div>
                <div className="group/tooltip relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                    aria-label="Eliminar campo"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                    bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 
                    transition-opacity duration-150 whitespace-nowrap pointer-events-none">
                    Eliminar campo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú contextual */}
      {showMenu && !isActive && (
        <div className="absolute right-4 top-full mt-2 w-48 
          overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 z-10"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
              setShowMenu(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 
              flex items-start gap-3 text-gray-700"
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
            <span>Duplicar campo</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
              setShowMenu(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-red-50 
              flex items-start gap-3 text-red-600"
          >
            <TrashIcon className="h-5 w-5" />
            <span>Eliminar campo</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FormFieldCard; 