import { useResponseViewer } from '../hooks/useResponseViewer';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import ResponseStatus from '../components/responses/ResponseStatus';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ResponseViewPage = () => {
  const {
    state,
    getResponseValue,
    getFormField,
    deleteResponse,
    exportAsPDF,
    printResponse,
  } = useResponseViewer();
  
  const { response, formFields, isLoading, error } = state;
  
  // Si estamos cargando, mostrar un indicador de carga
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando respuesta...</p>
        </div>
      </div>
    );
  }
  
  // Si hay un error, mostrar un mensaje de error
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Intentar nuevamente
          </Button>
        </div>
      </div>
    );
  }
  
  // Si no hay respuesta, mostrar un mensaje
  if (!response) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Respuesta no encontrada</h2>
          <p className="text-gray-600 mb-4">La respuesta que estás buscando no existe o ha sido eliminada.</p>
          <Button 
            variant="primary" 
            onClick={() => window.history.back()}
          >
            Volver atrás
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Cabecera */}
      <div className="py-4 px-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{response.formTitle}</h1>
            <p className="text-sm text-gray-500">
              Respuesta enviada el {format(new Date(response.submittedAt), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <ResponseStatus status={response.status} />
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
              >
                Volver
              </Button>
              <Button 
                variant="outline" 
                onClick={printResponse}
              >
                Imprimir
              </Button>
              <Button 
                variant="outline" 
                onClick={exportAsPDF}
              >
                Exportar PDF
              </Button>
              <Button 
                variant="danger" 
                onClick={deleteResponse}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="flex-1 overflow-auto py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-6">Detalles de la respuesta</h2>
            
            <div className="space-y-6">
              {formFields.map(field => {
                const value = getResponseValue(field.id);
                
                return (
                  <div key={field.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="font-medium text-gray-700 mb-1">{field.label}</h3>
                    
                    {value === null ? (
                      <p className="text-gray-400 italic">Sin respuesta</p>
                    ) : (
                      <div className="text-gray-800">
                        {Array.isArray(value) ? (
                          <ul className="list-disc pl-5">
                            {value.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{value.toString()}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResponseViewPage; 