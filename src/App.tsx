import { Routes, Route, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './features/auth/AuthProvider'
import { LoginPage } from './features/auth/LoginPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { AuthCallbackPage } from './features/auth/AuthCallbackPage'
import { ProfilePage } from './features/auth/ProfilePage'
import MainLayout from './components/layout/MainLayout'
import { ProtectedRoute } from './features/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import FormsPage from './pages/FormsPage'
import { MedicalFormBuilder } from './components/forms'
import TemplatesPage from './pages/TemplatesPage'
import SettingsPage from './pages/SettingsPage'
import FormViewPage from './pages/FormViewPage'
import './App.css'
import ResponsesPage from './pages/ResponsesPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout><Outlet /></MainLayout>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/forms" element={<FormsPage />} />
              <Route path="/forms/new" element={<MedicalFormBuilder />} />
              <Route path="/forms/:id" element={<MedicalFormBuilder />} />
              <Route path="/forms/view/:id" element={<FormViewPage />} />
              <Route path="/responses" element={<ResponsesPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
