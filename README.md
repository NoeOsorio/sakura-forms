# 🌸 Sakura Forms

Sakura Forms es una aplicación moderna y elegante para la creación y gestión de formularios médicos digitales. Diseñada con React y TypeScript, ofrece una experiencia fluida y profesional tanto para administradores como para usuarios.

## ✨ Características

- **Editor Visual Intuitivo**
  - Interfaz drag & drop para construcción de formularios
  - Vista previa en tiempo real
  - Múltiples tipos de campos:
    - Texto corto y largo
    - Email y teléfono
    - Selección única y múltiple
    - Escalas de valoración
    - Subida de archivos
    - Firma digital
    - Y más...

- **Diseño Responsivo**
  - Interfaz adaptable a cualquier dispositivo
  - Diseño moderno con Tailwind CSS
  - Temas personalizables

- **Gestión Avanzada**
  - Organización de formularios por categorías
  - Sistema de plantillas reutilizables
  - Exportación de respuestas
  - Análisis de datos

## 🚀 Instalación

## Requisitos

- Node.js 18+
- npm o yarn
- Cuenta en Supabase

## Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Supabase
Para la configuración completa de Supabase, incluyendo autenticación, base de datos y migraciones, consulta la [documentación detallada](./docs/supabase-setup.md).

Pasos básicos:
1. Instalar CLI de Supabase: `npm install -g supabase`
2. Iniciar sesión: `supabase login`
3. Vincular proyecto: `supabase link --project-ref [project-ref]`
4. Configurar variables de entorno (ver `.env.example`)

### 3. Configurar Autenticación con Google
Para habilitar el inicio de sesión con Google, sigue las instrucciones en la [documentación de Google OAuth](./docs/google-oauth-setup.md).

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## 🛠️ Tecnologías

- React 18
- TypeScript 5
- Tailwind CSS 3
- Heroicons
- React Router 6
- React Signature Canvas
- Vite

## 📦 Estructura del Proyecto

```
sakura-forms/
├── src/
│   ├── components/
│   │   ├── forms/         # Componentes de formularios
│   │   ├── layout/        # Componentes de estructura
│   │   ├── shared/        # Componentes reutilizables
│   │   └── responses/     # Componentes de respuestas
│   ├── types/            # Definiciones de TypeScript
│   ├── validation/       # Lógica de validación
│   └── App.tsx          # Componente principal
├── public/              # Archivos estáticos
└── package.json        # Dependencias y scripts
```

## 💻 Uso

1. **Crear un Nuevo Formulario**
   - Navega a "Mis Formularios"
   - Haz clic en "Nuevo Formulario"
   - Arrastra y suelta los campos deseados
   - Configura las propiedades de cada campo
   - Guarda y publica

2. **Gestionar Respuestas**
   - Accede a la sección "Respuestas"
   - Visualiza las respuestas recibidas
   - Exporta datos en diferentes formatos
   - Analiza resultados

3. **Usar Plantillas**
   - Explora la sección "Plantillas"
   - Selecciona una plantilla predefinida
   - Personaliza según necesidades
   - Guarda como nuevo formulario

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- Revisa la [documentación](docs/README.md)
- Abre un [issue](https://github.com/NoeOsorio/sakura-forms/issues)
- Contacta al equipo de desarrollo: [@NoeOsorio](https://github.com/NoeOsorio)

## 📊 Estado del Proyecto

![GitHub language count](https://img.shields.io/github/languages/count/NoeOsorio/sakura-forms)
![GitHub top language](https://img.shields.io/github/languages/top/NoeOsorio/sakura-forms)
![GitHub last commit](https://img.shields.io/github/last-commit/NoeOsorio/sakura-forms)
![GitHub repo size](https://img.shields.io/github/repo-size/NoeOsorio/sakura-forms)

---

Desarrollado con ❤️ por [@NoeOsorio](https://github.com/NoeOsorio)
