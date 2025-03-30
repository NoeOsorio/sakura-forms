
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', icon: '📊', path: '/' },
    { name: 'Formularios', icon: '📝', path: '/forms' },
    { name: 'Pacientes', icon: '👥', path: '/patients' },
    { name: 'Analítica', icon: '📈', path: '/analytics' },
    { name: 'Configuración', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className={`h-full fixed left-0 top-0 z-30 bg-teal-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} shadow-lg`}>
      <div className="flex items-center justify-between p-4 border-b border-teal-100">
        <div className={`flex items-center ${!isOpen && 'justify-center w-full'}`}>
          <span className="text-teal-600 text-2xl font-bold">
            {isOpen ? 'Sakura' : 'S'}
          </span>
        </div>
        <button 
          onClick={toggleSidebar} 
          className={`text-teal-600 ${!isOpen && 'hidden'}`}
        >
          ◀
        </button>
      </div>
      
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a 
                href={item.path} 
                className="flex items-center p-4 hover:bg-teal-100 transition-colors text-teal-800"
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="ml-4">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 