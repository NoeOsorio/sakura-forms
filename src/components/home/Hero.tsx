import { Link } from 'react-router-dom';
import Button from '../shared/Button';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Crea formularios interactivos con facilidad
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Diseña formularios dinámicos y profesionales, recopila respuestas y analiza resultados al instante.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/forms/new">
            <Button 
              className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-medium"
            >
              Crear Nuevo Formulario
            </Button>
          </Link>
          <Link to="/templates">
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-medium"
            >
              Usar plantilla
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 