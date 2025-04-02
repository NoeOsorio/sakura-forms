import { Routes, Route, useLocation } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import FormsPage from './pages/FormsPage'
import FormBuilderPage from './pages/FormBuilderPage'
import EditFormPage from './pages/EditFormPage'
import SettingsPage from './pages/SettingsPage'
import ResponsesPage from './pages/ResponsesPage'
import ResponseViewPage from './pages/ResponseViewPage'
import TemplatesPage from './pages/TemplatesPage'
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
    if (path.startsWith('/responses/')) return 'Ver Respuesta'
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
        <Route path="/forms/edit/:formId" element={<EditFormPage />} />
        <Route path="/responses" element={<ResponsesPage />} />
        <Route path="/responses/:responseId" element={<ResponseViewPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/templates/:templateId/use" element={<FormBuilderPage isNew={true} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<div className="p-6 text-center">Página no encontrada</div>} />
      </Routes>
    </MainLayout>
  )
}

export default App
