import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FormField, 
  FieldType, 
  TextField, 
  NumericField, 
  DateTimeField, 
  FieldWithOptions, 
  CheckboxField, 
  ScaleField, 
  FileField, 
  SignatureField 
} from '../types/form';

interface FormEditorState {
  id: string | null;
  title: string;
  description: string;
  fields: FormField[];
  currentFieldIndex: number | null;
  isPreview: boolean;
  isAddModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useFormEditor = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  
  const [state, setState] = useState<FormEditorState>({
    id: null,
    title: '',
    description: '',
    fields: [],
    currentFieldIndex: null,
    isPreview: false,
    isAddModalOpen: false,
    isLoading: true,
    error: null,
  });
  
  // Cargar el formulario existente
  useEffect(() => {
    const loadForm = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Aquí se haría la llamada a la API para obtener el formulario
        // Por ahora usamos datos de ejemplo
        const mockForm = {
          id: formId,
          title: 'Formulario de ejemplo',
          description: 'Este es un formulario de ejemplo para editar',
          fields: [
            {
              id: '1',
              type: 'text' as const,
              label: 'Nombre completo',
              placeholder: 'Ingrese su nombre completo',
              required: true,
              options: [],
            } as TextField,
            {
              id: '2',
              type: 'email' as const,
              label: 'Correo electrónico',
              placeholder: 'ejemplo@correo.com',
              required: true,
              options: [],
            } as TextField,
            {
              id: '3',
              type: 'textarea' as const,
              label: 'Descripción',
              placeholder: 'Describa su situación',
              required: false,
              options: [],
            } as TextField,
          ],
        };
        
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setState(prev => ({
          ...prev,
          id: mockForm.id || null,
          title: mockForm.title,
          description: mockForm.description,
          fields: mockForm.fields,
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Error al cargar el formulario. Por favor, intente nuevamente.',
        }));
        console.error('Error loading form:', error);
      }
    };
    
