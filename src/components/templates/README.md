# Plantillas - Design System

Este directorio contiene los componentes relacionados con la visualización y selección de plantillas de formularios.

## Estructura

```
templates/
├── README.md
├── TemplatesSearch.tsx          # Búsqueda y filtros de plantillas
├── TemplatesList.tsx            # Lista de plantillas
└── TemplateCard.tsx             # Tarjeta individual de plantilla
```

## Hooks

### useTemplates

Hook personalizado que encapsula la lógica de gestión de plantillas.

```typescript
const {
  templates,            // Lista de plantillas
  categories,           // Lista de categorías disponibles
  searchTerm,           // Término de búsqueda
  selectedCategory,     // Categoría seleccionada
  setSearchTerm,        // Función para actualizar el término de búsqueda
  setSelectedCategory,  // Función para seleccionar una categoría
  clearFilters,         // Función para limpiar filtros
  filteredTemplates,    // Plantillas filtradas según búsqueda y categoría
} = useTemplates();
```

## Componentes

### TemplatesSearch

Componente para buscar y filtrar plantillas.

**Props:**
- `searchTerm`: Término de búsqueda actual
- `onSearchChange`: Función para actualizar el término de búsqueda
- `selectedCategory`: Categoría seleccionada actualmente
- `onCategoryChange`: Función para cambiar la categoría seleccionada
- `categories`: Lista de categorías disponibles

### TemplatesList

Lista de plantillas con manejo de estado vacío.

**Props:**
- `templates`: Lista de plantillas a mostrar
- `onPreview`: Función para previsualizar una plantilla
- `onUse`: Función para usar una plantilla
- `onClearFilters`: Función para limpiar filtros

### TemplateCard

Tarjeta individual que muestra información de una plantilla.

**Props:**
- `template`: Datos de la plantilla
- `onPreview`: Función para previsualizar la plantilla
- `onUse`: Función para usar la plantilla

## Flujo de trabajo

1. El usuario ve la lista de plantillas disponibles
2. Puede buscar plantillas por nombre o descripción
3. Puede filtrar por categoría
4. Puede previsualizar una plantilla antes de usarla
5. Al seleccionar "Usar plantilla", se crea un nuevo formulario basado en esa plantilla

## Estilos

Los componentes utilizan Tailwind CSS para los estilos, siguiendo un diseño consistente con el resto de la aplicación. 