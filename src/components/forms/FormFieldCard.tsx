import React, { useState } from 'react';
import { FormField } from '../../types';
import FormInput from './FormInput';

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
}

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
  onMoveDown
}) => {
  const [showFieldMenu, setShowFieldMenu] = useState(false);
  
  // Renderizar las opciones para campos select/radio
  const renderOptions = () => {
    if (field.type !== 'select' && field.type !== 'radio') return null;
    
    return (
      <div className="mt-2">
        {field.options?.map((option, index) => (
          <div key={index} className="text-sm text-gray-500 ml-6">
            {field.type === 'radio' ? '○' : '•'} {option}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div 
      className={`border rounded-lg overflow-hidden transition-all ${
        isActive 
          ? 'border-blue-500 shadow-md' 
          : 'border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
      onClick={onSelect}
    >
      <div className={`p-4 ${isActive ? 'bg-white' : 'bg-white'}`}>
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            {isActive ? (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pregunta
                </label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => onChange({ label: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texto de ayuda (opcional)
                  </label>
                  <input
                    type="text"
                    value={field.placeholder || ''}
                    onChange={(e) => onChange({ placeholder: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Añade un texto de ayuda..."
                  />
                </div>
                
                {(field.type === 'select' || field.type === 'radio') && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opciones
                    </label>
                    <div className="space-y-2">
                      {field.options?.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(field.options || [])];
                              newOptions[index] = e.target.value;
                              onChange({ options: newOptions });
                            }}
                            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newOptions = [...(field.options || [])];
                              newOptions.splice(index, 1);
                              onChange({ options: newOptions });
                            }}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newOptions = [...(field.options || []), `Opción ${(field.options?.length || 0) + 1}`];
                          onChange({ options: newOptions });
                        }}
                        className="text-blue-500 text-sm flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Añadir opción
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex items-center">
                  <input
                    type="checkbox"
                    id={`required-${field.id}`}
                    checked={field.required || false}
                    onChange={(e) => onChange({ required: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`required-${field.id}`} className="ml-2 block text-sm text-gray-700">
                    Campo obligatorio
                  </label>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-1">
                  <div className="mr-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">
                    {field.type}
                  </div>
                  <h3 className="font-medium text-gray-800">{field.label}</h3>
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </div>
                {field.placeholder && (
                  <p className="text-sm text-gray-500">{field.placeholder}</p>
                )}
                {renderOptions()}
              </>
            )}
          </div>
          
          <div className="flex items-center ml-2">
            {isActive && (
              <div className="flex space-x-1">
                {canMoveUp && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveUp();
                    }}
                    className="p-1 text-gray-400 hover:text-blue-500"
                    title="Mover arriba"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                )}
                
                {canMoveDown && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveDown();
                    }}
                    className="p-1 text-gray-400 hover:text-blue-500"
                    title="Mover abajo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                  }}
                  className="p-1 text-gray-400 hover:text-blue-500"
                  title="Duplicar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
            
            {!isActive && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFieldMenu(!showFieldMenu);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            )}
            
            {showFieldMenu && !isActive && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate();
                      setShowFieldMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Duplicar
                  </button>
                  {canMoveUp && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveUp();
                        setShowFieldMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Mover arriba
                    </button>
                  )}
                  {canMoveDown && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveDown();
                        setShowFieldMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Mover abajo
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                      setShowFieldMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {!isActive && (
        <div className="bg-gray-50 border-t border-gray-200 p-3">
          <FormInput
            field={field}
            value=""
            onChange={() => {}}
            error=""
            disabled
          />
        </div>
      )}
    </div>
  );
};

export default FormFieldCard; 