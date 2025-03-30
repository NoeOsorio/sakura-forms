import { Routes, Route, useLocation } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import FormsPage from './pages/FormsPage'
import FormBuilderPage from './pages/FormBuilderPage'
import './App.css'

function App() {
  const location = useLocation()
  
  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname
    
    if (path === '/') return 'Inicio'
    if (path === '/forms') return 'Mis Formularios'
    if (path.startsWith('/forms/new')) return 'Crear Formulario'
    if (path.startsWith('/forms/edit/')) return 'Editar Formulario'
    if (path === '/responses') return 'Respuestas'
    if (path === '/templates') return 'Plantillas'
    if (path === '/settings') return 'Configuración'
    
    return 'Sakura Forms'
  }

  return (
    <MainLayout title={getPageTitle()}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/forms/new" element={<FormBuilderPage isNew={true} />} />
        <Route path="/forms/edit/:formId" element={<FormBuilderPage isNew={false} />} />
        <Route path="/responses" element={<div className="p-6">Página de respuestas en desarrollo</div>} />
        <Route path="/responses/:formId" element={<div className="p-6">Respuestas para formulario específico</div>} />
        <Route path="/templates" element={<div className="p-6">Página de plantillas en desarrollo</div>} />
        <Route path="/templates/:templateId/use" element={<FormBuilderPage isNew={true} />} />
        <Route path="/settings" element={<div className="p-6">Configuración de la cuenta y preferencias</div>} />
        <Route path="*" element={<div className="p-6 text-center">Página no encontrada</div>} />
      </Routes>
    </MainLayout>
  )
}

export default App