    if (formId) {
      loadForm();
    }
  }, [formId]);
  
  // Añadir nuevo campo
  const addField = (type: FieldType) => {
    const baseField = {
      id: Date.now().toString(),
      label: '',
      required: false,
      description: '',
      placeholder: '',
    };

    let newField: FormField;

    switch (type) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'tel':
        newField = {
          ...baseField,
          type,
        } as TextField;
        break;
      case 'number':
        newField = {
          ...baseField,
          type,
          minValue: 0,
          maxValue: 100,
        } as NumericField;
        break;
      case 'date':
      case 'time':
      case 'datetime':
        newField = {
          ...baseField,
          type,
        } as DateTimeField;
        break;
      case 'select':
      case 'radio':
        newField = {
          ...baseField,
          type,
          options: ['Opción 1', 'Opción 2'],
        } as FieldWithOptions;
        break;
      case 'checkbox':
        newField = {
          ...baseField,
          type,
          checked: false,
        } as CheckboxField;
        break;
      case 'scale':
        newField = {
          ...baseField,
          type,
          minValue: 1,
          maxValue: 10,
        } as ScaleField;
        break;
      case 'file':
        newField = {
          ...baseField,
          type,
          allowedTypes: ['image/*', 'application/pdf'],
        } as FileField;
        break;
      case 'signature':
        newField = {
          ...baseField,
          type,
        } as SignatureField;
        break;
      default:
        newField = {
          ...baseField,
          type: 'text',
        } as TextField;
    }
    
    const newFields = [...state.fields, newField];
    setState(prev => ({
      ...prev,
      fields: newFields,
      currentFieldIndex: newFields.length - 1,
      isAddModalOpen: false,
    }));
    
    // Desplazarse al campo recién añadido
    setTimeout(() => {
      const fieldElements = document.querySelectorAll('.form-field-card');
      if (fieldElements.length > 0) {
        const lastField = fieldElements[fieldElements.length - 1];
        lastField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };
  
  // Eliminar un campo
  const removeField = (index: number) => {
    const newFields = [...state.fields];
    newFields.splice(index, 1);
    
    setState(prev => ({
      ...prev,
      fields: newFields,
      currentFieldIndex: prev.currentFieldIndex === index 
        ? (newFields.length > 0 ? 0 : null) 
        : (prev.currentFieldIndex !== null && index < prev.currentFieldIndex 
            ? prev.currentFieldIndex - 1 
            : prev.currentFieldIndex),
    }));
  };
  
  // Actualizar un campo
  const updateField = (index: number, updatedField: Partial<FormField>) => {
    const newFields = [...state.fields];
    const currentField = newFields[index];
    
    // Preservar el tipo específico del campo
    const updated = { ...currentField, ...updatedField };
    
    // Asegurar que las propiedades específicas del tipo se mantengan
    switch (currentField.type) {
      case 'select':
      case 'radio':
        if (!('options' in updated)) {
          (updated as FieldWithOptions).options = (currentField as FieldWithOptions).options;
        }
        break;
      case 'scale':
        if (!('minValue' in updated)) {
          (updated as ScaleField).minValue = (currentField as ScaleField).minValue;
        }
        if (!('maxValue' in updated)) {
          (updated as ScaleField).maxValue = (currentField as ScaleField).maxValue;
        }
        break;
      case 'file':
        if (!('allowedTypes' in updated)) {
          (updated as FileField).allowedTypes = (currentField as FileField).allowedTypes;
        }
        break;
      case 'number':
        if (!('minValue' in updated)) {
          (updated as NumericField).minValue = (currentField as NumericField).minValue;
        }
        if (!('maxValue' in updated)) {
          (updated as NumericField).maxValue = (currentField as NumericField).maxValue;
        }
        break;
    }
    
    newFields[index] = updated as FormField;
    setState(prev => ({
      ...prev,
      fields: newFields,
    }));
  };
  
  // Reordenar campos
  const moveField = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= state.fields.length) return;
    
    const newFields = [...state.fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    
    setState(prev => ({
      ...prev,
      fields: newFields,
      currentFieldIndex: toIndex,
    }));
  };
  
  // Duplicar campo
  const duplicateField = (index: number) => {
    const fieldToDuplicate = state.fields[index];
    const duplicatedField = {
      ...fieldToDuplicate,
      id: Date.now().toString(),
      label: `${fieldToDuplicate.label} (copia)`,
    };
    
    const newFields = [...state.fields];
    newFields.splice(index + 1, 0, duplicatedField);
    
    setState(prev => ({
      ...prev,
      fields: newFields,
      currentFieldIndex: index + 1,
    }));
  };
  
  // Guardar formulario
  const saveForm = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Aquí se haría la llamada a la API para guardar el formulario
      // Por ahora simulamos un retraso de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Formulario guardado:', { 
        id: state.id, 
        title: state.title, 
        description: state.description, 
        fields: state.fields 
      });
      
      setState(prev => ({ ...prev, isLoading: false }));
      navigate('/forms');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error al guardar el formulario. Por favor, intente nuevamente.',
      }));
      console.error('Error saving form:', error);
    }
  };
  
  // Alternar vista previa
  const togglePreview = () => {
    setState(prev => ({
      ...prev,
      isPreview: !prev.isPreview,
    }));
  };
  
  // Actualizar título
  const updateTitle = (title: string) => {
    setState(prev => ({
      ...prev,
      title,
    }));
  };
  
  // Actualizar descripción
  const updateDescription = (description: string) => {
    setState(prev => ({
      ...prev,
      description,
    }));
  };
  
  // Seleccionar campo actual
  const setCurrentFieldIndex = (index: number | null) => {
    setState(prev => ({
      ...prev,
      currentFieldIndex: index,
    }));
  };
  
  // Abrir/cerrar modal de añadir campo
  const toggleAddModal = (isOpen: boolean) => {
    setState(prev => ({
      ...prev,
      isAddModalOpen: isOpen,
    }));
  };
  
  return {
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
  };
}; 