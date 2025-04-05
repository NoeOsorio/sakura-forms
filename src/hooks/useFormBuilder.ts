import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FormField, 
  FieldType, 
  CreateFormInput, 
  UpdateFormInput,
  FieldWithOptions,
  ScaleField,
  FileField,
  NumericField,
  DateTimeField,
  CheckboxField,
  SignatureField,
  TextField
} from '../types/form';
import { useAuth } from './useAuth';
import { formService } from '../services/formService';
import { toast } from 'react-hot-toast';

export interface FormBuilderState {
  title: string;
  description: string;
  fields: FormField[];
  currentFieldIndex: number | null;
  isPreview: boolean;
  isAddModalOpen: boolean;
}

export const useFormBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [state, setState] = useState<FormBuilderState>({
    title: 'Formulario médico',
    description: 'Por favor complete la siguiente información',
    fields: [],
    currentFieldIndex: null,
    isPreview: false,
    isAddModalOpen: false,
  });

  useEffect(() => {
    if (id && user) {
      formService.getFormById(id)
        .then(form => {
          setState(prev => ({
            ...prev,
            title: form.title,
            description: form.description || '',
            fields: form.fields.map(field => ({
              ...field,
              placeholder: field.placeholder || '',
            })),
          }));
        })
        .catch(error => {
          console.error('Error al cargar el formulario:', error);
          toast.error('Error al cargar el formulario');
        });
    }
  }, [id, user]);

  const addField = (type: FieldType) => {
    const newId = `field-${Date.now()}`;
    const baseField = {
      id: newId,
      type,
      label: '',
      required: false,
      description: '',
      placeholder: '',
    };

    let newField: FormField;

    switch (type) {
      case 'select':
      case 'radio':
        newField = {
          ...baseField,
          type,
          options: ['Opción 1', 'Opción 2'],
        } as FieldWithOptions;
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
      case 'checkbox':
        newField = {
          ...baseField,
          type,
          checked: false,
        } as CheckboxField;
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
          type,
        } as TextField;
    }
    
    setState(prev => {
      const newFields = [...prev.fields, newField];
      return {
        ...prev,
        fields: newFields,
        currentFieldIndex: newFields.length - 1,
        isAddModalOpen: false,
      };
    });

    setTimeout(() => {
      const fieldElements = document.querySelectorAll('.form-field-card');
      if (fieldElements.length > 0) {
        const lastField = fieldElements[fieldElements.length - 1];
        lastField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const removeField = (index: number) => {
    setState(prev => {
      const newFields = [...prev.fields];
      newFields.splice(index, 1);
      
      let newCurrentFieldIndex = prev.currentFieldIndex;
      if (prev.currentFieldIndex === index) {
        newCurrentFieldIndex = newFields.length > 0 ? 0 : null;
      } else if (prev.currentFieldIndex !== null && index < prev.currentFieldIndex) {
        newCurrentFieldIndex = prev.currentFieldIndex - 1;
      }

      return {
        ...prev,
        fields: newFields,
        currentFieldIndex: newCurrentFieldIndex,
      };
    });
  };

  const updateField = (index: number, updatedField: Partial<FormField>) => {
    setState(prev => {
      const newFields = [...prev.fields];
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
      return {
        ...prev,
        fields: newFields,
      };
    });
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= state.fields.length) return;
    
    setState(prev => {
      const newFields = [...prev.fields];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      
      return {
        ...prev,
        fields: newFields,
        currentFieldIndex: toIndex,
      };
    });
  };

  const duplicateField = (index: number) => {
    setState(prev => {
      const fieldToDuplicate = prev.fields[index];
      const newId = `field-${Date.now()}`;
      const duplicatedField = {
        ...fieldToDuplicate,
        id: newId,
        label: `${fieldToDuplicate.label} (copia)`,
      };
      
      const newFields = [...prev.fields];
      newFields.splice(index + 1, 0, duplicatedField);
      
      return {
        ...prev,
        fields: newFields,
        currentFieldIndex: index + 1,
      };
    });
  };

  const saveForm = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para guardar el formulario');
      return;
    }

    try {
      const formData = {
        title: state.title,
        description: state.description,
        fields: state.fields.map(field => ({
          ...field,
          order: state.fields.indexOf(field),
        })),
        user_id: user.id,
        is_active: true,
      };

      if (id) {
        await formService.updateForm(id, formData as UpdateFormInput);
        toast.success('Formulario actualizado exitosamente');
      } else {
        await formService.createForm(formData as CreateFormInput);
        toast.success('Formulario creado exitosamente');
      }

      navigate('/forms');
    } catch (error) {
      console.error('Error al guardar el formulario:', error);
      toast.error('Error al guardar el formulario');
    }
  };

  const togglePreview = () => {
    setState(prev => ({
      ...prev,
      isPreview: !prev.isPreview,
    }));
  };

  const updateTitle = (title: string) => {
    setState(prev => ({ ...prev, title }));
  };

  const updateDescription = (description: string) => {
    setState(prev => ({ ...prev, description }));
  };

  const setCurrentFieldIndex = (index: number | null) => {
    setState(prev => ({ ...prev, currentFieldIndex: index }));
  };

  const toggleAddModal = (isOpen: boolean) => {
    setState(prev => ({ ...prev, isAddModalOpen: isOpen }));
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