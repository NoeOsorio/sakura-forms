import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '16rem' : '5rem' }}
      >
        <Header 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          title={title}
        />
        
        <main className="flex-1 p-6 mt-16 overflow-auto">
          {children}
        </main>
        
        <footer className="py-4 px-6 text-center text-gray-500 text-sm border-t">
          Sakura Forms © {new Date().getFullYear()} - Plataforma de formularios para salud y bienestar
        </footer>
      </div>
    </div>
  );
};

export default MainLayout; 