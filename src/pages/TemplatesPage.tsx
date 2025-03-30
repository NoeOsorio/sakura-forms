import { useState } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  fields: number;
  thumbnail: string;
}

const TemplatesPage = () => {
  const [templates] = useState<Template[]>([
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
  ]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Plantillas de Formularios</h1>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar plantillas..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? 'primary' : 'outline'} 
              onClick={() => setSelectedCategory(null)}
              className="text-sm"
            >
              Todas
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <Card key={template.id} className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="text-5xl mr-4">{template.thumbnail}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{template.title}</h3>
                  <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{template.fields} campos</span>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => window.location.href = `/templates/${template.id}/preview`}>
                    Vista Previa
                  </Button>
                  <Button onClick={() => window.location.href = `/templates/${template.id}/use`}>
                    Usar
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p className="text-xl mb-2">No se encontraron plantillas</p>
            <p>Intenta con otros términos de búsqueda o categorías.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage; 