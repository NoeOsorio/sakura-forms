# Respuestas - Design System

Este directorio contiene los componentes relacionados con la visualización y gestión de respuestas a formularios.

## Estructura

```
responses/
├── README.md
├── ResponsesTable.tsx           # Tabla de respuestas
├── FormsSidebar.tsx             # Barra lateral con lista de formularios
├── ResponseStatus.tsx           # Indicador de estado de respuesta
└── ActionButton.tsx             # Botón de acción para la tabla
```

## Hooks

### useResponses

Hook personalizado que encapsula la lógica de gestión de respuestas.

```typescript
const {
  responses,            // Lista de respuestas
  forms,                // Lista de formularios
  selectedFormId,       // ID del formulario seleccionado
  searchTerm,           // Término de búsqueda
  setSelectedFormId,    // Función para seleccionar un formulario
  setSearchTerm,        // Función para actualizar el término de búsqueda
  filteredResponses,    // Respuestas filtradas según búsqueda y formulario
} = useResponses();
```

## Componentes

### ResponsesTable

Tabla que muestra las respuestas a los formularios.

**Props:**
- `responses`: Lista de respuestas a mostrar
- `onView`: Función para ver una respuesta
- `onDelete`: Función para eliminar una respuesta

### FormsSidebar

Barra lateral que muestra la lista de formularios disponibles.

**Props:**
- `forms`: Lista de formularios
- `selectedFormId`: ID del formulario seleccionado
- `onSelectForm`: Función para seleccionar un formulario

### ResponseStatus

Indicador visual del estado de una respuesta.

**Props:**
- `status`: Estado de la respuesta ('completed', 'in_progress', 'pending')

### ActionButton

Botón de acción para la tabla de respuestas.

**Props:**
- `icon`: Ícono a mostrar
- `label`: Etiqueta del botón
- `onClick`: Función a ejecutar al hacer clic
- `variant`: Variante del botón ('primary', 'secondary', 'danger')

## Flujo de trabajo

1. El usuario selecciona un formulario de la barra lateral
2. Se muestran las respuestas correspondientes a ese formulario
3. El usuario puede buscar respuestas específicas
4. Puede ver o eliminar respuestas individuales
5. El estado de cada respuesta se muestra visualmente

## Estilos

Los componentes utilizan Tailwind CSS para los estilos, siguiendo un diseño consistente con el resto de la aplicación. 