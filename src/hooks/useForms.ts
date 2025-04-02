import { useState } from 'react';

export interface Form {
  id: number;
  title: string;
  description: string;
  responseCount: number;
  lastUpdated: string;
  isActive: boolean;
}

// Mock data - Esto debería moverse a un servicio/API en el futuro
const mockForms: Form[] = [
  {
    id: 1,
    title: 'Evaluación inicial de paciente',
    description: 'Formulario completo para la primera consulta con datos generales y antecedentes médicos.',
    responseCount: 45,
    lastUpdated: '2023-06-10',
    isActive: true,
  },
  {
    id: 2,
    title: 'Seguimiento mensual de tratamiento',
    description: 'Formulario para registrar la evolución del paciente durante su tratamiento.',
    responseCount: 128,
    lastUpdated: '2023-06-15',
    isActive: true,
  },
  {
    id: 3,
    title: 'Encuesta de satisfacción',
    description: 'Formulario para evaluar la satisfacción del paciente con el servicio recibido.',
    responseCount: 87,
    lastUpdated: '2023-06-12',
    isActive: true,
  },
  {
    id: 4,
    title: 'Evaluación de dolor crónico',
    description: 'Formulario especializado para pacientes con dolor crónico.',
    responseCount: 32,
    lastUpdated: '2023-06-08',
    isActive: false,
  },
  {
    id: 5,
    title: 'Historia clínica wellness',
    description: 'Formulario completo para registrar historial de salud y bienestar.',
    responseCount: 18,
    lastUpdated: '2023-06-05',
    isActive: true,
  },
];

export const useForms = () => {
  const [forms] = useState<Form[]>(mockForms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === null || form.isActive === filterActive;
    return matchesSearch && matchesFilter;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterActive(null);
  };

  return {
    forms: filteredForms,
    searchTerm,
    setSearchTerm,
    filterActive,
    setFilterActive,
    clearFilters,
  };
}; 