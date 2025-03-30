import { useState } from 'react'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import FormsPage from './pages/FormsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'forms' | 'patients' | 'analytics' | 'settings'>('dashboard')

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard'
      case 'forms': return 'Formularios'
      case 'patients': return 'Pacientes'
      case 'analytics': return 'Analítica'
      case 'settings': return 'Configuración'
      default: return 'Dashboard'
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />
      case 'forms': return <FormsPage />
      case 'patients': return <div className="p-6">Página de pacientes en construcción</div>
      case 'analytics': return <div className="p-6">Página de analítica en construcción</div>
      case 'settings': return <div className="p-6">Página de configuración en construcción</div>
      default: return <Dashboard />
    }
  }

  // En una aplicación real usaríamos react-router-dom para las rutas
  // Aquí simulamos la navegación con estado
  const handleNavigation = (path: string) => {
    switch (path) {
      case '/':
        setCurrentPage('dashboard')
        break
      case '/forms':
        setCurrentPage('forms')
        break
      case '/patients':
        setCurrentPage('patients')
        break
      case '/analytics':
        setCurrentPage('analytics')
        break
      case '/settings':
        setCurrentPage('settings')
        break
      default:
        setCurrentPage('dashboard')
    }
  }

  // Sobreescribimos temporalmente los enlaces para simular navegación
  if (typeof window !== 'undefined') {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        e.preventDefault()
        handleNavigation(anchor.getAttribute('href') || '/')
      }
    })
  }

  return (
    <MainLayout title={getPageTitle()}>
      {renderPage()}
    </MainLayout>
  )
}

export default App
