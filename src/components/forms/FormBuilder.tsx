import { useState } from 'react';
import Button from '../shared/Button';
import FormFieldPicker from './FormFieldPicker';
import Modal from '../shared/Modal';

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

interface FormBuilderProps {
  formId?: number | null;
  isNew?: boolean;
}

const FormBuilder = ({ isNew = true }: FormBuilderProps) => {
  const [formTitle, setFormTitle] = useState(isNew ? 'Nuevo Formulario' : 'Editar Formulario');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(-1);
  
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
    setAddModalOpen(false);
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

  // Get active field
  const activeField = fields.find(field => field.id === activeFieldId);
  
  // Field type icon mapping
  const fieldTypeIcons: Record<FieldType, string> = {
    text: 'Aa',
    email: '✉️',
    phone: '📱',
    number: '#',
    checkbox: '☑️',
    radio: '⭕',
    select: '▼',
    textarea: '¶',
    date: '📅',
    scale: '⭐',
    file: '📎',
    signature: '✍️'
  };
  
  // Preview navigation
  const totalSteps = fields.length; // Only count actual form fields
  
  const goToNextStep = () => {
    if (currentPreviewIndex < fields.length) { // Can go until the last field
      setCurrentPreviewIndex(currentPreviewIndex + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentPreviewIndex > 0) { // Can go back to welcome screen
      setCurrentPreviewIndex(currentPreviewIndex - 1);
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with form title and actions */}
      <div className="px-6 py-4 border-b flex justify-between items-center bg-white sticky top-0 z-20 shadow-sm">
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="text-xl font-medium border-none focus:outline-none focus:ring-0 w-full max-w-md"
          placeholder="Nuevo Formulario"
        />
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => {
              setPreviewModalOpen(true);
              setCurrentPreviewIndex(0); // Start at welcome screen
            }}
          >Vista Previa</Button>
          <Button>Publicar</Button>
        </div>
      </div>
      
      {/* Main content with 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left column - Field list */}
        <div className="w-72 bg-white flex flex-col border-r z-10 overflow-hidden">
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <h2 className="font-medium text-gray-700">Campos del formulario</h2>
            <span className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600">{fields.length} campos</span>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* Welcome screen item */}
            <div 
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 
                ${activeFieldId === 'welcome' ? 'bg-teal-50 border-l-4 border-teal-500' : 'border-l-4 border-transparent'}`}
              onClick={() => setActiveFieldId('welcome')}
            >
              <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mr-3 text-lg">
                🏠
              </div>
              <div>
                <p className="font-medium text-gray-800">Pantalla de bienvenida</p>
                <p className="text-xs text-gray-500">Configuración inicial</p>
              </div>
            </div>
            
            {/* Form fields */}
            {fields.map((field, index) => (
              <div 
                key={field.id}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 group
                  ${activeFieldId === field.id ? 'bg-teal-50 border-l-4 border-teal-500' : 'border-l-4 border-transparent'}`}
                onClick={() => setActiveFieldId(field.id)}
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center mr-3 font-medium">
                  {index + 1}
                </div>
                <div className="overflow-hidden flex-grow">
                  <p className="font-medium text-gray-800 truncate">{field.label}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <span className="mr-1">{fieldTypeIcons[field.type]}</span>
                    {field.type}
                    {field.required && <span className="ml-2 text-red-500">*</span>}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeField(field.id);
                  }}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          {/* Add field button - Positioned at the bottom with sticky positioning */}
          <div className="p-4 border-t sticky bottom-0 bg-white mt-auto">
            <Button 
              onClick={() => setAddModalOpen(true)}
              className="w-full flex items-center justify-center py-3 text-base"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-2">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Añadir nuevo campo
            </Button>
          </div>
        </div>
        
        {/* Middle column - Preview */}
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="max-w-3xl mx-auto py-10 px-4">
            {/* Welcome screen preview */}
            {activeFieldId === 'welcome' && (
              <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                <h1 className="text-3xl font-bold mb-4">{formTitle}</h1>
                {formDescription && <p className="text-gray-600 mb-6">{formDescription}</p>}
                <Button>Comenzar</Button>
              </div>
            )}
            
            {/* Active field preview */}
            {activeField && (
              <div className="bg-white rounded-lg shadow-sm p-10">
                <h2 className="text-2xl font-medium mb-3">{activeField.label}</h2>
                {activeField.description && (
                  <p className="text-gray-600 mb-6">{activeField.description}</p>
                )}
                
                {/* Field input preview based on type */}
                <div className="mb-8">
                  {activeField.type === 'text' && (
                    <input
                      type="text"
                      placeholder={activeField.placeholder || 'Texto corto...'}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    />
                  )}
                  
                  {activeField.type === 'textarea' && (
                    <textarea
                      placeholder={activeField.placeholder || 'Texto largo...'}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      rows={4}
                    />
                  )}
                  
                  {activeField.type === 'radio' && activeField.options && (
                    <div className="space-y-3">
                      {activeField.options.map((option, i) => (
                        <label key={i} className="flex items-center text-lg p-2 hover:bg-gray-50 rounded-md">
                          <input
                            type="radio"
                            name={`field-${activeField.id}`}
                            className="h-5 w-5 text-teal-600 focus:ring-teal-500 mr-3"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {activeField.type === 'checkbox' && activeField.options && (
                    <div className="space-y-3">
                      {activeField.options.map((option, i) => (
                        <label key={i} className="flex items-center text-lg p-2 hover:bg-gray-50 rounded-md">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded text-teal-600 focus:ring-teal-500 mr-3"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {activeField.type === 'select' && activeField.options && (
                    <select
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="" disabled selected>Selecciona una opción</option>
                      {activeField.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  
                  {(activeField.type === 'email' || activeField.type === 'phone' || activeField.type === 'number') && (
                    <input
                      type={activeField.type}
                      placeholder={activeField.placeholder || `Ingresa ${activeField.type === 'email' ? 'email' : activeField.type === 'phone' ? 'teléfono' : 'número'}...`}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    />
                  )}
                  
                  {activeField.type === 'date' && (
                    <input
                      type="date"
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    />
                  )}
                  
                  {activeField.type === 'scale' && (
                    <div className="flex justify-between items-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button 
                          key={num} 
                          className="h-12 w-12 rounded-full border-2 border-gray-300 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center text-lg font-medium transition-colors"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {activeField.type === 'file' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 hover:bg-teal-50 transition-colors cursor-pointer">
                      <div className="text-gray-500 mb-2">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-lg">Arrastra archivos aquí o <span className="text-teal-600">selecciona un archivo</span></p>
                    </div>
                  )}
                  
                  {activeField.type === 'signature' && (
                    <div className="border-2 border-gray-300 rounded-lg h-40 flex items-center justify-center bg-gray-50 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-colors">
                      <p className="text-gray-400">Haz clic para firmar</p>
                    </div>
                  )}
                </div>
                
                {/* Navigation buttons */}
                <div className="flex justify-between">
                  <Button variant="outline">Anterior</Button>
                  <Button>Siguiente</Button>
                </div>
              </div>
            )}
            
            {/* Empty state */}
            {!activeFieldId && (
              <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                <div className="flex justify-center mb-6">
                  <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium mb-2">Selecciona un campo</h2>
                <p className="text-gray-500 mb-6">Selecciona un campo de la izquierda para previsualizarlo o editarlo, o añade un nuevo campo para empezar</p>
                <Button onClick={() => setAddModalOpen(true)}>
                  Añadir primer campo
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Field properties */}
        <div className="w-80 bg-white flex flex-col border-l overflow-hidden">
          <div className="px-4 py-3 border-b">
            <h2 className="font-medium text-gray-700">Propiedades del campo</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5">
            {activeFieldId === 'welcome' ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Título del formulario"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Descripción del formulario"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagen (opcional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md hover:border-teal-400 cursor-pointer transition-colors">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
                          <span>Subir imagen</span>
                          <input type="file" className="sr-only" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeField ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pregunta
                  </label>
                  <input
                    type="text"
                    value={activeField.label}
                    onChange={(e) => updateField(activeField.id, { label: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Escribe una pregunta"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texto de ayuda
                  </label>
                  <input
                    type="text"
                    value={activeField.description || ''}
                    onChange={(e) => updateField(activeField.id, { description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Añade un texto de ayuda..."
                  />
                </div>
                
                {(activeField.type === 'text' || activeField.type === 'email' || activeField.type === 'phone' || activeField.type === 'number' || activeField.type === 'textarea') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Placeholder
                    </label>
                    <input
                      type="text"
                      value={activeField.placeholder || ''}
                      onChange={(e) => updateField(activeField.id, { placeholder: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="Texto de ejemplo..."
                    />
                  </div>
                )}
                
                {(activeField.type === 'radio' || activeField.type === 'select' || activeField.type === 'checkbox') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opciones
                    </label>
                    {activeField.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2 group">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(activeField.options || [])];
                            newOptions[optionIndex] = e.target.value;
                            updateField(activeField.id, { options: newOptions });
                          }}
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                        <button
                          onClick={() => {
                            const newOptions = [...(activeField.options || [])];
                            newOptions.splice(optionIndex, 1);
                            updateField(activeField.id, { options: newOptions });
                          }}
                          className="ml-2 text-gray-400 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                          type="button"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newOptions = [...(activeField.options || []), `Opción ${(activeField.options?.length || 0) + 1}`];
                        updateField(activeField.id, { options: newOptions });
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-teal-600 hover:text-teal-700 py-2 px-3 rounded-md flex items-center transition-colors w-full justify-center"
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Añadir opción
                    </button>
                  </div>
                )}
                
                <div className="pt-3 border-t">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={activeField.required}
                      onChange={(e) => updateField(activeField.id, { required: e.target.checked })}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Campo requerido</span>
                  </label>
                </div>
                
                <div className="pt-3 border-t">
                  <Button 
                    variant="danger" 
                    onClick={() => removeField(activeField.id)}
                    className="w-full justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar campo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="flex justify-center mb-4">
                  <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l-4-4m4 4l4-4" />
                  </svg>
                </div>
                <p className="mb-2 font-medium">Ningún campo seleccionado</p>
                <p>Selecciona un campo para ver y editar sus propiedades</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add field modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Añadir nuevo campo"
        size="lg"
      >
        <FormFieldPicker onSelect={addField} />
      </Modal>
      
      {/* Preview modal */}
      <Modal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        title="Vista previa del formulario"
        size="xl"
      >
        <div className="flex flex-col items-center">
          {/* Progress indicator - only show for fields, not for welcome screen or thank you screen */}
          {currentPreviewIndex > 0 && currentPreviewIndex <= fields.length && fields.length > 0 && (
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">
                  {`Paso ${currentPreviewIndex} de ${totalSteps}`}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {Math.round((currentPreviewIndex / totalSteps) * 100)}%
                </span>
              </div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-teal-500 h-2 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${(currentPreviewIndex / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Content area */}
          <div className="max-w-xl w-full">
            {/* Welcome screen */}
            {currentPreviewIndex === 0 && (
              <div className="bg-white rounded-lg p-10 text-center">
                <h1 className="text-3xl font-bold mb-4">{formTitle}</h1>
                {formDescription && <p className="text-gray-600 mb-6">{formDescription}</p>}
                <Button onClick={goToNextStep} disabled={fields.length === 0}>
                  {fields.length === 0 ? 'No hay campos en el formulario' : 'Comenzar'}
                </Button>
              </div>
            )}
            
            {/* Field preview */}
            {currentPreviewIndex > 0 && currentPreviewIndex <= fields.length && (
              <div className="bg-white rounded-lg p-10">
                {/* Current field is fields[currentPreviewIndex - 1] */}
                {(() => {
                  const field = fields[currentPreviewIndex - 1];
                  return (
                    <>
                      <h2 className="text-2xl font-medium mb-3">{field.label}</h2>
                      {field.description && (
                        <p className="text-gray-600 mb-6">{field.description}</p>
                      )}
                      
                      {/* Field input preview based on type */}
                      <div className="mb-8">
                        {field.type === 'text' && (
                          <input
                            type="text"
                            placeholder={field.placeholder || 'Texto corto...'}
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        )}
                        
                        {field.type === 'textarea' && (
                          <textarea
                            placeholder={field.placeholder || 'Texto largo...'}
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            rows={4}
                          />
                        )}
                        
                        {field.type === 'radio' && field.options && (
                          <div className="space-y-3">
                            {field.options.map((option, i) => (
                              <label key={i} className="flex items-center text-lg p-2 hover:bg-gray-50 rounded-md">
                                <input
                                  type="radio"
                                  name={`field-${field.id}`}
                                  className="h-5 w-5 text-teal-600 focus:ring-teal-500 mr-3"
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                        
                        {field.type === 'checkbox' && field.options && (
                          <div className="space-y-3">
                            {field.options.map((option, i) => (
                              <label key={i} className="flex items-center text-lg p-2 hover:bg-gray-50 rounded-md">
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 rounded text-teal-600 focus:ring-teal-500 mr-3"
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                        
                        {field.type === 'select' && field.options && (
                          <select
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          >
                            <option value="" disabled selected>Selecciona una opción</option>
                            {field.options.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                        
                        {(field.type === 'email' || field.type === 'phone' || field.type === 'number') && (
                          <input
                            type={field.type}
                            placeholder={field.placeholder || `Ingresa ${field.type === 'email' ? 'email' : field.type === 'phone' ? 'teléfono' : 'número'}...`}
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        )}
                        
                        {field.type === 'date' && (
                          <input
                            type="date"
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        )}
                        
                        {field.type === 'scale' && (
                          <div className="flex justify-between items-center">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <button 
                                key={num} 
                                className="h-12 w-12 rounded-full border-2 border-gray-300 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center text-lg font-medium transition-colors"
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {field.type === 'file' && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 hover:bg-teal-50 transition-colors cursor-pointer">
                            <div className="text-gray-500 mb-2">
                              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                            <p className="text-lg">Arrastra archivos aquí o <span className="text-teal-600">selecciona un archivo</span></p>
                          </div>
                        )}
                        
                        {field.type === 'signature' && (
                          <div className="border-2 border-gray-300 rounded-lg h-40 flex items-center justify-center bg-gray-50 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-colors">
                            <p className="text-gray-400">Haz clic para firmar</p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
            
            {/* Thank you screen */}
            {currentPreviewIndex > 0 && currentPreviewIndex > fields.length && (
              <div className="bg-white rounded-lg p-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-600">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-medium mb-4">¡Gracias por completar el formulario!</h2>
                <p className="text-gray-600 mb-6">Tus respuestas han sido registradas.</p>
                <Button 
                  onClick={() => setPreviewModalOpen(false)} 
                  variant="outline"
                >
                  Cerrar vista previa
                </Button>
              </div>
            )}
          </div>
          
          {/* Navigation buttons */}
          {currentPreviewIndex > 0 && currentPreviewIndex <= fields.length && (
            <div className="flex justify-between w-full max-w-xl mt-8">
              <Button variant="outline" onClick={goToPreviousStep}>
                {currentPreviewIndex === 1 ? 'Volver a inicio' : 'Anterior'}
              </Button>
              {currentPreviewIndex === fields.length ? (
                <Button onClick={() => setCurrentPreviewIndex(fields.length + 1)}>Finalizar</Button>
              ) : (
                <Button onClick={goToNextStep}>Siguiente</Button>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FormBuilder; 