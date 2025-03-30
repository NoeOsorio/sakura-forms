import { useState } from 'react';
import Button from '../shared/Button';
import Card from '../shared/Card';
import FormFieldPicker from '../forms/FormFieldPicker';
import FormPreview from '../forms/FormPreview';

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

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
}

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Nuevo Formulario');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  
  // Add a new field
  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: getDefaultLabelForType(type),
      placeholder: '',
      required: false,
      options: type === 'radio' || type === 'select' || type === 'checkbox' ? ['Opción 1', 'Opción 2', 'Opción 3'] : undefined,
    };
    
    setFields([...fields, newField]);
    setActiveFieldId(newField.id);
  };
  
  // Get default label based on field type
  const getDefaultLabelForType = (type: FieldType): string => {
    switch (type) {
      case 'text': return 'Pregunta de texto';
      case 'email': return 'Correo electrónico';
      case 'phone': return 'Número de teléfono';
      case 'number': return 'Número';
      case 'checkbox': return 'Selección múltiple';
      case 'radio': return 'Selección única';
      case 'select': return 'Lista desplegable';
      case 'textarea': return 'Respuesta larga';
      case 'date': return 'Fecha';
      case 'scale': return 'Escala de valoración';
      case 'file': return 'Subir archivo';
      case 'signature': return 'Firma';
      default: return 'Nueva pregunta';
    }
  };
  
  // Update a field
  const updateField = (id: string, updatedField: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updatedField } : field
    ));
  };
  
  // Remove a field
  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    if (activeFieldId === id) {
      setActiveFieldId(null);
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left sidebar - field picker */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <Card className="sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Añadir Campos</h2>
          <FormFieldPicker onSelect={addField} />
        </Card>
      </div>
      
      {/* Middle - form editor */}
      <div className="flex-grow">
        <Card>
          <div className="mb-6">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full text-2xl font-bold border-b border-gray-200 pb-2 focus:outline-none focus:border-teal-500"
              placeholder="Título del formulario"
            />
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full mt-2 text-gray-600 focus:outline-none resize-none"
              placeholder="Descripción (opcional)"
              rows={2}
            />
          </div>
          
          <div className="space-y-4">
            {fields.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">Tu formulario está vacío</p>
                <p className="text-gray-400 mb-6">Añade campos desde el panel izquierdo</p>
                <Button onClick={() => addField('text')}>Añadir primer campo</Button>
              </div>
            ) : (
              fields.map((field, index) => (
                <div 
                  key={field.id}
                  className={`p-4 rounded-lg border ${activeFieldId === field.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setActiveFieldId(field.id)}
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-400">{index + 1}.</span>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className={`font-medium focus:outline-none ${activeFieldId === field.id ? 'bg-teal-50' : 'bg-transparent'}`}
                        placeholder="Etiqueta del campo"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => removeField(field.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        🗑️
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 cursor-move">
                        ⋮⋮
                      </button>
                    </div>
                  </div>
                  
                  {activeFieldId === field.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Texto de ayuda
                          </label>
                          <input
                            type="text"
                            value={field.description || ''}
                            onChange={(e) => updateField(field.id, { description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            placeholder="Texto de ayuda (opcional)"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Placeholder
                          </label>
                          <input
                            type="text"
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            placeholder="Texto de ejemplo"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Campo requerido</span>
                        </label>
                      </div>
                      
                      {(field.type === 'radio' || field.type === 'select' || field.type === 'checkbox') && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Opciones
                          </label>
                          {field.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center mb-2">
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(field.options || [])];
                                  newOptions[optionIndex] = e.target.value;
                                  updateField(field.id, { options: newOptions });
                                }}
                                className="flex-grow px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                              />
                              <button
                                onClick={() => {
                                  const newOptions = [...(field.options || [])];
                                  newOptions.splice(optionIndex, 1);
                                  updateField(field.id, { options: newOptions });
                                }}
                                className="ml-2 text-gray-400 hover:text-red-500"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newOptions = [...(field.options || []), `Opción ${(field.options?.length || 0) + 1}`];
                              updateField(field.id, { options: newOptions });
                            }}
                            className="text-sm text-teal-600 hover:text-teal-800"
                          >
                            + Añadir opción
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline">Cancelar</Button>
            <Button>Guardar Formulario</Button>
          </div>
        </Card>
      </div>
      
      {/* Right sidebar - live preview */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <Card className="sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Vista Previa</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-hidden">
            <FormPreview 
              title={formTitle}
              description={formDescription}
              fields={fields}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FormBuilder; 