import { Link } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { name: 'Inicio', icon: HomeIcon, path: '/' },
    { name: 'Mis Formularios', icon: DocumentTextIcon, path: '/forms' },
    { name: 'Respuestas', icon: ChartBarIcon, path: '/responses' },
    { name: 'Plantillas', icon: DocumentDuplicateIcon, path: '/templates' },
    { name: 'Configuración', icon: Cog6ToothIcon, path: '/settings' },
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
          className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Cerrar menú"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name} className="px-3">
              <Link 
                to={item.path} 
                className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium group"
                onClick={toggleSidebar}
              >
                <item.icon className="w-5 h-5 mr-3 text-teal-600 group-hover:text-teal-700 transition-colors" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar; 