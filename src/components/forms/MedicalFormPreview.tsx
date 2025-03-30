import React, { useState } from 'react';
import { FormField } from '../../types';
import FormInput from './FormInput';
import Button from '../shared/Button';
import { validateField } from '../../validation/ValidationHelper';

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
      default:
        return '';
    }
  };
  
  // Obtener icono para el tipo de campo
  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'textarea':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'date':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'select':
      case 'radio':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
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
                
                <FormInput
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
                className="px-6 py-3"
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