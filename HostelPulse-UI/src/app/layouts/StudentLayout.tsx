import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { BottomNav } from '../components/BottomNav';
import { Home, FileText, Clock, CreditCard, MessageCircle } from 'lucide-react';

export function StudentLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/student', icon: Home, label: 'Home' },
    { path: '/student/requests/leaves', icon: FileText, label: 'Requests' },
    { path: '/student/attendance', icon: Clock, label: 'Attendance' },
    { path: '/student/payments', icon: CreditCard, label: 'Payments' },
    { path: '/student/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
      <BottomNav items={navItems} />
      <div className="h-16 md:hidden" /> {/* Spacer for bottom nav */}
    </div>
  );
}
