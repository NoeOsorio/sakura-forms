import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  title?: string;
}

const Header = ({ isOpen, toggleSidebar, title = 'Dashboard' }: HeaderProps) => {
  const { user, signOut } = useAuth()
  const [imageError, setImageError] = useState(false)
  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : ''
  const userImage = !imageError ? (user?.user_metadata?.picture || user?.user_metadata?.avatar_url) : null
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Usuario'

  const handleImageError = () => {
    setImageError(true)
  }

  const renderAvatar = () => {
    if (userImage) {
      return (
        <img 
          src={userImage} 
          alt="Profile" 
          className="w-8 h-8 rounded-full object-cover"
          onError={handleImageError}
        />
      )
    }

    return (
      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium text-sm">
        {userInitials}
      </div>
    )
  }

  return (
    <header className="bg-white border-b h-14 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          aria-label="Abrir menú"
        >
          {!isOpen && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
        
        {title && (
          <h1 className="ml-4 text-lg font-medium text-gray-800">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 18C11.1046 18 12 17.1046 12 16H8C8 17.1046 8.89543 18 10 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <Link 
          to="/profile" 
          className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1"
        >
          {renderAvatar()}
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {userName}
          </span>
        </Link>

        <button
          onClick={() => signOut()}
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span className="hidden md:inline text-sm font-medium">
            Cerrar sesión
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header; 