import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleSidebar = () => {
    setIsTransitioning(true);
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Apply transition effects
    const transitionDuration = 300; // ms, match with CSS transition duration
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sidebar overlay with blur effect when open */}
      {(sidebarOpen || isTransitioning) && (
        <div 
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Header fixed at top */}
      <Header 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        title={title}
      />
      
      {/* Main content area with natural page scroll */}
      <main className="flex-1 mt-14 bg-white">
        {children}
      </main>
      
      <footer className="py-4 px-6 text-center text-gray-500 text-sm border-t">
        Sakura Forms © {new Date().getFullYear()} - Plataforma de formularios para salud y bienestar
      </footer>
    </div>
  );
};

export default MainLayout; 