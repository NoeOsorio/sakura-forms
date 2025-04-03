import { useFormEditor } from '../hooks/useFormEditor';
import FormHeader from '../components/forms/FormHeader';
import FormTitleEditor from '../components/forms/FormTitleEditor';
import FormFieldCard from '../components/forms/FormFieldCard';
import MedicalFormPreview from '../components/forms/MedicalFormPreview';
import FormFieldPicker from '../components/forms/FormFieldPicker';
import Modal from '../components/shared/Modal';
import Button from '../components/shared/Button';

const EditFormPage = () => {
  const {
    state,
    addField,
    removeField,
    updateField,
    moveField,
    duplicateField,
    saveForm,
    togglePreview,
    updateTitle,
    updateDescription,
    setCurrentFieldIndex,
    toggleAddModal,
  } = useFormEditor();

  const {
    title,
    description,
    fields,
    currentFieldIndex,
    isPreview,
    isAddModalOpen,
    isLoading,
    error,
  } = state;
  
  // Si estamos cargando, mostrar un indicador de carga
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando formulario...</p>
        </div>
      </div>
    );
  }
  
  // Si hay un error, mostrar un mensaje de error
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Intentar nuevamente
          </Button>
        </div>
      </div>
    );
  }
  
  // Si estamos en modo vista previa, mostrar el componente de vista previa
  if (isPreview) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <FormHeader
          title={title}
          isPreview={true}
          hasFields={fields.length > 0}
          onTogglePreview={togglePreview}
          onSave={saveForm}
        />
        
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
      <FormHeader
        title={title}
        isPreview={false}
        hasFields={fields.length > 0}
        onTogglePreview={togglePreview}
        onSave={saveForm}
      />
      
      <div className="flex-1 overflow-auto py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Instrucciones para nuevos usuarios */}
          {fields.length === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-blue-800 font-medium mb-2">¡Bienvenido al editor de formularios!</h3>
              <p className="text-blue-700 mb-3">
                Para comenzar a crear tu formulario, sigue estos pasos:
              </p>
              <ol className="list-decimal pl-5 text-blue-700 space-y-2">
                <li>Edita el título y la descripción del formulario en la parte superior</li>
                <li>Haz clic en el botón "+" en la parte inferior para añadir campos</li>
                <li>Selecciona el tipo de campo que deseas añadir</li>
                <li>Haz clic en cualquier campo para editarlo</li>
                <li>Utiliza los botones de flecha para reordenar los campos</li>
                <li>Haz clic en "Vista previa" para ver cómo se verá el formulario</li>
                <li>Cuando termines, haz clic en "Guardar"</li>
              </ol>
            </div>
          )}
          
          <FormTitleEditor
            title={title}
            description={description}
            onTitleChange={updateTitle}
            onDescriptionChange={updateDescription}
          />
          
          {/* Lista de campos */}
          {fields.length > 0 ? (
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium text-gray-800">Campos del formulario</h2>
                <span className="text-sm text-gray-500">{fields.length} {fields.length === 1 ? 'campo' : 'campos'}</span>
              </div>
              
              {fields.map((field, index) => (
                <FormFieldCard
                  key={field.id}
                  field={field}
                  isActive={currentFieldIndex === index}
                  onSelect={() => setCurrentFieldIndex(index)}
                  onChange={(updatedField) => updateField(index, updatedField)}
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
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 mt-6">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">No hay campos en el formulario</p>
              <button
                onClick={() => toggleAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar campo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Botón flotante para agregar campos */}
      <button
        onClick={() => toggleAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
        title="Agregar campo"
      >
        +
      </button>

      {/* Modal para agregar campos */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => toggleAddModal(false)}
        title="Agregar campo"
      >
        <FormFieldPicker onSelect={addField} />
      </Modal>
    </div>
  );
};

export default EditFormPage; 