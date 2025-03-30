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
  const [currentIndex, setCurrentIndex] = useState(0);
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
  
  const currentField = fields[currentIndex];
  const progress = ((currentIndex + 1) / fields.length) * 100;
  
  const handleValueChange = (value: string) => {
    setValues({ ...values, [currentField.id]: value });
    
    // Limpiar error si el valor es válido
    const error = validateField(currentField, value);
    if (!error) {
      const newErrors = { ...errors };
      delete newErrors[currentField.id];
      setErrors(newErrors);
    }
  };
  
  const handleNext = () => {
    // Validar el campo actual
    const value = values[currentField.id] || '';
    const error = validateField(currentField, value);
    
    if (error) {
      setErrors({ ...errors, [currentField.id]: error });
      return;
    }
    
    // Si es el último campo, completar el formulario
    if (currentIndex === fields.length - 1) {
      setIsSubmitted(true);
      return;
    }
    
    // Avanzar al siguiente campo
    setCurrentIndex(currentIndex + 1);
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">¡Gracias!</h2>
        <p className="text-gray-600 mb-6">Tu información ha sido enviada correctamente.</p>
        <div className="py-4">
          <Button variant="primary" onClick={onComplete}>
            Finalizar
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      {/* Barra de progreso */}
      <div className="h-2 bg-gray-100 rounded-t-lg overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="p-8">
        {/* Título y descripción */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {/* Indicador de progreso */}
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <span>Pregunta {currentIndex + 1} de {fields.length}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        
        {/* Campo actual */}
        <div className="mb-8">
          <FormInput
            field={currentField}
            value={values[currentField.id] || ''}
            onChange={handleValueChange}
            error={errors[currentField.id] || ''}
          />
        </div>
        
        {/* Botones de navegación */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Anterior
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onBack}
            >
              Volver al editor
            </Button>
            
            <Button
              variant="primary"
              onClick={handleNext}
            >
              {currentIndex === fields.length - 1 ? 'Enviar' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalFormPreview; 