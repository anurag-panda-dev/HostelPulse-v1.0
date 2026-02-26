import { useParams, useNavigate } from 'react-router';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { StatusChip } from '../../components/StatusChip';
import { mockGrievances } from '../../data/mockData';
import { AlertCircle, Calendar, User, FileText } from 'lucide-react';

export function GrievanceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const grievance = mockGrievances.find(g => g.id === id);

  if (!grievance) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader title="Grievance Detail" onBack={() => navigate('/student/requests/grievances')} />
        <div className="p-4">
          <p>Grievance not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Grievance Detail" onBack={() => navigate('/student/requests/grievances')} />

      <div className="p-4 space-y-4">
        {/* Status Banner */}
        <Card className={`p-4 ${
          grievance.status === 'resolved' ? 'bg-green-50 border-green-200' :
          grievance.status === 'in-progress' ? 'bg-purple-50 border-purple-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                {grievance.status === 'resolved' && 'Issue Resolved'}
                {grievance.status === 'in-progress' && 'Staff Working On It'}
                {grievance.status === 'open' && 'Issue Reported'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {grievance.status === 'resolved' && 'This issue has been resolved by our staff.'}
                {grievance.status === 'in-progress' && 'Our staff is currently working on resolving this issue.'}
                {grievance.status === 'open' && 'We have received your grievance and will address it soon.'}
              </p>
            </div>
            <StatusChip status={grievance.status} />
          </div>
        </Card>

        {/* Grievance Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Issue Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium text-gray-900">{grievance.category} • {grievance.subcategory}</p>
              </div>
              <StatusChip status={grievance.priority} />
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium text-gray-900">{grievance.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Reported On</p>
                <p className="font-medium text-gray-900">
                  {new Date(grievance.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {grievance.assignedTo && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium text-gray-900">Staff Member</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Resolution Note */}
        {grievance.resolutionNote && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Resolution Note</h3>
            <p className="text-gray-600">{grievance.resolutionNote}</p>
            {grievance.resolvedAt && (
              <p className="text-xs text-gray-400 mt-2">
                Resolved on: {new Date(grievance.resolvedAt).toLocaleString('en-IN')}
              </p>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
