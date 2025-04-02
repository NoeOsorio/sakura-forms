import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField, FieldType } from '../types';

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
  
  const [state, setState] = useState<FormBuilderState>({
    title: 'Formulario médico',
    description: 'Por favor complete la siguiente información',
    fields: [],
    currentFieldIndex: null,
    isPreview: false,
    isAddModalOpen: false,
  });

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

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Date.now(),
      type,
      label: getDefaultLabelForType(type),
      placeholder: 'Escriba aquí...',
      required: false,
      options: type === 'select' || type === 'radio' ? ['Opción 1', 'Opción 2'] : [],
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
      const duplicatedField = {
        ...fieldToDuplicate,
        id: Date.now(),
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

  const saveForm = () => {
    console.log('Formulario guardado:', state);
    navigate('/forms');
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