import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Modal from '../shared/Modal';
import FormInput from './FormInput';
import FormFieldProperties from './FormFieldProperties';
import { FormField, FieldType } from '../../types';
import { validateField } from '../../validation/ValidationHelper';

const FormBuilder = () => {
  // Estados para manejar el formulario
  const [title, setTitle] = useState('Mi Formulario');
  const [description, setDescription] = useState('Descripción de mi formulario');
  const [fields, setFields] = useState<FormField[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number | null>(null);
  const [step, setStep] = useState<'fields' | 'preview' | 'thankyou'>('fields');
  const [previewCurrentIndex, setPreviewCurrentIndex] = useState(0);
  const [fieldValues, setFieldValues] = useState<Record<number, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<number, string>>({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  const navigate = useNavigate();
  
  // Obtener el campo actual
  const currentField = currentFieldIndex !== null ? fields[currentFieldIndex] : null;
  
  // Manejar la adición de nuevos campos
  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Date.now(),
      type,
      label: getDefaultLabelForType(type),
      placeholder: 'Escriba aquí...',
      required: false,
      options: type === 'select' || type === 'radio' ? ['Opción 1', 'Opción 2'] : [],
    };
    
    setFields([...fields, newField]);
    setCurrentFieldIndex(fields.length);
    setAddModalOpen(false);
  };
  
  // Obtener etiqueta predeterminada basada en el tipo de campo
  const getDefaultLabelForType = (type: FieldType): string => {
    switch (type) {
      case 'text': return 'Pregunta de texto';
      case 'email': return 'Correo electrónico';
      case 'phone': return 'Número de teléfono';
      case 'number': return 'Número';
      case 'select': return 'Lista desplegable';
      case 'radio': return 'Selección única';
      case 'textarea': return 'Respuesta larga';
      case 'date': return 'Fecha';
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
  
  // Manejar cambio de valores en el modo vista previa
  const handleFieldValueChange = (id: number, value: string) => {
    setFieldValues({ ...fieldValues, [id]: value });
    
    // Actualizar errores
    const field = fields.find(f => f.id === id);
    if (field) {
      const error = validateField(field, value);
      if (error) {
        setFieldErrors({ ...fieldErrors, [id]: error });
      } else {
        const newErrors = { ...fieldErrors };
        delete newErrors[id];
        setFieldErrors(newErrors);
      }
    }
  };
  
  // Navegar al paso siguiente en modo vista previa
  const goToNextStep = () => {
    const currentField = fields[previewCurrentIndex];
    
    // Validar si el campo actual es requerido y está vacío
    if (currentField) {
      const value = fieldValues[currentField.id] || '';
      const error = validateField(currentField, value);
      
      if (error) {
        setFieldErrors({ ...fieldErrors, [currentField.id]: error });
        return;
      }
    }
    
    if (previewCurrentIndex < fields.length - 1) {
      setPreviewCurrentIndex(previewCurrentIndex + 1);
    } else {
      setStep('thankyou');
    }
  };
  
  // Navegar al paso anterior en modo vista previa
  const goToPreviousStep = () => {
    if (previewCurrentIndex > 0) {
      setPreviewCurrentIndex(previewCurrentIndex - 1);
    }
  };
  
  // Guardar formulario
  const saveForm = () => {
    // Aquí implementarías la lógica para guardar el formulario
    console.log('Formulario guardado:', { title, description, fields });
    navigate('/forms');
  };

  // Renderizar selector de tipo de campo
  const renderFieldTypePicker = () => {
    const fieldTypes: FieldType[] = ['text', 'email', 'number', 'phone', 'textarea', 'select', 'radio', 'date'];
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {fieldTypes.map((type) => (
          <div 
            key={type}
            onClick={() => addField(type)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 mr-3">
                {getFieldTypeIcon(type)}
              </div>
              <h3 className="font-medium text-gray-800 capitalize">{type}</h3>
            </div>
            <p className="text-sm text-gray-500">{getFieldTypeDescription(type)}</p>
          </div>
        ))}
      </div>
    );
  };
  
  // Obtener icono para tipo de campo
  const getFieldTypeIcon = (type: FieldType): React.ReactNode => {
    switch (type) {
      case 'text':
        return <span className="text-lg">Aa</span>;
      case 'email':
        return <span className="text-lg">@</span>;
      case 'number':
        return <span className="text-lg">#</span>;
      case 'phone':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'textarea':
        return <span className="text-lg">¶</span>;
      case 'select':
        return <span className="text-lg">▼</span>;
      case 'radio':
        return <span className="text-lg">◉</span>;
      case 'date':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return <span className="text-lg">?</span>;
    }
  };
  
  // Obtener descripción para tipo de campo
  const getFieldTypeDescription = (type: FieldType): string => {
    switch (type) {
      case 'text':
        return 'Campo de texto básico para respuestas cortas';
      case 'email':
        return 'Campo para capturar direcciones de correo electrónico';
      case 'number':
        return 'Campo para capturar valores numéricos';
      case 'phone':
        return 'Campo para capturar números telefónicos';
      case 'textarea':
        return 'Campo de texto amplio para respuestas largas';
      case 'select':
        return 'Lista desplegable con opciones predefinidas';
      case 'radio':
        return 'Opciones exclusivas para seleccionar una sola';
      case 'date':
        return 'Campo para seleccionar una fecha';
      default:
        return 'Campo personalizado';
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Cabecera */}
      <div className="py-4 px-6 border-b border-gray-200 bg-white shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gradient">{title || 'Editor de Formularios'}</h1>
          <p className="text-sm text-gray-500">{step === 'fields' ? 'Editor de campos' : step === 'preview' ? 'Vista previa' : 'Formulario completado'}</p>
        </div>
        <div className="flex gap-2">
          {step === 'fields' && (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate('/forms')}
              >
                Cancelar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setStep('preview')}
              >
                Vista Previa
              </Button>
              <Button 
                variant="primary" 
                onClick={saveForm}
              >
                Guardar
              </Button>
            </>
          )}
          {step === 'preview' && (
            <Button 
              variant="outline" 
              onClick={() => setStep('fields')}
            >
              Volver al Editor
            </Button>
          )}
          {step === 'thankyou' && (
            <Button 
              variant="outline" 
              onClick={() => {
                setStep('fields');
                setPreviewCurrentIndex(0);
              }}
            >
              Volver al Editor
            </Button>
          )}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex overflow-hidden">
        {step === 'fields' ? (
          <>
            {/* Columna izquierda - Lista de campos */}
            <div className="w-1/4 p-4 border-r border-gray-200 bg-gray-50 flex flex-col h-full">
              <div className="mb-4 flex flex-col overflow-hidden">
                <Card variant="glass" className="mb-4">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título del Formulario</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={2}
                    />
                  </div>
                </Card>
                
                <div className="flex-1 overflow-y-auto neomorphic-inset p-4 rounded-xl">
                  <h2 className="text-lg font-medium mb-3 text-gray-700">Campos</h2>
                  {fields.length > 0 ? (
                    <div className="space-y-2 custom-scrollbar pr-2">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          onClick={() => setCurrentFieldIndex(index)}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            currentFieldIndex === index 
                              ? 'neomorphic-raised bg-white' 
                              : 'hover:bg-white/80'
                          }`}
                        >
                          <div className="font-medium truncate">{field.label}</div>
                          <div className="text-xs text-gray-500 capitalize">{field.type}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 italic">
                      No hay campos aún
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botón para agregar campos - sticky al final */}
              <div className="sticky bottom-0 pt-2 pb-2 bg-gray-50">
                <Button
                  variant="primary"
                  onClick={() => setAddModalOpen(true)}
                  className="w-full flex items-center justify-center py-3 text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Añadir nuevo campo
                </Button>
              </div>
            </div>
            
            {/* Columna central - Vista previa */}
            <div className="w-2/4 p-6 flex flex-col items-center overflow-y-auto bg-gray-100">
              <Card 
                variant="raised" 
                className="w-full max-w-lg my-4"
              >
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                
                {currentField ? (
                  <div className="p-4 border border-gray-200 rounded-lg bg-white">
                    <FormInput
                      field={currentField}
                      value=""
                      onChange={() => {}}
                      error=""
                    />
                  </div>
                ) : (
                  <div className="text-center p-8 text-gray-500 border border-gray-200 rounded-lg bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Selecciona o crea un campo para previsualizar</p>
                  </div>
                )}
              </Card>
            </div>
            
            {/* Columna derecha - Propiedades del campo */}
            <div className="w-1/4 p-4 border-l border-gray-200 bg-gray-50 overflow-y-auto">
              {currentField ? (
                <FormFieldProperties 
                  field={currentField} 
                  onChange={(updatedField) => {
                    if (currentFieldIndex !== null) {
                      updateField(currentFieldIndex, updatedField);
                    }
                  }}
                  removeField={() => {
                    if (currentFieldIndex !== null) {
                      removeField(currentFieldIndex);
                    }
                  }}
                />
              ) : (
                <div className="text-center p-8 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <p>Selecciona un campo para editar sus propiedades</p>
                </div>
              )}
            </div>
          </>
        ) : step === 'preview' ? (
          <div className="w-full flex justify-center p-6 overflow-auto bg-gray-100">
            <Card variant="raised" className="w-full max-w-lg">
              {/* Indicador de progreso */}
              {fields.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      {`Paso ${previewCurrentIndex + 1} de ${fields.length}`}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      {Math.round(((previewCurrentIndex + 1) / fields.length) * 100)}%
                    </span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300 ease-in-out" 
                      style={{ width: `${((previewCurrentIndex + 1) / fields.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
              </div>
              
              {fields.length > 0 ? (
                <div className="mb-4">
                  {fields[previewCurrentIndex] && (
                    <FormInput
                      field={fields[previewCurrentIndex]}
                      value={fieldValues[fields[previewCurrentIndex].id] || ''}
                      onChange={(value) => handleFieldValueChange(fields[previewCurrentIndex].id, value)}
                      error={fieldErrors[fields[previewCurrentIndex].id] || ''}
                    />
                  )}
                  
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                      disabled={previewCurrentIndex === 0}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="primary"
                      onClick={goToNextStep}
                    >
                      {previewCurrentIndex === fields.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 text-gray-600 border border-gray-200 rounded-lg">
                  <p>No hay campos en este formulario</p>
                </div>
              )}
            </Card>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center p-6 bg-gray-100">
            <Card variant="glass" className="w-full max-w-lg text-center py-10">
              <div className="rounded-full bg-green-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">¡Gracias!</h2>
              <p className="text-gray-600 mb-6">Tu formulario ha sido completado exitosamente.</p>
              <Button
                variant="primary"
                onClick={() => {
                  setStep('fields');
                  setPreviewCurrentIndex(0);
                  setFieldValues({});
                  setFieldErrors({});
                }}
              >
                Volver al editor
              </Button>
            </Card>
          </div>
        )}
      </div>
      
      {/* Modal para añadir campos */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Añadir nuevo campo"
        size="lg"
      >
        {renderFieldTypePicker()}
      </Modal>
    </div>
  );
};

export default FormBuilder; 