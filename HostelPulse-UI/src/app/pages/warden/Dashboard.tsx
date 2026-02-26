import { useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { StatusChip } from '../../components/StatusChip';
import { mockLeaveRequests, mockGrievances, mockAttendance, mockPayments } from '../../data/mockData';
import {
  Users,
  FileText,
  AlertCircle,
  Clock,
  CreditCard,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

export function WardenDashboard() {
  const navigate = useNavigate();

  const pendingLeaves = mockLeaveRequests.filter(l => l.status === 'pending').length;
  const openGrievances = mockGrievances.filter(g => g.status !== 'resolved').length;
  const todayAttendance = mockAttendance.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const pendingPayments = mockPayments.filter(p => p.status !== 'paid').length;

  const stats = [
    { label: 'Total Students', value: '50', icon: Users, color: 'blue', link: '/warden/students' },
    { label: 'Pending Leaves', value: pendingLeaves.toString(), icon: FileText, color: 'yellow', link: '/warden/leaves' },
    { label: 'Open Grievances', value: openGrievances.toString(), icon: AlertCircle, color: 'orange', link: '/warden/grievances' },
    { label: 'Present Today', value: `${presentToday}/50`, icon: Clock, color: 'green', link: '/warden/attendance' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of the hostel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(stat.link)}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => navigate('/warden/students/new')}
          >
            <Users className="w-4 h-4 mr-2" />
            Add New Student
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => navigate('/warden/leaves')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Review Leaves
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => navigate('/warden/grievances')}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            View Grievances
          </Button>
        </div>
      </Card>

      {/* Recent Leaves */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leave Requests</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/warden/leaves')}
          >
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-3">
          {mockLeaveRequests.slice(0, 3).map((leave) => (
            <div
              key={leave.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => navigate(`/warden/leaves/${leave.id}`)}
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{leave.studentName}</p>
                <p className="text-sm text-gray-600 line-clamp-1">{leave.reason}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                </p>
              </div>
              <StatusChip status={leave.status} />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Grievances */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Grievances</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/warden/grievances')}
          >
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-3">
          {mockGrievances.slice(0, 3).map((grievance) => (
            <div
              key={grievance.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => navigate(`/warden/grievances/${grievance.id}`)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">{grievance.studentName}</p>
                  <StatusChip status={grievance.priority} />
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">{grievance.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {grievance.category} • {grievance.subcategory}
                </p>
              </div>
              <StatusChip status={grievance.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
