import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { StatusChip } from '../../components/StatusChip';
import {
  FileText,
  AlertCircle,
  Clock,
  CreditCard,
  QrCode,
  MessageCircle,
} from 'lucide-react';
import {
  getLeavesByStudent,
  getGrievancesByStudent,
  getPaymentsByStudent,
  getNotificationsByUser,
} from '../../data/mockData';
import { Student } from '../../types';

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const student = user as Student;

  const leaves = getLeavesByStudent(student.id);
  const grievances = getGrievancesByStudent(student.id);
  const payments = getPaymentsByStudent(student.id);
  const notifications = getNotificationsByUser(student.id);
  const unreadCount = notifications.filter(n => !n.read).length;

  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  const openGrievances = grievances.filter(g => g.status !== 'resolved').length;
  const pendingPayments = payments.filter(p => p.status !== 'paid');

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Home"
        showNotifications
        notificationCount={unreadCount}
        onNotificationsClick={() => navigate('/student/notifications')}
      />

      <div className="p-4 space-y-4">
        {/* Room Info Card */}
        <Card className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm opacity-90">Welcome back,</p>
              <h2 className="text-xl font-semibold">{student.name}</h2>
            </div>
            <button
              onClick={() => navigate('/student/profile')}
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-semibold"
            >
              {student.name.charAt(0)}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="opacity-75">Room</p>
              <p className="font-semibold">{student.roomNumber}</p>
            </div>
            <div>
              <p className="opacity-75">Block</p>
              <p className="font-semibold">{student.block}</p>
            </div>
            <div>
              <p className="opacity-75">Year</p>
              <p className="font-semibold">{student.year}</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/student/requests/leaves/new')}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <p className="font-medium text-gray-900">Request Leave</p>
            </Card>

            <Card
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/student/requests/grievances/new')}
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <p className="font-medium text-gray-900">Report Issue</p>
            </Card>

            <Card
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/student/attendance/scan')}
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <QrCode className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-medium text-gray-900">Scan Attendance</p>
            </Card>

            <Card
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/student/chat')}
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <p className="font-medium text-gray-900">Message Desk</p>
            </Card>
          </div>
        </div>

        {/* Recent Updates */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Recent Updates</h3>

          {/* Latest Leave */}
          {leaves.length > 0 && (
            <Card
              className="p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/student/requests/leaves/${leaves[0].id}`)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">Leave Request</span>
                </div>
                <StatusChip status={leaves[0].status} />
              </div>
              <p className="text-sm text-gray-600">{leaves[0].reason}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(leaves[0].fromDate).toLocaleDateString()} - {new Date(leaves[0].toDate).toLocaleDateString()}
              </p>
            </Card>
          )}

          {/* Latest Grievance */}
          {grievances.length > 0 && (
            <Card
              className="p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/student/requests/grievances/${grievances[0].id}`)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">Grievance</span>
                </div>
                <StatusChip status={grievances[0].status} />
              </div>
              <p className="text-sm text-gray-600">{grievances[0].description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {grievances[0].category} • {grievances[0].subcategory}
              </p>
            </Card>
          )}

          {/* Pending Payments */}
          {pendingPayments.length > 0 && (
            <Card
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/student/payments')}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">Pending Payments</span>
                </div>
                <span className="text-sm font-semibold text-orange-600">
                  {pendingPayments.length} due
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Next: ₹{pendingPayments[0].amount.toLocaleString()} - {pendingPayments[0].type.replace('-', ' ')}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Due: {new Date(pendingPayments[0].dueDate).toLocaleDateString()}
              </p>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <p className="text-2xl font-semibold text-gray-900">{pendingLeaves}</p>
            <p className="text-xs text-gray-500 mt-1">Pending Leaves</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-semibold text-gray-900">{openGrievances}</p>
            <p className="text-xs text-gray-500 mt-1">Open Issues</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-semibold text-gray-900">{pendingPayments.length}</p>
            <p className="text-xs text-gray-500 mt-1">Due Payments</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
