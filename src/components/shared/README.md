# Componentes Compartidos - Design System

Este directorio contiene los componentes reutilizables que se utilizan en toda la aplicación.

## Estructura

```
shared/
├── README.md
├── Button.tsx                   # Botón reutilizable con variantes
├── Card.tsx                     # Contenedor con estilo de tarjeta
├── Modal.tsx                    # Ventana modal
├── SearchBar.tsx                # Barra de búsqueda
└── FilterButton.tsx             # Botón de filtro
```

## Componentes

### Button

Botón reutilizable con diferentes variantes y estados.

**Props:**
- `children`: Contenido del botón
- `variant`: Variante del botón ('primary', 'secondary', 'outline', 'danger')
- `size`: Tamaño del botón ('sm', 'md', 'lg')
- `disabled`: Indica si el botón está deshabilitado
- `onClick`: Función a ejecutar al hacer clic
- `className`: Clases CSS adicionales

### Card

Contenedor con estilo de tarjeta para agrupar contenido relacionado.

**Props:**
- `children`: Contenido de la tarjeta
- `className`: Clases CSS adicionales

### Modal

Ventana modal para mostrar contenido superpuesto.

**Props:**
- `isOpen`: Indica si el modal está abierto
- `onClose`: Función para cerrar el modal
- `title`: Título del modal
- `children`: Contenido del modal
- `size`: Tamaño del modal ('sm', 'md', 'lg')

### SearchBar

Barra de búsqueda con icono y campo de entrada.

**Props:**
- `value`: Valor actual del campo de búsqueda
- `onChange`: Función para actualizar el valor
- `placeholder`: Texto de marcador de posición
- `className`: Clases CSS adicionales

### FilterButton

Botón de filtro con estado activo/inactivo.

**Props:**
- `label`: Etiqueta del botón
- `isActive`: Indica si el filtro está activo
- `onClick`: Función a ejecutar al hacer clic
- `className`: Clases CSS adicionales

## Uso

Estos componentes son la base del design system y deben utilizarse de manera consistente en toda la aplicación para mantener una experiencia de usuario coherente.

### Ejemplo de uso:

```tsx
import { Button, Card, Modal } from '../shared';

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="p-4">
      <h2>Mi Componente</h2>
      <Button 
        variant="primary" 
        onClick={() => setIsModalOpen(true)}
      >
        Abrir Modal
      </Button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Mi Modal"
      >
        <p>Contenido del modal</p>
      </Modal>
    </Card>
  );
};
```

## Estilos

Todos los componentes utilizan Tailwind CSS para los estilos, siguiendo un diseño consistente con el resto de la aplicación. 