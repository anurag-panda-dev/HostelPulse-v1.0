import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { BottomNav } from '../components/BottomNav';
import { QrCode, Clock, FileCheck, User } from 'lucide-react';

export function GuardLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'guard') {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/guard', icon: QrCode, label: 'QR Code' },
    { path: '/guard/attendance', icon: Clock, label: 'Attendance' },
    { path: '/guard/leaves', icon: FileCheck, label: 'Leaves' },
    { path: '/guard/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
      <BottomNav items={navItems} />
      <div className="h-16 md:hidden" />
    </div>
  );
}
