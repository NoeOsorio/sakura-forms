import { useState } from 'react';

export interface RecentForm {
  id: number;
  title: string;
  responses: number;
  lastUpdated: string;
}

// Mock data - Esto debería moverse a un servicio/API en el futuro
const mockRecentForms: RecentForm[] = [
  { id: 1, title: 'Formulario de Contacto', responses: 23, lastUpdated: '2023-06-15' },
  { id: 2, title: 'Encuesta de Satisfacción', responses: 45, lastUpdated: '2023-06-12' },
  { id: 3, title: 'Registro de Pacientes', responses: 12, lastUpdated: '2023-06-08' },
];

export const useRecentForms = () => {
  const [recentForms] = useState<RecentForm[]>(mockRecentForms);

  return {
    recentForms,
  };
}; 