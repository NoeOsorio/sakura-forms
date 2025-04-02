# Formularios - Design System

Este directorio contiene los componentes relacionados con la creación, edición y visualización de formularios médicos.

## Estructura

```
forms/
├── README.md
├── MedicalFormBuilder.tsx       # Componente principal del constructor de formularios
├── FormHeader.tsx               # Cabecera con botones de acción
├── FormTitleEditor.tsx          # Editor de título y descripción
├── FormFieldCard.tsx            # Tarjeta para editar un campo
├── FieldTypePicker.tsx          # Selector de tipos de campo
└── MedicalFormPreview.tsx       # Vista previa del formulario
```

## Hooks

### useFormBuilder

Hook personalizado que encapsula toda la lógica del constructor de formularios.

```typescript
const {
  state,                // Estado completo del formulario
  addField,             // Añadir un nuevo campo
  removeField,          // Eliminar un campo
  updateField,          // Actualizar un campo
  moveField,            // Reordenar campos
  duplicateField,       // Duplicar un campo
  saveForm,             // Guardar el formulario
  togglePreview,        // Alternar vista previa
  updateTitle,          // Actualizar título
  updateDescription,    // Actualizar descripción
  setCurrentFieldIndex, // Seleccionar campo actual
  toggleAddModal,       // Abrir/cerrar modal de añadir campo
} = useFormBuilder();
```

## Componentes

### MedicalFormBuilder

Componente principal que orquesta la creación y edición de formularios médicos.

**Características:**
- Modo de edición y vista previa
- Gestión de campos del formulario
- Interfaz intuitiva para añadir, editar y reordenar campos

### FormHeader

Cabecera con botones de acción para el formulario.

**Props:**
- `title`: Título del formulario
- `isPreview`: Indica si estamos en modo vista previa
- `hasFields`: Indica si hay campos en el formulario
- `onTogglePreview`: Función para alternar vista previa
- `onSave`: Función para guardar el formulario

### FormTitleEditor

Editor para el título y descripción del formulario.

**Props:**
- `title`: Título actual
- `description`: Descripción actual
- `onTitleChange`: Función para actualizar el título
- `onDescriptionChange`: Función para actualizar la descripción

### FormFieldCard

Tarjeta para editar un campo del formulario.

**Props:**
- `field`: Datos del campo
- `isActive`: Indica si es el campo seleccionado
- `onSelect`: Función para seleccionar el campo
- `onChange`: Función para actualizar el campo
- `onRemove`: Función para eliminar el campo
- `onDuplicate`: Función para duplicar el campo
- `canMoveUp`: Indica si se puede mover hacia arriba
- `canMoveDown`: Indica si se puede mover hacia abajo
- `onMoveUp`: Función para mover hacia arriba
- `onMoveDown`: Función para mover hacia abajo

### FieldTypePicker

Selector de tipos de campo para el formulario.

**Props:**
- `onSelect`: Función que se llama al seleccionar un tipo de campo

### MedicalFormPreview

Vista previa del formulario médico.

**Props:**
- `title`: Título del formulario
- `description`: Descripción del formulario
- `fields`: Lista de campos
- `onComplete`: Función que se llama al completar el formulario
- `onBack`: Función que se llama al volver atrás

## Flujo de trabajo

1. El usuario inicia en el modo de edición
2. Puede editar el título y descripción del formulario
3. Añade campos seleccionando su tipo desde el modal
4. Edita cada campo según sus necesidades
5. Reordena los campos según sea necesario
6. Activa la vista previa para ver cómo quedará el formulario
7. Guarda el formulario cuando está satisfecho

## Estilos

Los componentes utilizan Tailwind CSS para los estilos, siguiendo un diseño consistente con el resto de la aplicación. 