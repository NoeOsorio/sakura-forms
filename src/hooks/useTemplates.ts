import { useState } from 'react';

export interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  fields: number;
  thumbnail: string;
}

// Mock data - Esto debería moverse a un servicio/API en el futuro
const mockTemplates: Template[] = [
  {
    id: 1,
    title: 'Formulario de Contacto',
    description: 'Formulario básico para recopilar información de contacto de tus usuarios o clientes.',
    category: 'Contacto',
    fields: 5,
    thumbnail: '📞'
  },
  {
    id: 2,
    title: 'Encuesta de Satisfacción',
    description: 'Plantilla para medir la satisfacción de tus clientes después de usar tus servicios.',
    category: 'Encuestas',
    fields: 8,
    thumbnail: '⭐'
  },
  {
    id: 3,
    title: 'Historial Médico',
    description: 'Formulario completo para registrar el historial médico de pacientes.',
    category: 'Salud',
    fields: 15,
    thumbnail: '🏥'
  },
  {
    id: 4,
    title: 'Evaluación de Dolor',
    description: 'Formulario especializado para evaluar el nivel y tipo de dolor en pacientes.',
    category: 'Salud',
    fields: 10,
    thumbnail: '🩺'
  },
  {
    id: 5,
    title: 'Registro de Citas',
    description: 'Formulario para que los pacientes soliciten y programen citas.',
    category: 'Reservas',
    fields: 7,
    thumbnail: '📅'
  },
  {
    id: 6,
    title: 'Evaluación Fitness',
    description: 'Plantilla para evaluar el estado físico y objetivos de entrenamiento.',
    category: 'Wellness',
    fields: 12,
    thumbnail: '💪'
  },
];

export const useTemplates = () => {
  const [templates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(templates.map(t => t.category)));

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => 
    (selectedCategory === null || template.category === selectedCategory) &&
    (searchTerm === '' || 
     template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     template.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return {
    templates: filteredTemplates,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
  };
}; 