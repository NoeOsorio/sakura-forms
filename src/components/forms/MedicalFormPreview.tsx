import React, { useState } from 'react';
import { FormField, FieldType, fieldTypeLabels } from '../../types/form';
import FormFieldPreview from './FormFieldPreview';
import Button from '../shared/Button';
import { validateField } from '../../validation/ValidationHelper';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ListBulletIcon,
  CheckCircleIcon,
  StarIcon,
  PaperClipIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface MedicalFormPreviewProps {
  title: string;
  description: string;
  fields: FormField[];
  onComplete: (values: Record<string, string>) => void;
  onBack?: () => void;
  isPublic?: boolean;
}

const MedicalFormPreview: React.FC<MedicalFormPreviewProps> = ({
  title,
  description,
  fields,
  onComplete,
  onBack,
  isPublic = false
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Si no hay campos, mostrar mensaje
  if (fields.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        {!isPublic && onBack && (
          <div className="py-6 border-t border-gray-200">
            <p className="text-gray-500 mb-4">Este formulario no tiene campos definidos.</p>
            <Button variant="outline" onClick={onBack}>
              Volver al editor
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  // Manejar cambio de valor para un campo específico
  const handleValueChange = (id: string, value: string) => {
    setValues({ ...values, [id]: value });
    
    // Limpiar error si el valor es válido
    const field = fields.find(f => f.id === id);
    if (field) {
      const error = validateField(field, value);
      if (!error) {
        const newErrors = { ...errors };
        delete newErrors[id];
        setErrors(newErrors);
      }
    }
  };
  
  // Validar todos los campos y enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos requeridos
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    fields.forEach(field => {
      const value = values[field.id] || '';
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field.id] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setErrors(newErrors);
      
      // Hacer scroll al primer error
      const firstErrorId = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstErrorId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    // Formulario completado exitosamente
    setIsSubmitted(true);
    onComplete(values);
  };
  
  // Si el formulario ha sido enviado, mostrar mensaje de agradecimiento
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-3">¡Gracias por completar el formulario!</h2>
        <p className="text-gray-600 mb-6">Tu información ha sido recibida correctamente y será procesada por nuestro equipo médico.</p>
      </div>
    );
  }

  // Obtener icono para el tipo de campo
  const getFieldIcon = (type: FieldType) => {
    switch (type) {
      case 'text':
        return <UserIcon className="w-5 h-5" />;
      case 'email':
        return <EnvelopeIcon className="w-5 h-5" />;
      case 'tel':
        return <PhoneIcon className="w-5 h-5" />;
      case 'textarea':
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'date':
        return <CalendarDaysIcon className="w-5 h-5" />;
      case 'select':
      case 'radio':
        return <ListBulletIcon className="w-5 h-5" />;
      case 'checkbox':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'scale':
        return <StarIcon className="w-5 h-5" />;
      case 'file':
        return <PaperClipIcon className="w-5 h-5" />;
      case 'signature':
        return <PencilIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Encabezado */}
      <div className="bg-blue-600 text-white p-4 sm:p-6 rounded-t-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-blue-100">{description}</p>
      </div>
      
      <div className="p-4 sm:p-6">
        {/* Instrucciones */}
        <div className="mb-4 sm:mb-6 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-medium text-blue-800 text-sm sm:text-base">Instrucciones</h3>
          <p className="text-blue-700 text-xs sm:text-sm mt-1">
            Por favor, complete todos los campos marcados con un asterisco (*). 
            Esta información es importante para su atención médica.
          </p>
        </div>
        
        {/* Formulario con todos los campos */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 sm:space-y-6">
            {fields.map((field, index) => (
              <div 
                key={field.id} 
                id={`field-section-${field.id}`} 
                className="p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {/* Número y tipo de campo */}
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base font-semibold mr-2">
                    {index + 1}
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    {getFieldIcon(field.type)}
                    <span className="ml-1 capitalize text-xs">{fieldTypeLabels[field.type]}</span>
                  </div>
                </div>
                
                <FormFieldPreview
                  field={field}
                  value={values[field.id] || ''}
                  onChange={(value) => handleValueChange(field.id, value)}
                  error={errors[field.id] || ''}
                />
                
              </div>
            ))}
          </div>
          
          {/* Pie de formulario */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs sm:text-sm text-gray-600">
              <p>Al enviar este formulario, confirma que toda la información proporcionada es correcta y autoriza a nuestro equipo médico a utilizarla para su atención.</p>
            </div>
            
            <div className="flex justify-end">
              {!isPublic && onBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  type="button"
                  className="mr-2 text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
                >
                  Volver al editor
                </Button>
              )}
              
              <Button
                variant="primary"
                type="submit"
                className="text-sm sm:text-base px-4 py-1.5 sm:px-6 sm:py-2"
              >
                Enviar formulario
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalFormPreview; 