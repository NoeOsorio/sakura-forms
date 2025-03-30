import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button';

const HomePage = () => {
  const [recentForms] = useState([
    { id: 1, title: 'Formulario de Contacto', responses: 23, lastUpdated: '2023-06-15' },
    { id: 2, title: 'Encuesta de Satisfacción', responses: 45, lastUpdated: '2023-06-12' },
    { id: 3, title: 'Registro de Pacientes', responses: 12, lastUpdated: '2023-06-08' },
  ]);

  return (
    <div>
      {/* Hero section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Crea formularios interactivos con facilidad</h1>
          <p className="text-xl mb-8 opacity-90">
            Diseña formularios dinámicos y profesionales, recopila respuestas y analiza resultados al instante.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/forms/new">
              <Button 
                className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-medium"
              >
                Crear Nuevo Formulario
              </Button>
            </Link>
            <Link to="/templates">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-medium"
              >
                Usar plantilla
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-2xl mx-auto mb-4">
                ✨
              </div>
              <h2 className="text-xl font-semibold mb-3">Diseño sin código</h2>
              <p className="text-gray-600">
                Crea formularios profesionales con una interfaz intuitiva de arrastrar y soltar.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mx-auto mb-4">
                📊
              </div>
              <h2 className="text-xl font-semibold mb-3">Análisis instantáneo</h2>
              <p className="text-gray-600">
                Visualiza y analiza las respuestas con gráficos y estadísticas en tiempo real.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mx-auto mb-4">
                🔌
              </div>
              <h2 className="text-xl font-semibold mb-3">Integración API</h2>
              <p className="text-gray-600">
                Conecta tus formularios con otras aplicaciones mediante nuestra API REST.
              </p>
            </div>
          </div>
          
          {/* Recent forms */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Tus formularios recientes</h2>
              <Link to="/forms">
                <Button variant="outline">
                  Ver todos
                </Button>
              </Link>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
              {recentForms.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-4 px-6 font-medium text-gray-600">Título</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-600">Respuestas</th>
                        <th className="text-center py-4 px-6 font-medium text-gray-600">Última Actualización</th>
                        <th className="text-right py-4 px-6 font-medium text-gray-600">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentForms.map((form) => (
                        <tr key={form.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium">{form.title}</td>
                          <td className="py-4 px-6 text-center">{form.responses}</td>
                          <td className="py-4 px-6 text-center text-gray-500">{form.lastUpdated}</td>
                          <td className="py-4 px-6 text-right">
                            <Link to={`/forms/edit/${form.id}`} className="mr-2">
                              <Button variant="outline">
                                Editar
                              </Button>
                            </Link>
                            <Link to={`/responses/${form.id}`}>
                              <Button variant="secondary">
                                Ver Respuestas
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-10 text-center text-gray-500">
                  <p className="mb-4">No tienes formularios recientes</p>
                  <Link to="/forms/new">
                    <Button>
                      Crear tu primer formulario
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a miles de usuarios que ya están creando formularios interactivos con nuestra plataforma.
            </p>
            <Link to="/forms/new">
              <Button className="px-8 py-3 text-lg">
                Crear tu formulario ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 