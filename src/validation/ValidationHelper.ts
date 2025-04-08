import { FormField } from '../types/form';

/**
 * Valida un campo de formulario
 * @param field El campo a validar
 * @param value El valor a validar
 * @returns Un mensaje de error o null si es válido
 */
export const validateField = (field: FormField, value: string): string | null => {
  // Validar campo requerido
  if (field.required && (!value || value.trim() === '')) {
    return 'Este campo es obligatorio';
  }
  
  // Si el campo no es requerido y está vacío, es válido
  if (!value || value.trim() === '') {
    return null;
  }
  
  // Validar formato según el tipo
  switch (field.type) {
    case 'email':
      // Validación básica de email
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        return 'Por favor, ingrese un email válido';
      }
      break;
      
    case 'tel':
      // Validación básica de teléfono (solo números y algunos caracteres especiales)
      if (!/^[0-9+\-\s()]*$/.test(value)) {
        return 'Por favor, ingrese un número de teléfono válido';
      }
      break;
      
    case 'number':
      // Validar que sea un número
      if (isNaN(Number(value))) {
        return 'Por favor, ingrese un número válido';
      }
      break;
      
    case 'date': {
      // Validar formato de fecha
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return 'Por favor, ingrese una fecha válida';
      }
      break;
    }
  }
  
  return null;
};

/**
 * Obtiene un mensaje de error predeterminado para un tipo de campo
 * @param type El tipo de campo
 * @returns Un mensaje de error predeterminado
 */
export const getDefaultErrorMessage = (type: string): string => {
  switch (type) {
    case 'email':
      return 'Por favor, ingrese un email válido';
    case 'tel':
      return 'Por favor, ingrese un número de teléfono válido';
    case 'number':
      return 'Por favor, ingrese un número válido';
    case 'date':
      return 'Por favor, ingrese una fecha válida';
    default:
      return 'Este campo es obligatorio';
  }
}; 