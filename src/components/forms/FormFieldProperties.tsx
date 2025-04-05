import { useState } from 'react';
import { FormField } from '../../types/form';
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

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={field.description || ''}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 neomorphic-inset"
            rows={3}
          />
        </div>

        {/* Requerido */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={field.required}
            onChange={(e) => onChange({ required: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
            Campo requerido
          </label>
        </div>

        {/* Opciones para campos de selección */}
        {(field.type === 'select' || field.type === 'radio') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Opciones
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOptionsEditor(!showOptionsEditor)}
              >
                {showOptionsEditor ? 'Ocultar' : 'Editar'}
              </Button>
            </div>

            {showOptionsEditor && (
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...field.options];
                        newOptions[index] = e.target.value;
                        onChange({ options: newOptions });
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 neomorphic-inset"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                    placeholder="Nueva opción..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 neomorphic-inset"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddOption}
                  >
                    Agregar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botón de eliminar */}
        <div className="pt-4">
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