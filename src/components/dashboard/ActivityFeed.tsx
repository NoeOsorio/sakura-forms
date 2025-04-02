import { ActivityItem } from '../../hooks/useDashboard';
import Card from '../shared/Card';

interface ActivityFeedProps {
  activity: ActivityItem[];
}

const ActivityFeed = ({ activity }: ActivityFeedProps) => {
  return (
    <Card title="Actividad Reciente">
      <ul className="space-y-4">
        {activity.map((item) => (
          <li key={item.id} className="flex items-start">
            <span className={`${item.color} mr-2`}>●</span>
            <div>
              <p className="text-gray-800">
                {item.message}: <span className="font-medium">{item.detail}</span>
              </p>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ActivityFeed; 