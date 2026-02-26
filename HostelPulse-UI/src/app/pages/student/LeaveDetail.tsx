import { useParams, useNavigate } from 'react-router';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { StatusChip } from '../../components/StatusChip';
import { mockLeaveRequests } from '../../data/mockData';
import { Calendar, Clock, FileText, MessageSquare, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export function LeaveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const leave = mockLeaveRequests.find(l => l.id === id);

  if (!leave) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader title="Leave Detail" onBack={() => navigate('/student/requests/leaves')} />
        <div className="p-4">
          <p>Leave request not found</p>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this leave request?')) {
      toast.success('Leave request cancelled');
      navigate('/student/requests/leaves');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Leave Detail" onBack={() => navigate('/student/requests/leaves')} />

      <div className="p-4 space-y-4">
        {/* Status Banner */}
        <Card className={`p-4 ${
          leave.status === 'approved' ? 'bg-green-50 border-green-200' :
          leave.status === 'rejected' ? 'bg-red-50 border-red-200' :
          'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                {leave.status === 'approved' && 'Leave Approved'}
                {leave.status === 'rejected' && 'Leave Rejected'}
                {leave.status === 'pending' && 'Awaiting Approval'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {leave.status === 'approved' && 'Your leave request has been approved by the warden.'}
                {leave.status === 'rejected' && 'Your leave request has been rejected.'}
                {leave.status === 'pending' && 'Your request is being reviewed by the warden.'}
              </p>
            </div>
            <StatusChip status={leave.status} />
          </div>
        </Card>

        {/* Leave Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Request Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Leave Type</p>
                <p className="font-medium text-gray-900 capitalize">{leave.type.replace('-', ' ')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-900">
                  {new Date(leave.fromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' - '}
                  {new Date(leave.toDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Reason</p>
                <p className="font-medium text-gray-900">{leave.reason}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Submitted On</p>
                <p className="font-medium text-gray-900">
                  {new Date(leave.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Warden Comment */}
        {leave.wardenComment && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Warden's Comment</h3>
            <p className="text-gray-600">{leave.wardenComment}</p>
          </Card>
        )}

        {/* Action Button */}
        {leave.status === 'pending' && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleCancel}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  );
}
