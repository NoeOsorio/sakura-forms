import { useFormBuilder } from '../../hooks/useFormBuilder';
import FormHeader from './FormHeader';
import FormTitleEditor from './FormTitleEditor';
import FormFieldCard from './FormFieldCard';
import MedicalFormPreview from './MedicalFormPreview';
import FormFieldPicker from './FormFieldPicker';
import Modal from '../shared/Modal';

const MedicalFormBuilder = () => {
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
  } = useFormBuilder();

  const {
    title,
    description,
    fields,
    currentFieldIndex,
    isPreview,
    isAddModalOpen,
  } = state;
  
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
          <FormTitleEditor
            title={title}
            description={description}
            onTitleChange={updateTitle}
            onDescriptionChange={updateDescription}
          />
          
          {/* Lista de campos */}
          {fields.length > 0 ? (
            <div className="space-y-4">
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
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No hay campos en el formulario</p>
              <button
                onClick={() => toggleAddModal(true)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                + Agregar campo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Botón flotante para agregar campos */}
      <button
        onClick={() => toggleAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
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

export default MedicalFormBuilder; 