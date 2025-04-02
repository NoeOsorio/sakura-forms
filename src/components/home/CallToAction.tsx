import { Link } from 'react-router-dom';
import Button from '../shared/Button';

const CallToAction = () => {
  return (
    <div className="text-center py-10">
      <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Únete a miles de usuarios que ya están creando formularios interactivos con nuestra plataforma.
      </p>
      <Link to="/forms/new">
        <Button className="px-8 py-3 text-lg">
          Crear tu formulario ahora
        </Button>
      </Link>
    </div>
  );
};

export default CallToAction; 