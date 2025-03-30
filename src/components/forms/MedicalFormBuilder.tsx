import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField, FieldType } from '../../types';
import FormFieldCard from './FormFieldCard';
import MedicalFormPreview from './MedicalFormPreview';
import Button from '../shared/Button';

const MedicalFormBuilder = () => {
  // Estados para manejar el formulario
  const [title, setTitle] = useState('Formulario médico');
  const [description, setDescription] = useState('Por favor complete la siguiente información');
  const [fields, setFields] = useState<FormField[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const navigate = useNavigate();
  
  // Obtener el campo actual
  const currentField = currentFieldIndex !== null ? fields[currentFieldIndex] : null;
  
  // Añadir nuevo campo
  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Date.now(),
      type,
      label: getDefaultLabelForType(type),
      placeholder: 'Escriba aquí...',
      required: false,
      options: type === 'select' || type === 'radio' ? ['Opción 1', 'Opción 2'] : [],
    };
    
    const newFields = [...fields, newField];
    setFields(newFields);
    setCurrentFieldIndex(newFields.length - 1);
  };
  
  // Obtener etiqueta predeterminada basada en el tipo de campo
  const getDefaultLabelForType = (type: FieldType): string => {
    switch (type) {
      case 'text': return 'Nombre completo';
      case 'email': return 'Correo electrónico';
      case 'phone': return 'Teléfono de contacto';
      case 'number': return 'Edad';
      case 'textarea': return 'Describa sus síntomas';
      case 'select': return 'Seleccione una opción';
      case 'radio': return '¿Ha tenido esta condición anteriormente?';
      case 'date': return 'Fecha de nacimiento';
      default: return 'Nueva pregunta';
    }
  };
  
  // Eliminar un campo
  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
    
    if (currentFieldIndex === index) {
      setCurrentFieldIndex(newFields.length > 0 ? 0 : null);
    } else if (currentFieldIndex !== null && index < currentFieldIndex) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };
  
  // Actualizar un campo
  const updateField = (index: number, updatedField: Partial<FormField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...updatedField };
    setFields(newFields);
  };
  
  // Reordenar campos
  const moveField = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= fields.length) return;
    
    const newFields = [...fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    
    setFields(newFields);
    setCurrentFieldIndex(toIndex);
  };
  
  // Duplicar campo
  const duplicateField = (index: number) => {
    const fieldToDuplicate = fields[index];
    const duplicatedField = {
      ...fieldToDuplicate,
      id: Date.now(),
      label: `${fieldToDuplicate.label} (copia)`,
    };
    
    const newFields = [...fields];
    newFields.splice(index + 1, 0, duplicatedField);
    setFields(newFields);
    setCurrentFieldIndex(index + 1);
  };
  
  // Guardar formulario
  const saveForm = () => {
    console.log('Formulario guardado:', { title, description, fields });
    navigate('/forms');
  };
  
  // Alternar vista previa
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };
  
  // Si estamos en modo vista previa, mostrar el componente de vista previa
  if (isPreview) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="py-4 px-6 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{title || 'Formulario médico'}</h1>
            <p className="text-sm text-gray-500">Vista previa</p>
          </div>
          <Button 
            variant="outline" 
            onClick={togglePreview}
          >
            Volver al editor
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto py-6 px-4">
          <MedicalFormPreview
            title={title}
            description={description}
            fields={fields}
            onComplete={togglePreview}
            onBack={togglePreview}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Cabecera */}
      <div className="py-4 px-6 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{title || 'Formulario médico'}</h1>
          <p className="text-sm text-gray-500">Editor de formularios médicos</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/forms')}
          >
            Cancelar
          </Button>
          <Button 
            variant="outline" 
            onClick={togglePreview}
            disabled={fields.length === 0}
          >
            Vista previa
          </Button>
          <Button 
            variant="primary" 
            onClick={saveForm}
          >
            Guardar
          </Button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 overflow-auto py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Título y descripción del formulario */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="p-6 border-l-4 border-blue-500">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-medium mb-2 border-0 border-b border-gray-200 pb-1 focus:ring-0 focus:border-blue-500"
                placeholder="Título del formulario"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-gray-600 border-0 focus:ring-0 resize-none"
                placeholder="Descripción del formulario"
                rows={2}
              />
            </div>
          </div>
          
          {/* Lista de campos */}
          {fields.length > 0 ? (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <FormFieldCard
                  key={field.id}
                  field={field}
                  isActive={currentFieldIndex === index}
                  onSelect={() => setCurrentFieldIndex(index)}
                  onChange={(updatedField: Partial<FormField>) => updateField(index, updatedField)}
                  onRemove={() => removeField(index)}
                  onDuplicate={() => duplicateField(index)}
                  canMoveUp={index > 0}
                  canMoveDown={index < fields.length - 1}
                  onMoveUp={() => moveField(index, index - 1)}
                  onMoveDown={() => moveField(index, index + 1)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No hay campos en el formulario</h3>
              <p className="text-gray-500 mb-4">Añade un nuevo campo para comenzar</p>
            </div>
          )}
          
          {/* Añadir nuevo campo */}
          <div className="my-6">
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => addField('text')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">Aa</div>
                <div className="text-sm font-medium text-gray-700">Texto corto</div>
              </button>
              
              <button
                type="button"
                onClick={() => addField('textarea')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">¶</div>
                <div className="text-sm font-medium text-gray-700">Texto largo</div>
              </button>
              
              <button
                type="button"
                onClick={() => addField('radio')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">○</div>
                <div className="text-sm font-medium text-gray-700">Opción única</div>
              </button>
              
              <button
                type="button"
                onClick={() => addField('select')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">▼</div>
                <div className="text-sm font-medium text-gray-700">Desplegable</div>
              </button>
              
              <button
                type="button"
                onClick={() => addField('date')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">📅</div>
                <div className="text-sm font-medium text-gray-700">Fecha</div>
              </button>
              
              <button
                type="button"
                onClick={() => addField('email')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">@</div>
                <div className="text-sm font-medium text-gray-700">Email</div>
              </button>
              
              <button
                type="button"
                onClick={() => addField('phone')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">📞</div>
                <div className="text-sm font-medium text-gray-700">Teléfono</div>
              </button>
              
              <button
                type="button"
                onClick={() => addField('number')}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="text-blue-500 text-center mb-1">#</div>
                <div className="text-sm font-medium text-gray-700">Número</div>
              </button>
            </div>
          </div>
          
          {/* Mensaje de guardar */}
          {fields.length > 0 && (
            <div className="mt-4 text-center">
              <Button 
                variant="primary" 
                onClick={saveForm}
                className="px-8"
              >
                Guardar formulario
              </Button>
              <p className="text-sm text-gray-500 mt-2">No olvides guardar los cambios</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalFormBuilder; 