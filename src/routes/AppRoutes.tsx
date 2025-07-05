import { Routes, Route } from 'react-router-dom';
import InventoryPage from '../pages/InventoryPage';
import InstallationPage from '../pages/InstallationPage';
import ServiceVisitPage from '../pages/ServiceVisitPage';
import PhotoLogPage from '../pages/PhotoLogPage';
import AlertsPage from '../pages/AlertsPage';
import TrackerPage from '../pages/TrackerPage';
import { DashboardLayout } from '../components/DashboardLayout';

interface AppRoutesProps {
  toggleTheme: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ toggleTheme }) => {
  const routes = [
    { path: '/', element: <InventoryPage /> },
    { path: '/installations', element: <InstallationPage /> },
    { path: '/service-visits', element: <ServiceVisitPage /> },
    { path: '/photo-logs', element: <PhotoLogPage /> },
    { path: '/alerts', element: <AlertsPage /> },
    { path: '/tracker', element: <TrackerPage /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<DashboardLayout toggleTheme={toggleTheme}>{route.element}</DashboardLayout>}
        />
      ))}
    </Routes>
  );
};
