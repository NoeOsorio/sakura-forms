import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { title: 'Formularios Creados', value: 24, icon: '📝', color: 'bg-blue-100 text-blue-800' },
    { title: 'Pacientes Registrados', value: 142, icon: '👥', color: 'bg-green-100 text-green-800' },
    { title: 'Respuestas Recibidas', value: 304, icon: '📊', color: 'bg-purple-100 text-purple-800' },
    { title: 'Formularios Activos', value: 12, icon: '✅', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const recentForms = [
    { id: 1, name: 'Evaluación inicial', responses: 15, lastActive: '2023-06-10' },
    { id: 2, name: 'Seguimiento mensual', responses: 42, lastActive: '2023-06-15' },
    { id: 3, name: 'Satisfacción del paciente', responses: 78, lastActive: '2023-06-18' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Button>Crear Nuevo Formulario</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="flex items-center">
            <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Forms */}
      <Card title="Formularios Recientes">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-3 font-medium text-gray-500">Nombre</th>
                <th className="text-left pb-3 font-medium text-gray-500">Respuestas</th>
                <th className="text-left pb-3 font-medium text-gray-500">Última Actividad</th>
                <th className="text-right pb-3 font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentForms.map((form) => (
                <tr key={form.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{form.name}</td>
                  <td className="py-3">{form.responses}</td>
                  <td className="py-3">{form.lastActive}</td>
                  <td className="py-3 text-right">
                    <Button variant="outline" className="mr-2">Ver</Button>
                    <Button variant="secondary">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Actividad Reciente">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">●</span>
              <div>
                <p className="text-gray-800">Nuevo formulario creado: <span className="font-medium">Evaluación Nutricional</span></p>
                <p className="text-sm text-gray-500">Hace 2 horas</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">●</span>
              <div>
                <p className="text-gray-800">15 nuevas respuestas: <span className="font-medium">Formulario de Satisfacción</span></p>
                <p className="text-sm text-gray-500">Hace 3 horas</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">●</span>
              <div>
                <p className="text-gray-800">Paciente agregado: <span className="font-medium">María Rodríguez</span></p>
                <p className="text-sm text-gray-500">Hace 1 día</p>
              </div>
            </li>
          </ul>
        </Card>

        <Card title="Acciones Rápidas">
          <div className="space-y-3">
            <Button className="w-full justify-start">
              <span className="mr-2">✨</span> Crear Nuevo Formulario
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <span className="mr-2">👤</span> Agregar Paciente
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📋</span> Ver Todos los Formularios
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📊</span> Ver Estadísticas
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 