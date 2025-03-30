import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { name: 'Inicio', icon: '🏠', path: '/' },
    { name: 'Mis Formularios', icon: '📝', path: '/forms' },
    { name: 'Respuestas', icon: '📊', path: '/responses' },
    { name: 'Plantillas', icon: '📋', path: '/templates' },
    { name: 'Configuración', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out w-72 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <span className="text-teal-600 text-2xl font-bold">Sakura</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name} className="px-3">
              <Link 
                to={item.path} 
                className="flex items-center py-3 px-4 rounded-md hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                onClick={toggleSidebar}
              >
                <span className="text-xl mr-3 text-teal-600">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold">
            U
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-700">Usuario</p>
            <p className="text-xs text-gray-500">usuario@ejemplo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 