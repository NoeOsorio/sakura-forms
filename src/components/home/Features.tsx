interface Feature {
  icon: string;
  title: string;
  description: string;
  iconBgColor: string;
  iconTextColor: string;
}

const features: Feature[] = [
  {
    icon: '✨',
    title: 'Diseño sin código',
    description: 'Crea formularios profesionales con una interfaz intuitiva de arrastrar y soltar.',
    iconBgColor: 'bg-teal-100',
    iconTextColor: 'text-teal-600',
  },
  {
    icon: '📊',
    title: 'Análisis instantáneo',
    description: 'Visualiza y analiza las respuestas con gráficos y estadísticas en tiempo real.',
    iconBgColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600',
  },
  {
    icon: '🔌',
    title: 'Integración API',
    description: 'Conecta tus formularios con otras aplicaciones mediante nuestra API REST.',
    iconBgColor: 'bg-purple-100',
    iconTextColor: 'text-purple-600',
  },
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
      {features.map((feature, index) => (
        <div key={index} className="text-center p-6">
          <div className={`w-16 h-16 rounded-full ${feature.iconBgColor} ${feature.iconTextColor} flex items-center justify-center text-2xl mx-auto mb-4`}>
            {feature.icon}
          </div>
          <h2 className="text-xl font-semibold mb-3">{feature.title}</h2>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features; 