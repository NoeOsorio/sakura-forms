import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import SearchBar from '../components/shared/SearchBar';
import FormsSidebar from '../components/responses/FormsSidebar';
import ResponsesTable from '../components/responses/ResponsesTable';
import { useResponses } from '../hooks/useResponses';

const ResponsesPage = () => {
  const {
    forms,
    selectedFormId,
    setSelectedFormId,
    searchTerm,
    setSearchTerm,
    responses,
  } = useResponses();

  const handleViewDetails = (responseId: number) => {
    console.log(`Ver detalles de respuesta ${responseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Respuestas de Formularios</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FormsSidebar
            forms={forms}
            selectedFormId={selectedFormId}
            onFormSelect={setSelectedFormId}
          />
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
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar respuestas..."
                  />
                  
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
                    <ResponsesTable
                      responses={responses}
                      forms={forms}
                      selectedFormId={selectedFormId}
                      onViewDetails={handleViewDetails}
                    />
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