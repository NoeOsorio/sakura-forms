# Configuración de Supabase y Migraciones

## Requisitos Previos

1. Tener instalada la CLI de Supabase:
```bash
npm install -g supabase
```

2. Iniciar sesión en Supabase CLI:
```bash
supabase login
```
   - Esto abrirá tu navegador para autenticarte
   - Necesitarás tu token de acceso de Supabase (se encuentra en Account Settings > Access Tokens)

3. Tener una cuenta en Supabase y un proyecto creado

## Configuración del Proyecto

1. Vincular el proyecto local con Supabase:
```bash
supabase link --project-ref [project-ref]
```
   - El project-ref se encuentra en Project Settings > General > Reference ID

2. Obtener las credenciales del proyecto:
   - URL del proyecto: `https://[project-ref].supabase.co`
   - Clave anónima: Se encuentra en Project Settings > API > Project API keys > anon public
   - Contraseña de la base de datos: Project Settings > Database > Connection string > Password

3. Configurar el archivo `.env`:
```env
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key

# Supabase Database
SUPABASE_PROJECT_REF=[project-ref]
SUPABASE_DB_PASSWORD=tu_contraseña_de_db
SUPABASE_DB_URL=postgresql://postgres:${SUPABASE_DB_PASSWORD}@db.${SUPABASE_PROJECT_REF}.supabase.co:5432/postgres
```

## Script de Migraciones

El proyecto incluye un script para manejar las migraciones de la base de datos (`scripts/migrate.sh`).

### Hacer el script ejecutable:
```bash
chmod +x scripts/migrate.sh
```

### Comandos disponibles:

1. Ver estado de las migraciones:
```bash
./scripts/migrate.sh status
```

2. Aplicar migraciones:
```bash
./scripts/migrate.sh push
```

3. Crear nueva migración:
```bash
./scripts/migrate.sh new nombre_de_la_migracion
```

4. Ver ayuda:
```bash
./scripts/migrate.sh help
```

## Solución de Problemas

### Error de autenticación SASL
Si recibes un error de autenticación SASL:
1. Verifica que la contraseña de la base de datos sea correcta
2. Asegúrate de que el proyecto esté correctamente vinculado:
```bash
supabase link --project-ref [project-ref]
```

### Debugging
Para obtener más información sobre los errores:
```bash
./scripts/migrate.sh push --debug
```

## Notas Importantes

1. Nunca commits el archivo `.env` al repositorio
2. Mantén las credenciales seguras
3. Usa diferentes valores para desarrollo y producción
4. Asegúrate de que el archivo `.env` esté en `.gitignore`

## Estructura de Migraciones

Las migraciones se encuentran en `supabase/migrations/` y siguen el formato:
```
supabase/
  migrations/
    20240101000000_nombre_de_la_migracion.sql
```

Cada archivo de migración debe contener las instrucciones SQL necesarias para actualizar el esquema de la base de datos. 