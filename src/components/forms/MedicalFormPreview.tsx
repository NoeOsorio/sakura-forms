import React, { useState } from 'react';
import { FormField } from '../../types';
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
  onComplete: () => void;
  onBack: () => void;
}

const MedicalFormPreview: React.FC<MedicalFormPreviewProps> = ({
  title,
  description,
  fields,
  onComplete,
  onBack
}) => {
  const [values, setValues] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Si no hay campos, mostrar mensaje
  if (fields.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="py-6 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Este formulario no tiene campos definidos.</p>
          <Button variant="outline" onClick={onBack}>
            Volver al editor
          </Button>
        </div>
      </div>
    );
  }
  
  // Manejar cambio de valor para un campo específico
  const handleValueChange = (id: number, value: string) => {
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
    const newErrors: Record<number, string> = {};
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
        <div className="py-4">
          <Button variant="primary" onClick={onComplete} className="px-8 py-3 text-lg">
            Finalizar
          </Button>
        </div>
      </div>
    );
  }
  
  // Renderizar el contexto según el tipo de campo
  const getFieldContext = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return 'Esta información nos ayuda a identificarte correctamente en nuestros registros.';
      case 'email':
        return 'Usaremos este email para enviarte confirmaciones y resultados médicos.';
      case 'phone':
        return 'Un número de contacto nos permite comunicarnos contigo para información importante.';
      case 'textarea':
        return 'Proporciona todos los detalles que consideres relevantes para tu condición médica.';
      case 'date':
        return 'La fecha exacta nos ayuda a tener un historial preciso.';
      case 'select':
      case 'radio':
        return 'Selecciona la opción que mejor corresponda a tu situación.';
      case 'checkbox':
        return 'Marca esta casilla si la afirmación es correcta.';
      case 'scale':
        return 'Selecciona un valor en la escala que mejor represente tu respuesta.';
      case 'file':
        return 'Adjunta los documentos o imágenes relevantes para tu caso.';
      case 'signature':
        return 'Tu firma digital confirma la veracidad de la información proporcionada.';
      default:
        return '';
    }
  };
  
  // Obtener icono para el tipo de campo
  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <UserIcon className="w-5 h-5" />;
      case 'email':
        return <EnvelopeIcon className="w-5 h-5" />;
      case 'phone':
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
    <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      {/* Encabezado */}
      <div className="bg-blue-600 text-white p-8 rounded-t-lg">
        <h2 className="text-2xl font-semibold mb-3">{title}</h2>
        <p className="text-blue-100">{description}</p>
      </div>
      
      <div className="p-8">
        {/* Instrucciones */}
        <div className="mb-8 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-medium text-blue-800">Instrucciones</h3>
          <p className="text-blue-700 text-sm mt-1">
            Por favor, complete todos los campos marcados con un asterisco (*). 
            Esta información es importante para su atención médica.
          </p>
        </div>
        
        {/* Formulario con todos los campos */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {fields.map((field, index) => (
              <div 
                key={field.id} 
                id={`field-section-${field.id}`} 
                className="p-6 rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {/* Número y tipo de campo */}
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-2">
                    {index + 1}
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    {getFieldIcon(field.type)}
                    <span className="ml-1 capitalize">{field.type}</span>
                  </div>
                </div>
                
                <FormFieldPreview
                  field={field}
                  value={values[field.id] || ''}
                  onChange={(value) => handleValueChange(field.id, value)}
                  error={errors[field.id] || ''}
                />
                
                {/* Texto de contexto */}
                <div className="mt-2 text-xs text-gray-500 italic">
                  {getFieldContext(field)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pie de formulario */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-gray-600">
              <p>Al enviar este formulario, confirma que toda la información proporcionada es correcta y autoriza a nuestro equipo médico a utilizarla para su atención.</p>
            </div>
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={onBack}
                type="button"
              >
                Volver al editor
              </Button>
              
              <Button
                variant="primary"
                type="submit"
                className="px-8"
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