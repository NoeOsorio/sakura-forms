import { useState } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const ResponsesPage = () => {
  const [forms] = useState([
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
  ]);
  
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock form responses
  const mockResponses = [
    { id: 1, formId: 1, name: 'Juan Pérez', email: 'juan@example.com', date: '2023-06-15', status: 'Completado' },
    { id: 2, formId: 1, name: 'María González', email: 'maria@example.com', date: '2023-06-14', status: 'Completado' },
    { id: 3, formId: 1, name: 'Carlos Rodríguez', email: 'carlos@example.com', date: '2023-06-13', status: 'Parcial' },
    { id: 4, formId: 2, name: 'Ana López', email: 'ana@example.com', date: '2023-06-12', status: 'Completado' },
    { id: 5, formId: 2, name: 'Pedro Martínez', email: 'pedro@example.com', date: '2023-06-11', status: 'Completado' },
    { id: 6, formId: 3, name: 'Laura Sánchez', email: 'laura@example.com', date: '2023-06-08', status: 'Completado' },
  ];
  
  // Filter responses based on selected form and search term
  const filteredResponses = mockResponses.filter(response => 
    (selectedFormId === null || response.formId === selectedFormId) &&
    (searchTerm === '' || 
     response.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     response.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Respuestas de Formularios</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Formularios</h2>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md ${selectedFormId === null ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedFormId(null)}
                >
                  Todos los formularios
                </button>
              </li>
              {forms.map(form => (
                <li key={form.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md ${selectedFormId === form.id ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedFormId(form.id)}
                  >
                    <div className="font-medium">{form.title}</div>
                    <div className="text-sm text-gray-500">{form.responses} respuestas</div>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {selectedFormId 
                    ? `Respuestas: ${forms.find(f => f.id === selectedFormId)?.title}` 
                    : 'Todas las respuestas'}
                </h2>
                
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar respuestas..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                  </div>
                  
                  <Button variant="outline">
                    Exportar CSV
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-3 font-medium text-gray-500">ID</th>
                      {selectedFormId === null && (
                        <th className="text-left pb-3 font-medium text-gray-500">Formulario</th>
                      )}
                      <th className="text-left pb-3 font-medium text-gray-500">Nombre</th>
                      <th className="text-left pb-3 font-medium text-gray-500">Email</th>
                      <th className="text-left pb-3 font-medium text-gray-500">Fecha</th>
                      <th className="text-left pb-3 font-medium text-gray-500">Estado</th>
                      <th className="text-right pb-3 font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResponses.length > 0 ? (
                      filteredResponses.map((response) => (
                        <tr key={response.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">{response.id}</td>
                          {selectedFormId === null && (
                            <td className="py-3">
                              {forms.find(f => f.id === response.formId)?.title}
                            </td>
                          )}
                          <td className="py-3">{response.name}</td>
                          <td className="py-3">{response.email}</td>
                          <td className="py-3">{response.date}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              response.status === 'Completado' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {response.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <Button variant="outline" className="text-sm px-3 py-1.5">
                              Ver Detalles
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={selectedFormId === null ? 7 : 6} className="py-4 text-center text-gray-500">
                          No se encontraron respuestas con los filtros actuales.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResponsesPage; 