import { Template } from '../../hooks/useTemplates';
import Card from '../shared/Card';
import Button from '../shared/Button';

interface TemplateCardProps {
  template: Template;
  onPreview: (id: number) => void;
  onUse: (id: number) => void;
}

const TemplateCard = ({ template, onPreview, onUse }: TemplateCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="text-5xl mr-4">{template.thumbnail}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{template.title}</h3>
          <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
            {template.category}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{template.fields} campos</span>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => onPreview(template.id)}>
            Vista Previa
          </Button>
          <Button onClick={() => onUse(template.id)}>
            Usar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TemplateCard; 