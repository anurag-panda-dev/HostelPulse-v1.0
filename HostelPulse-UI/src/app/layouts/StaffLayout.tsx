import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { BottomNav } from '../components/BottomNav';
import { CheckSquare, User } from 'lucide-react';

export function StaffLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/staff', icon: CheckSquare, label: 'Tasks' },
    { path: '/staff/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
      <BottomNav items={navItems} />
      <div className="h-16 md:hidden" />
    </div>
  );
}
