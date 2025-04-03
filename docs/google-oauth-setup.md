# Configuración de Google OAuth en Supabase

## Requisitos Previos

1. Tener un proyecto en Google Cloud Platform
2. Tener un proyecto en Supabase configurado
3. Tener acceso de administrador en ambos proyectos

## Configuración en Google Cloud Platform

1. Crear un nuevo proyecto o seleccionar uno existente en [Google Cloud Console](https://console.cloud.google.com/)

2. Habilitar la API de Google+:
   - Ir a "APIs & Services" > "Library"
   - Buscar "Google+ API"
   - Hacer clic en "Enable"

3. Configurar la pantalla de consentimiento:
   - Ir a "APIs & Services" > "OAuth consent screen"
   - Seleccionar "External" (para desarrollo) o "Internal" (para producción)
   - Completar la información requerida:
     - Nombre de la aplicación
     - Email de soporte
     - Logo (opcional)
     - Dominios autorizados
     - Scopes necesarios (email, profile)

4. Crear credenciales OAuth:
   - Ir a "APIs & Services" > "Credentials"
   - Hacer clic en "Create Credentials" > "OAuth client ID"
   - Seleccionar "Web application"
   - Configurar los URIs autorizados:
     - URI de redirección: `https://[project-ref].supabase.co/auth/v1/callback`
     - Orígenes autorizados: `https://[project-ref].supabase.co`

5. Copiar las credenciales:
   - Client ID
   - Client Secret

## Configuración en Supabase

1. Ir al panel de control de Supabase
2. Navegar a "Authentication" > "Providers"
3. Buscar "Google" y hacer clic en "Enable"
4. Pegar las credenciales:
   - Client ID
   - Client Secret
5. Guardar los cambios

## Configuración en la Aplicación

1. Asegurarse de que las variables de entorno estén configuradas:
```env
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

2. Verificar que el componente de autenticación esté configurado correctamente:
```typescript
const { signInWithGoogle } = useAuth();

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
  }
};
```

## Solución de Problemas Comunes

### Error: "redirect_uri_mismatch"
- Verificar que el URI de redirección en Google Cloud Console coincida exactamente con el de Supabase
- Asegurarse de que no haya espacios o caracteres especiales

### Error: "invalid_client"
- Verificar que el Client ID y Client Secret sean correctos
- Asegurarse de que las credenciales estén habilitadas

### Error: "access_denied"
- Verificar que el dominio esté autorizado en la pantalla de consentimiento
- Asegurarse de que el usuario tenga permiso para acceder a la aplicación

## Notas Importantes

1. Para desarrollo local, necesitarás configurar URIs adicionales:
   - `http://localhost:5173/auth/callback`
   - `http://localhost:3000/auth/callback`

2. En producción, asegúrate de:
   - Usar HTTPS
   - Configurar correctamente los dominios autorizados
   - Mantener las credenciales seguras

3. Considera implementar:
   - Manejo de errores específicos
   - Mensajes de usuario amigables
   - Logging para debugging 