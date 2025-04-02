import { useState } from 'react';

export interface Form {
  id: number;
  title: string;
  responses: number;
  lastResponse: string;
}

export interface Response {
  id: number;
  formId: number;
  name: string;
  email: string;
  date: string;
  status: 'Completado' | 'Parcial';
}

// Mock data - Esto debería moverse a un servicio/API en el futuro
const mockForms: Form[] = [
  { 
    id: 1, 
    title: 'Formulario de Contacto', 
    responses: 23, 
    lastResponse: '2023-06-15'
  },
  { 
    id: 2, 
    title: 'Encuesta de Satisfacción', 
    responses: 45, 
    lastResponse: '2023-06-12'
  },
  { 
    id: 3, 
    title: 'Registro de Pacientes', 
    responses: 12, 
    lastResponse: '2023-06-08'
  },
];

const mockResponses: Response[] = [
  { id: 1, formId: 1, name: 'Juan Pérez', email: 'juan@example.com', date: '2023-06-15', status: 'Completado' },
  { id: 2, formId: 1, name: 'María González', email: 'maria@example.com', date: '2023-06-14', status: 'Completado' },
  { id: 3, formId: 1, name: 'Carlos Rodríguez', email: 'carlos@example.com', date: '2023-06-13', status: 'Parcial' },
  { id: 4, formId: 2, name: 'Ana López', email: 'ana@example.com', date: '2023-06-12', status: 'Completado' },
  { id: 5, formId: 2, name: 'Pedro Martínez', email: 'pedro@example.com', date: '2023-06-11', status: 'Completado' },
  { id: 6, formId: 3, name: 'Laura Sánchez', email: 'laura@example.com', date: '2023-06-08', status: 'Completado' },
];

export const useResponses = () => {
  const [forms] = useState<Form[]>(mockForms);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResponses = mockResponses.filter(response => 
    (selectedFormId === null || response.formId === selectedFormId) &&
    (searchTerm === '' || 
     response.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     response.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const clearFilters = () => {
    setSelectedFormId(null);
    setSearchTerm('');
  };

  return {
    forms,
    selectedFormId,
    setSelectedFormId,
    searchTerm,
    setSearchTerm,
    responses: filteredResponses,
    clearFilters,
  };
}; 