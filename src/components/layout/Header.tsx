interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  title?: string;
}

const Header = ({ isOpen, toggleSidebar, title = 'Dashboard' }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 z-20" style={{ left: isOpen ? '16rem' : '5rem' }}>
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-4 text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-50"
        >
          {isOpen ? '▶' : '◀'}
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-teal-600 relative">
          🔔
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-semibold">
            UN
          </div>
          <span className="ml-2 text-gray-700 hidden md:inline">Usuario</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 