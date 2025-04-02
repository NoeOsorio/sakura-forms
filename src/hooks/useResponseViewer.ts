import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormField } from '../types';

interface ResponseValue {
  fieldId: number;
  value: string | string[] | number | boolean | null;
}

interface Response {
  id: string;
  formId: string;
  formTitle: string;
  submittedAt: string;
  status: 'completed' | 'in_progress' | 'pending';
  values: ResponseValue[];
}

interface ResponseViewerState {
  response: Response | null;
  formFields: FormField[];
  isLoading: boolean;
  error: string | null;
}

export const useResponseViewer = () => {
  const { responseId } = useParams<{ responseId: string }>();
  const navigate = useNavigate();
  
  const [state, setState] = useState<ResponseViewerState>({
    response: null,
    formFields: [],
    isLoading: true,
    error: null,
  });
  
  // Cargar la respuesta y los campos del formulario
  useEffect(() => {
    const loadResponse = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Aquí se haría la llamada a la API para obtener la respuesta
        // Por ahora usamos datos de ejemplo
        const mockResponse: Response = {
          id: responseId || '1',
          formId: '123',
          formTitle: 'Formulario de ejemplo',
          submittedAt: new Date().toISOString(),
          status: 'completed',
          values: [
            { fieldId: 1, value: 'Juan Pérez' },
            { fieldId: 2, value: 'juan@ejemplo.com' },
            { fieldId: 3, value: 'Tengo dolor de cabeza y fiebre desde hace 2 días.' },
          ],
        };
        
        const mockFormFields: FormField[] = [
          {
            id: 1,
            type: 'text',
            label: 'Nombre completo',
            placeholder: 'Ingrese su nombre completo',
            required: true,
            options: [],
          },
          {
            id: 2,
            type: 'email',
            label: 'Correo electrónico',
            placeholder: 'ejemplo@correo.com',
            required: true,
            options: [],
          },
          {
            id: 3,
            type: 'textarea',
            label: 'Descripción',
            placeholder: 'Describa su situación',
            required: false,
            options: [],
          },
        ];
        
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setState(prev => ({
          ...prev,
          response: mockResponse,
          formFields: mockFormFields,
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Error al cargar la respuesta. Por favor, intente nuevamente.',
        }));
        console.error('Error loading response:', error);
      }
    };
    
    if (responseId) {
      loadResponse();
    }
  }, [responseId]);
  
  // Obtener el valor de respuesta para un campo específico
  const getResponseValue = (fieldId: number): string | string[] | number | boolean | null => {
    if (!state.response) return null;
    
    const responseValue = state.response.values.find(v => v.fieldId === fieldId);
    return responseValue ? responseValue.value : null;
  };
  
  // Obtener el campo del formulario para un ID específico
  const getFormField = (fieldId: number): FormField | undefined => {
    return state.formFields.find(f => f.id === fieldId);
  };
  
  // Eliminar la respuesta
  const deleteResponse = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Aquí se haría la llamada a la API para eliminar la respuesta
      // Por ahora simulamos un retraso de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Respuesta eliminada:', state.response?.id);
      
      // Navegar de vuelta a la lista de respuestas
      navigate('/responses');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error al eliminar la respuesta. Por favor, intente nuevamente.',
      }));
      console.error('Error deleting response:', error);
    }
  };
  
  // Exportar la respuesta como PDF
  const exportAsPDF = () => {
    console.log('Exportando como PDF:', state.response);
    // Aquí se implementaría la lógica para exportar como PDF
  };
  
  // Imprimir la respuesta
  const printResponse = () => {
    console.log('Imprimiendo respuesta:', state.response);
    window.print();
  };
  
  return {
    state,
    getResponseValue,
    getFormField,
    deleteResponse,
    exportAsPDF,
    printResponse,
  };
}; 