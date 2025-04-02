import { useState } from 'react';

export interface DashboardStat {
  title: string;
  value: number;
  icon: string;
  color: string;
}

export interface RecentForm {
  id: number;
  name: string;
  responses: number;
  lastActive: string;
}

export interface ActivityItem {
  id: number;
  type: 'form_created' | 'responses_received' | 'patient_added';
  message: string;
  detail: string;
  time: string;
  color: string;
}

// Mock data - Esto debería venir de una API en el futuro
const mockStats: DashboardStat[] = [
  { title: 'Formularios Creados', value: 24, icon: '📝', color: 'bg-blue-100 text-blue-800' },
  { title: 'Pacientes Registrados', value: 142, icon: '👥', color: 'bg-green-100 text-green-800' },
  { title: 'Respuestas Recibidas', value: 304, icon: '📊', color: 'bg-purple-100 text-purple-800' },
  { title: 'Formularios Activos', value: 12, icon: '✅', color: 'bg-yellow-100 text-yellow-800' },
];

const mockRecentForms: RecentForm[] = [
  { id: 1, name: 'Evaluación inicial', responses: 15, lastActive: '2023-06-10' },
  { id: 2, name: 'Seguimiento mensual', responses: 42, lastActive: '2023-06-15' },
  { id: 3, name: 'Satisfacción del paciente', responses: 78, lastActive: '2023-06-18' },
];

const mockActivity: ActivityItem[] = [
  {
    id: 1,
    type: 'form_created',
    message: 'Nuevo formulario creado',
    detail: 'Evaluación Nutricional',
    time: 'Hace 2 horas',
    color: 'text-blue-500',
  },
  {
    id: 2,
    type: 'responses_received',
    message: '15 nuevas respuestas',
    detail: 'Formulario de Satisfacción',
    time: 'Hace 3 horas',
    color: 'text-green-500',
  },
  {
    id: 3,
    type: 'patient_added',
    message: 'Paciente agregado',
    detail: 'María Rodríguez',
    time: 'Hace 1 día',
    color: 'text-purple-500',
  },
];

export const useDashboard = () => {
  const [stats] = useState<DashboardStat[]>(mockStats);
  const [recentForms] = useState<RecentForm[]>(mockRecentForms);
  const [activity] = useState<ActivityItem[]>(mockActivity);

  const handleViewForm = (formId: number) => {
    console.log('Ver formulario:', formId);
    // Implementar navegación al formulario
  };

  const handleEditForm = (formId: number) => {
    console.log('Editar formulario:', formId);
    // Implementar navegación a la edición del formulario
  };

  const handleQuickAction = (action: string) => {
    console.log('Acción rápida:', action);
    // Implementar acciones rápidas
  };

  return {
    stats,
    recentForms,
    activity,
    handleViewForm,
    handleEditForm,
    handleQuickAction,
  };
}; 