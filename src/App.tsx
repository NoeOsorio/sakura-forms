import { useState, useEffect } from 'react'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import FormsPage from './pages/FormsPage'
import FormBuilderPage from './pages/FormBuilderPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'forms' | 'form-builder' | 'patients' | 'analytics' | 'settings'>('dashboard')
  
  // Added state to track if we should create a new form
  const [isCreatingForm, setIsCreatingForm] = useState(false)

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard'
      case 'forms': return 'Formularios'
      case 'form-builder': return isCreatingForm ? 'Crear Formulario' : 'Editar Formulario'
      case 'patients': return 'Pacientes'
      case 'analytics': return 'Analítica'
      case 'settings': return 'Configuración'
      default: return 'Dashboard'
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />
      case 'forms': return <FormsPage onCreateForm={() => { setCurrentPage('form-builder'); setIsCreatingForm(true) }} />
      case 'form-builder': return <FormBuilderPage />
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
        setIsCreatingForm(false)
        break
      case '/forms/new':
        setCurrentPage('form-builder')
        setIsCreatingForm(true)
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
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        e.preventDefault()
        handleNavigation(anchor.getAttribute('href') || '/')
      }
    }
    
    document.addEventListener('click', handleClick)
    
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <MainLayout title={getPageTitle()}>
      {renderPage()}
    </MainLayout>
  )
}

export default App
