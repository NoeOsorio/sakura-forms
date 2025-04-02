import { DashboardStat } from '../../hooks/useDashboard';
import Card from '../shared/Card';

interface StatsGridProps {
  stats: DashboardStat[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="flex items-center">
          <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
            <span className="text-xl">{stat.icon}</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid; 