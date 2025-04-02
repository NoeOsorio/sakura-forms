import { Link } from 'react-router-dom';
import { useRecentForms } from '../hooks/useRecentForms';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import RecentFormsTable from '../components/home/RecentFormsTable';
import CallToAction from '../components/home/CallToAction';
import Button from '../components/shared/Button';

const HomePage = () => {
  const { recentForms } = useRecentForms();

  return (
    <div>
      <Hero />
      
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Features />
          
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Tus formularios recientes</h2>
              <Link to="/forms">
                <Button variant="outline">
                  Ver todos
                </Button>
              </Link>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
              <RecentFormsTable forms={recentForms} />
            </div>
          </div>
          
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 