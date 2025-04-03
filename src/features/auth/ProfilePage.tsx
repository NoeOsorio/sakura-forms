import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function ProfilePage() {
  const { user } = useAuth()
  const [imageError, setImageError] = useState(false)
  const userImage = !imageError ? (user?.user_metadata?.picture || user?.user_metadata?.avatar_url) : null
  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : ''
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Usuario'

  const handleImageError = () => {
    setImageError(true)
  }

  const renderAvatar = () => {
    if (userImage) {
      return (
        <img
          src={userImage}
          alt="Avatar"
          className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
          onError={handleImageError}
        />
      )
    }

    return (
      <div className="h-24 w-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
        <span className="text-3xl font-medium text-teal-600">
          {userInitials}
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header con avatar grande */}
          <div className="relative h-32 bg-gradient-to-r from-teal-500 to-teal-600">
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              {renderAvatar()}
            </div>
          </div>

          {/* Contenido del perfil */}
          <div className="pt-16 pb-8 px-6 sm:px-8">
            <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">
              {userName}
            </h3>

            <div className="max-w-xl mx-auto space-y-6">
              {/* Email */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">
                    Email
                  </p>
                  <p className="text-base text-gray-900 break-all">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Nombre */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">
                    Nombre
                  </p>
                  <p className="text-base text-gray-900">
                    {userName}
                  </p>
                </div>
              </div>

              {/* Proveedor de autenticación */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">
                    Proveedor de autenticación
                  </p>
                  <p className="text-base text-gray-900 capitalize">
                    {user?.app_metadata?.provider || 'Email y contraseña'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 