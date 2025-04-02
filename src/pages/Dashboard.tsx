import { Link } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';
import Button from '../components/shared/Button';
import StatsGrid from '../components/dashboard/StatsGrid';
import RecentFormsTable from '../components/dashboard/RecentFormsTable';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const {
    stats,
    recentForms,
    activity,
    handleViewForm,
    handleEditForm,
    handleQuickAction,
  } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link to="/forms/new">
          <Button>Crear Nuevo Formulario</Button>
        </Link>
      </div>

      <StatsGrid stats={stats} />

      <RecentFormsTable
        forms={recentForms}
        onView={handleViewForm}
        onEdit={handleEditForm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityFeed activity={activity} />
        <QuickActions onAction={handleQuickAction} />
      </div>
    </div>
  );
};

export default Dashboard; 