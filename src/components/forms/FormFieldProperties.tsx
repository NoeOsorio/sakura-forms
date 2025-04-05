import { useState } from 'react';
import { FormField } from '../../types';
import Button from '../shared/Button';
import Card from '../shared/Card';

interface FormFieldPropertiesProps {
  field: FormField;
  onChange: (updatedField: Partial<FormField>) => void;
  removeField: () => void;
}

const FormFieldProperties = ({ field, onChange, removeField }: FormFieldPropertiesProps) => {
  const [showOptionsEditor, setShowOptionsEditor] = useState(false);
  const [newOption, setNewOption] = useState('');

  // Manejar cambio en el campo de opciones
  const handleAddOption = () => {
    if (!newOption.trim()) return;
    
    const newOptions = [...(field.options || []), newOption.trim()];
    onChange({ options: newOptions });
    setNewOption('');
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...(field.options || [])];
    newOptions.splice(index, 1);
    onChange({ options: newOptions });
  };

  return (
    <Card variant="glass" className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-gradient">Propiedades del campo</h2>
      
      <div className="space-y-4">
        {/* Etiqueta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Etiqueta
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onChange({ label: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 neomorphic-inset"
          />
        </div>
        
        {/* Placeholder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Placeholder
          </label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={(e) => onChange({ placeholder: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 neomorphic-inset"
          />
        </div>
        
        {/* Requerido */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={field.required || false}
            onChange={(e) => onChange({ required: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
            Campo obligatorio
          </label>
        </div>
        
        {/* Opciones para select o radio */}
        {(field.type === 'select' || field.type === 'radio') && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Opciones
              </label>
              <button
                type="button"
                onClick={() => setShowOptionsEditor(!showOptionsEditor)}
                className="text-xs text-indigo-600 hover:text-indigo-700"
              >
                {showOptionsEditor ? 'Ocultar editor' : 'Mostrar editor'}
              </button>
            </div>
            
            {showOptionsEditor && (
              <div className="border border-gray-200 rounded-lg p-3 bg-white mb-2">
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Nueva opción..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newOption.trim()) {
                        onChange({
                          ...field,
                          options: [...(field.options || []), newOption.trim()]
                        });
                        setNewOption('');
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleAddOption}
                    className="whitespace-nowrap"
                  >
                    Añadir
                  </Button>
                </div>
                
                <div className="max-h-40 overflow-y-auto custom-scrollbar">
                  {field.options?.map((option, index) => (
                    <div key={index} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                      <span className="text-sm">{option}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              {field.options?.length || 0} opciones definidas
            </div>
          </div>
        )}
        
        {/* Botón para eliminar el campo */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="danger"
            onClick={removeField}
            className="w-full"
          >
            Eliminar campo
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormFieldProperties; 