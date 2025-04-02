import React, { useState } from 'react';
import { FormField } from '../../types';
import { 
  TrashIcon, 
  DocumentDuplicateIcon, 
  ChevronUpIcon, 
  ChevronDownIcon,
  PlusIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  ListBulletIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalculatorIcon,
  CalendarDaysIcon
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

type FieldType = 'text' | 'textarea' | 'select' | 'radio' | 'email' | 'tel' | 'number' | 'date';

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
    gradient: 'from-blue-500 to-cyan-300'
  },
  textarea: { 
    icon: ChatBubbleBottomCenterTextIcon, 
    label: 'Párrafo', 
    gradient: 'from-violet-500 to-purple-300'
  },
  select: { 
    icon: ListBulletIcon, 
    label: 'Lista', 
    gradient: 'from-fuchsia-500 to-pink-300'
  },
  radio: { 
    icon: CheckCircleIcon, 
    label: 'Opciones', 
    gradient: 'from-rose-500 to-red-300'
  },
  email: { 
    icon: EnvelopeIcon, 
    label: 'Email', 
    gradient: 'from-emerald-500 to-green-300'
  },
  tel: { 
    icon: PhoneIcon, 
    label: 'Teléfono', 
    gradient: 'from-orange-500 to-amber-300'
  },
  number: { 
    icon: CalculatorIcon, 
    label: 'Número', 
    gradient: 'from-red-500 to-orange-300'
  },
  date: { 
    icon: CalendarDaysIcon, 
    label: 'Fecha', 
    gradient: 'from-teal-500 to-cyan-300'
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
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => onChange({ label: e.target.value })}
                      className="w-full px-4 py-3 text-lg bg-transparent border-b-2 border-gray-200 
                        focus:border-current focus:outline-none transition-colors placeholder-gray-400"
                      placeholder="¿Qué quieres preguntar?"
                      style={{ borderImage: `linear-gradient(to right, ${fieldConfig.gradient}) 1` }}
                    />
                    
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700 text-left">
                        Descripción del campo
                      </label>
                      <input
                        type="text"
                        value={field.description || ''}
                        onChange={(e) => onChange({ description: e.target.value })}
                        className="w-full px-4 py-2 text-gray-500 bg-gray-50/50 rounded-xl
                          focus:outline-none focus:bg-gray-50/80 transition-colors"
                        placeholder="Explica qué debe ingresar el usuario..."
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700 text-left">
                        Texto de ayuda (placeholder)
                      </label>
                      <input
                        type="text"
                        value={field.placeholder || ''}
                        onChange={(e) => onChange({ placeholder: e.target.value })}
                        className="w-full px-4 py-2 text-gray-500 bg-gray-50/50 rounded-xl
                          focus:outline-none focus:bg-gray-50/80 transition-colors"
                        placeholder="Describa su situación"
                      />
                    </div>
                  </div>

                  {(field.type === 'select' || field.type === 'radio') && (
                    <div className="space-y-3 pt-2">
                      {field.options?.map((option, index) => (
                        <div key={index} className="group/option flex items-center gap-3 bg-gray-50/50 rounded-xl p-2">
                          <div className={`
                            w-7 h-7 rounded-full bg-gradient-to-br ${fieldConfig.gradient}
                            flex items-center justify-center shadow-sm
                          `}>
                            <span className="text-sm font-medium text-white">{index + 1}</span>
                          </div>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(field.options || [])];
                              newOptions[index] = e.target.value;
                              onChange({ options: newOptions });
                            }}
                            className="flex-1 px-3 py-2 bg-white/50 rounded-lg border-0
                              focus:outline-none focus:ring-1 ring-gray-200 text-gray-700"
                            placeholder={`Opción ${index + 1}`}
                          />
                          <div className="group/tooltip relative">
                            <button
                              onClick={() => {
                                const newOptions = field.options?.filter((_, i) => i !== index) || [];
                                onChange({ options: newOptions });
                              }}
                              className="opacity-0 group-hover/option:opacity-100 p-2 text-gray-400 
                                hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                              aria-label="Eliminar opción"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                              bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 
                              transition-opacity duration-150 whitespace-nowrap pointer-events-none">
                              Eliminar opción
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newOptions = [...(field.options || []), ''];
                          onChange({ options: newOptions });
                        }}
                        className={`
                          w-full flex items-center justify-center gap-2 px-4 py-2.5 
                          text-sm font-medium rounded-xl bg-gradient-to-r ${fieldConfig.gradient} 
                          text-white shadow-sm hover:shadow-md transition-all
                        `}
                      >
                        <PlusIcon className="h-5 w-5" />
                        Agregar opción
                      </button>
                    </div>
                  )}

                  <div className="flex items-start gap-3 pt-4">
                    <input
                      type="checkbox"
                      id={`required-${field.id}`}
                      checked={field.required}
                      onChange={(e) => onChange({ required: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label 
                      htmlFor={`required-${field.id}`}
                      className="text-sm text-gray-600"
                    >
                      Campo requerido
                    </label>
                  </div>
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
                      
                      {(field.type as FieldType) === 'tel' && (
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
                          className="p-2 text-gray-400 hover:text-gray-600 
                            hover:bg-gray-100 rounded-xl transition-colors"
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
                          className="p-2 text-gray-400 hover:text-gray-600 
                            hover:bg-gray-100 rounded-xl transition-colors"
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
                    className="p-2 text-gray-400 hover:text-gray-600 
                      hover:bg-gray-100 rounded-xl transition-colors"
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
                    className="p-2 text-gray-400 hover:text-red-500
                      hover:bg-red-50 rounded-xl transition-colors"
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