import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormField } from '../components/forms/types';
import { FieldType } from '../types/field';
import { useAuth } from './useAuth';
import { formService } from '../services/formService';
import { toast } from 'react-hot-toast';
import { CreateFormInput, UpdateFormInput } from '../types/form';

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

  // Cargar formulario existente si hay un ID
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
              placeholder: '',
              errorMessage: '',
              formatErrorMessage: '',
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
    const newField: FormField = {
      id: newId,
      type,
      label: '',
      placeholder: '',
      required: false,
      errorMessage: '',
      formatErrorMessage: '',
      options: type === 'select' || type === 'radio' ? ['Opción 1', 'Opción 2'] : [],
      description: '',
      allowedTypes: type === 'file' ? ['image/*', 'application/pdf'] : undefined,
      minValue: type === 'scale' ? 1 : undefined,
      maxValue: type === 'scale' ? 10 : undefined,
    };
    
    setState(prev => {
      const newFields = [...prev.fields, newField];
      return {
        ...prev,
        fields: newFields,
        currentFieldIndex: newFields.length - 1,
        isAddModalOpen: false,
      };
    });

    // Desplazarse al campo recién añadido
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
      newFields[index] = { ...newFields[index], ...updatedField };
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
      console.log('Estado actual:', state);
      
      const formData = {
        title: state.title,
        description: state.description,
        fields: state.fields.map(field => {
          console.log('Campo antes de mapear:', field);
          const mappedField = {
            type: field.type,
            label: field.label,
            description: field.description,
            placeholder: field.placeholder,
            required: field.required,
            options: field.options,
            allowedTypes: field.allowedTypes,
            minValue: field.minValue,
            maxValue: field.maxValue,
            order: state.fields.indexOf(field),
          };
          console.log('Campo después de mapear:', mappedField);
          return mappedField;
        }),
        user_id: user.id,
        is_active: true,
      };

      console.log('Payload completo:', formData);

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