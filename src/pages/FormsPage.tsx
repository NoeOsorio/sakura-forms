import { useState } from 'react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import FormCard from '../components/forms/FormCard';

// Props for the FormsPage component
interface FormsPageProps {
  onCreateForm?: () => void;
}

// Mock data
const mockForms = [
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

const FormsPage = ({ onCreateForm }: FormsPageProps) => {
  const [forms] = useState(mockForms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  const handleView = (id: number) => {
    console.log(`Ver formulario ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Editar formulario ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar formulario ${id}`);
  };

  // Filter forms based on search and active filter
  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === null || form.isActive === filterActive;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Formularios</h1>
        <Button onClick={onCreateForm}>Crear Nuevo Formulario</Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Buscar formularios..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={filterActive === null ? 'primary' : 'outline'} 
              onClick={() => setFilterActive(null)}
              className="text-sm px-3"
            >
              Todos
            </Button>
            <Button 
              variant={filterActive === true ? 'primary' : 'outline'} 
              onClick={() => setFilterActive(true)}
              className="text-sm px-3"
            >
              Activos
            </Button>
            <Button 
              variant={filterActive === false ? 'primary' : 'outline'} 
              onClick={() => setFilterActive(false)}
              className="text-sm px-3"
            >
              Inactivos
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.length > 0 ? (
          filteredForms.map((form) => (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
              responseCount={form.responseCount}
              lastUpdated={form.lastUpdated}
              isActive={form.isActive}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron formularios con los filtros actuales.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearchTerm(''); setFilterActive(null); }}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsPage; 